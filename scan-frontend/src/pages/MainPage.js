import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Car from '../components/Car/Car';
import TariffCard from '../components/Tariff/TariffCard';
import './mainpage.css';

const MainPage = () => {
  const { isAuthenticated, currentTariff } = useSelector(state => state.auth);
  const features = [
    { title: 'Скорость', content: 'Высокая скорость обработки заявки' },
    { title: 'Полнота', content: 'У нас есть полная информация обо всех' },
    { title: 'Безопасность', content: 'Мы бережно относимся к конфиденциальной информации' },
    { title: 'Цены', content: 'У нас лучшие цены' },
  ];

  const tariffs = [
    { id: 1, name: 'Beginner', price: 'Бесплатно', features: ['Лимит 50 компаний'] },
    { id: 2, name: 'Pro', price: '999 ₽', features: ['Лимит 200 компаний'] },
    { id: 3, name: 'Business', price: '2999 ₽', features: ['Лимит 500 компаний'] }
  ];

  return (
    <div className="main-page">
      <section className="hero">
        <h1>Сервис проверки контрагентов</h1>
        <p>Полная информация о компаниях в один клик</p>
        {isAuthenticated && (
          <Link to="/search" className="cta-button">
            Запросить данные
          </Link>
        )}
      </section>

      <section className="features-section">
        <h2>Почему мы</h2>
        <Car
          items={features}
          renderItem={(item) => (
            <div className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          )}
        />
      </section>

      <section className="tariffs">
        <h2>Наши тарифы</h2>
        <div className="tariffs-grid">
          {tariffs.map(tariff => (
            <TariffCard
              key={tariff.id}
              tariff={tariff}
              isCurrent={currentTariff === tariff.name}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default MainPage;