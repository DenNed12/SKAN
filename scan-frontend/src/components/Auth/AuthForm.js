import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './auth.css';

const AuthForm = ({ credentials, onChange, onSubmit, loading, error }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [registerCredentials, setRegisterCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isLoginForm) {
      onChange({ ...credentials, [name]: value });
    } else {
      setRegisterCredentials({ ...registerCredentials, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = isLoginForm ? credentials : registerCredentials;
    onSubmit(formData, isLoginForm ? 'login' : 'register');
  };

  const passwordsMatch = registerCredentials.password === registerCredentials.confirmPassword;
  const isFormValid = isLoginForm
    ? credentials.login && credentials.password
    : registerCredentials.name &&
      registerCredentials.email &&
      registerCredentials.password &&
      registerCredentials.confirmPassword &&
      passwordsMatch;

  return (
    <div className="auth-form">
      <div className="tabs">
        <button
          type="button"
          className={`tab ${isLoginForm ? 'active' : ''}`}
          onClick={() => setIsLoginForm(true)}
        >
          Войти
        </button>
        <button
          type="button"
          className={`tab ${!isLoginForm ? 'active' : ''}`}
          onClick={() => setIsLoginForm(false)}
        >
          Зарегистрироваться
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLoginForm && (
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={registerCredentials.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">{isLoginForm ? 'Логин' : 'Email'}</label>
          <input
            type={isLoginForm ? 'text' : 'email'}
            id="email"
            name={isLoginForm ? 'login' : 'email'}
            value={isLoginForm ? credentials.login : registerCredentials.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={isLoginForm ? credentials.password : registerCredentials.password}
            onChange={handleChange}
            disabled={loading}
            required
            minLength={6}
          />
        </div>

        {!isLoginForm && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={registerCredentials.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
              minLength={6}
            />
            {!passwordsMatch && registerCredentials.confirmPassword && (
              <div className="error-text">Пароли не совпадают</div>
            )}
          </div>
        )}

        {isLoginForm && (
          <Link to="/forgot-password" className="forgot-password">
            Забыли пароль?
          </Link>
        )}

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="submit-button"
          disabled={loading || !isFormValid}
        >
          {loading ? (
            <span className="button-loader">Загрузка...</span>
          ) : isLoginForm ? (
            'Войти'
          ) : (
            'Зарегистрироваться'
          )}
        </button>

        <div className="social-auth">
          <p>Или войти через</p>
          <div className="social-buttons">
            <button type="button" className="social-button google">
              <span className="icon">G</span> Google
            </button>
            <button type="button" className="social-button facebook">
              <span className="icon">f</span> Facebook
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  credentials: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default AuthForm;