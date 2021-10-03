/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './login.css';

import logo from '../../assets/company-name.png';

const LoginForm = () => {
  const history = useHistory();
  const [emailCredential, setEmailCredential] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);

  const dispatch = useDispatch();

  const validate = () => {
    let error = false;
    const errorObj = { ...errorsObj };

    if (emailCredential === '') {
      errorObj.email = 'Email Requerido!';
      error = true;
      setDisabled(true);
    }

    if (password === '') {
      errorObj.password = 'Senha Requerida!';
      error = true;
      setDisabled(true);
    }

    if (password.length < 6) {
      errorObj.password = 'Senha com no mínimo 6 caracteres!';
      error = true;
      setDisabled(true);
    }

    setErrors(errorObj);

    if (!error) {
      console.log('Form Succeded!');
      setDisabled(false);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch({
      type: 'SET_EMAIL',
      payload: { email: emailCredential },
    });

    setTimeout(() => {
      history.replace('/carteira');
    }, 250);

    validate();
  };

  return (
    <div className="login-wrapper">
      <img className="company-name" src={ logo } alt="company-logo" />

      <form className="form-group" onSubmit={ handleLogin }>
        <input type="email" data-testid="email-input" placeholder="Email" value={ emailCredential } onBlur={ validate } onChange={ (event) => setEmailCredential(event.target.value) } />
        <small>{errors.email && <div className="error">{errors.email}</div>}</small>

        <input type="password" data-testid="password-input" placeholder="Senha" value={ password } onBlur={ validate } onChange={ (event) => setPassword(event.target.value) } />
        <small>{errors.password && <div className="error">{errors.password}</div>}</small>

        <button type="submit" data-testid="my-action" disabled={ disabled }>Entrar</button>
      </form>

    </div>
  );
};

export default LoginForm;
