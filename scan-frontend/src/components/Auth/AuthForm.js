import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthForm = ({ credentials, onChange, onSubmit, loading, error }) => {
  const handleChange = (e) => {
    onChange({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-form">
      <div className="tabs">
        <button type="button" className="active">Войти</button>
        <Link to="/register" className="tab">Зарегистрироваться</Link>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="login">Логин</label>
          <input
            type="text"
            id="login"
            name="login"
            value={credentials.login}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            disabled={loading}
          />
          <Link to="/forgot-password" className="forgot-password">
            Восстановить пароль
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="submit-button"
          disabled={!credentials.login || !credentials.password || loading}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>

        <div className="social-auth">
          <button type="button" className="social-button google">
            Войти через Google
          </button>
          <button type="button" className="social-button facebook">
            Войти через Facebook
          </button>
          <button type="button" className="social-button yandex">
            Войти через Яндекс
          </button>
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