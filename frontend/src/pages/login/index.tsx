
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useLoggedInUser from '@/src/hooks/useLoggedInUser';
import { validateEmail, validatePassword } from '@/src/utils/validators';
import styles from './index.module.css';

interface FormValues {
  email: string,
  password: string
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: NextPage = () => {

  const router = useRouter();

  const { loggedInUser, login } = useLoggedInUser();

  useEffect(() => {
    if (loggedInUser) router.back();
  }, [loggedInUser, router]);

  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const validateOnChangeRef = useRef(false);

  function formInputChangeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (validateOnChangeRef.current) validate();
  }

  const validate = useCallback(() => {
    const errors: FormErrors = {
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password, false)
    };
    setFormErrors(errors);
    return (Object.values(errors).every(errorValue => errorValue === undefined));
  }, [formValues]);

  useEffect(() => {
    if (validateOnChangeRef.current) validate();
  }, [formValues, validate]);

  function clickHandlerLoginButton(e: MouseEvent) {
    e.preventDefault();
    validateOnChangeRef.current = true;
    const allInputsAreValid = validate();
    if (!allInputsAreValid) return;
    (async () => {
      try {
        const { email, password } = formValues;
        await login(email, password);
        router.back();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) setFormErrors({ password: 'Email or password is incorrect' });
        }
        console.log(error);
      }
    })();
  }

  return (
    <div className={ styles.overallContainer }>
      <div className={ styles.loginCard }>
        <h1 className={ styles.title }>Please Log In</h1>
        <form className={ styles.form }>
          <ol className={ styles.formFieldList }>
            <li className={ `${styles.fieldContainer} ${styles.required}` }>
              <label htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className={ validateOnChangeRef.current && formErrors.email ? styles.invalid : undefined }
                type='text'
                name='email'
                onChange={ formInputChangeHandler }
                value={ formValues.email }
              />
              { formErrors.email && <p className={ styles.errorMessage }>{ formErrors.email }</p> }
            </li>
            <li className={ `${styles.fieldContainer} ${styles.required}` }>
              <label htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                className={ validateOnChangeRef.current && formErrors.password ? styles.invalid : undefined }
                type='text'
                name='password'
                onChange={ formInputChangeHandler }
                value={ formValues.password }
              />
              { formErrors.password && <p className={ styles.errorMessage }>{ formErrors.password }</p> }
            </li>
          </ol>
          <button type="button" className={ styles.loginButton } onClick={ clickHandlerLoginButton }>
            Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;