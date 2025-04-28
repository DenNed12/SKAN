import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '../UI/Badge';
import './tariff.css';

const TariffCard = ({ tariff, isCurrent }) => {
  const getTariffColor = () => {
    const colors = {
      Beginner: 'var(--color-beginner)',
      Pro: 'var(--color-pro)',
      Business: 'var(--color-business)'
    };
    return colors[tariff.name] || '#ccc';
  };

  return (
    <div
      className={`tariff-card ${isCurrent ? 'current' : ''}`}
      style={{ borderColor: getTariffColor() }}
    >
      {isCurrent && (
        <Badge
          text="Текущий тариф"
          color={getTariffColor()}
          className="tariff-badge"
        />
      )}

      <h3 className="tariff-name">{tariff.name}</h3>
      <div className="tariff-price">{tariff.price}</div>

      <ul className="tariff-features">
        {tariff.features.map((feature, index) => (
          <li key={index} className="feature-item">
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`tariff-button ${isCurrent ? 'current' : ''}`}
        style={{ backgroundColor: getTariffColor() }}
      >
        {isCurrent ? 'Перейти в ЛК' : 'Подробнее'}
      </button>
    </div>
  );
};

TariffCard.propTypes = {
  tariff: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  isCurrent: PropTypes.bool
};

export default TariffCard;