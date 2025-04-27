import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import AuthForm from '../components/Auth/AuthForm';
import './authpage.css';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <div className="auth-page">
      <h1>Авторизация</h1>
      <AuthForm
        credentials={credentials}
        onChange={setCredentials}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AuthPage;