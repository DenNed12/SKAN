import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { fetchCompanyLimits } from '../../api/limits';
import {
  setCompanyLimits,
  logout
} from '../../store/authSlice';
import './header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, companyLimits } = useSelector(state => state.auth);

  useEffect(() => {
    const loadLimits = async () => {
      try {
        const limits = await fetchCompanyLimits();
        dispatch(setCompanyLimits(limits));
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      loadLimits();
    }
  }, [isAuthenticated, dispatch]);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">СКАН</Link>
        </div>

        <nav className="main-nav">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end
          >
            Главная
          </NavLink>
          <NavLink
            to="/tariffs"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Тарифы
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            FAQ
          </NavLink>
        </nav>
      </div>

      {isAuthenticated ? (
        <div className="user-panel">
          {companyLimits ? (
            <div className="limits">
              Использовано компаний: {companyLimits.used} / {companyLimits.limit}
            </div>
          ) : (
            <div className="loader">Загрузка...</div>
          )}
          <div className="user-info">
            <span>{user.name}</span>
            <button
              onClick={() => dispatch(logout())}
              className="logout-button"
            >
              Выйти
            </button>
          </div>
        </div>
      ) : (
        <nav className="auth-nav">
          <Link to="/auth" className="auth-link">Войти</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;