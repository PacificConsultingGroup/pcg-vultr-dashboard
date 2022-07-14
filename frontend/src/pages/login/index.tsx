
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useMemo } from 'react';
import axios from 'axios';
import useLoggedInUser from '@/src/hooks/useLoggedInUser';
import useForm from '@/src/hooks/useForm';
import { validateEmail, validatePassword } from '@/src/utils/validators';
import styles from './index.module.css';

const LoginPage: NextPage = () => {

  const router = useRouter();

  const { loggedInUser, login } = useLoggedInUser();

  useEffect(() => {
    if (loggedInUser) router.back();
  }, [loggedInUser, router]);

  const initialFormValues = {
    email: '',
    password: ''
  };
  const formValidators = useMemo(() => ({
    email: validateEmail,
    password: validatePassword
  }), []);

  const {
    formValues,
    formErrors,
    setFormErrors,
    validate,
    formInputChangeHandler,
    validatedAtLeastOnce
  } = useForm(initialFormValues, formValidators);

  function clickHandlerLoginButton(e: MouseEvent) {
    e.preventDefault();
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
                className={ validatedAtLeastOnce && formErrors.email ? styles.invalid : undefined }
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
                className={ validatedAtLeastOnce && formErrors.password ? styles.invalid : undefined }
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