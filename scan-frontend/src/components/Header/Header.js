import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className="logo">
        <Link to="/">СКАН</Link>
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
            <button onClick={() => dispatch(logout())}>Выйти</button>
          </div>
        </div>
      ) : (
        <nav>
          <Link to="/auth">Войти</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;