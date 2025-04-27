import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validateINN } from '../../utils/validation';
import './search.css';

const SearchForm = ({ onSearch }) => {
  const [params, setParams] = useState({
    inn: '',
    startDate: null,
    endDate: null,
    tonality: 'any',
    limit: 100
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!validateINN(params.inn)) {
      validationErrors.inn = 'Некорректный ИНН';
    }

    if (!params.startDate || !params.endDate) {
      validationErrors.dates = 'Укажите обе даты';
    }

    if (Object.keys(validationErrors).length === 0) {
      onSearch(params);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>ИНН *</label>
        <input
          type="text"
          value={params.inn}
          onChange={(e) => setParams({...params, inn: e.target.value})}
          className={errors.inn ? 'error' : ''}
        />
        {errors.inn && <span className="error-message">{errors.inn}</span>}
      </div>

      <div className="form-group">
        <label>Диапазон дат *</label>
        <DatePicker
          selected={params.startDate}
          onChange={(date) => setParams({...params, startDate: date})}
          selectsStart
          startDate={params.startDate}
          endDate={params.endDate}
        />
        <DatePicker
          selected={params.endDate}
          onChange={(date) => setParams({...params, endDate: date})}
          selectsEnd
          startDate={params.startDate}
          endDate={params.endDate}
          minDate={params.startDate}
        />
        {errors.dates && <span className="error-message">{errors.dates}</span>}
      </div>

      <button
        type="submit"
        disabled={!params.inn || !params.startDate || !params.endDate}
      >
        Поиск
      </button>
    </form>
  );
};

export default SearchForm;