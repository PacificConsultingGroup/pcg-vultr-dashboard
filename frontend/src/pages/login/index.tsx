
import { NextPage } from 'next';
import { MouseEvent, useEffect, useMemo } from 'react';
import axios from 'axios';
import useLoggedInUser from '@/src/hooks/useLoggedInUser';
import useForm from '@/src/hooks/useForm';
import usePageTransition from '@/src/hooks/usePageTransition';
import { validateEmail, validatePassword } from '@/src/utils/validators';
import styles from './index.module.css';

const LoginPage: NextPage = () => {

  const { pageTransitionTo } = usePageTransition();

  const { loggedInUser, login } = useLoggedInUser();

  useEffect(() => {
    if (loggedInUser) pageTransitionTo('', { redirectType: 'back' });
  }, [loggedInUser, pageTransitionTo]);

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
        pageTransitionTo('', { redirectType: 'back' });
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
      <section className={ styles.heroSection }>
        <h1 className={ styles.heroTitle }>
          PCG
        </h1>
        <h2 className={ styles.heroSubtitle }>
          Vultr Dashboard
        </h2>
      </section>
      <section className={ styles.loginSection }>
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
            Log In
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;