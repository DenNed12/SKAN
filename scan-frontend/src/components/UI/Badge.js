import React from 'react';
import PropTypes from 'prop-types';

export const Badge = ({ text, color = '#4CAF50' }) => {
  return (
    <span
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'inline-block'
      }}
    >
      {text}
    </span>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Badge;