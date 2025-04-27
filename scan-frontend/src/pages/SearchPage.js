import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateINN } from '../utils/validation';
import { setSearchParams } from '../store/searchSlice';
import './searchpage.css';

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    inn: '',
    startDate: '',
    endDate: '',
    tonality: 'any'
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateINN(form.inn)) newErrors.inn = 'Неверный ИНН';
    if (!form.startDate || !form.endDate) newErrors.dates = 'Укажите даты';
    if (new Date(form.startDate) > new Date(form.endDate)) newErrors.dates = 'Некорректные даты';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(setSearchParams(form));
    navigate('/results');
  };

  return (
    <div>
      <h1>Поиск</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ИНН:</label>
          <input
            type="text"
            value={form.inn}
            onChange={(e) => setForm({...form, inn: e.target.value})}
          />
          {errors.inn && <span style={{color: 'red'}}>{errors.inn}</span>}
        </div>

        <div>
          <label>Дата начала:</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({...form, startDate: e.target.value})}
          />
        </div>

        <div>
          <label>Дата окончания:</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({...form, endDate: e.target.value})}
          />
          {errors.dates && <span style={{color: 'red'}}>{errors.dates}</span>}
        </div>

        <div>
          <label>Тональность:</label>
          <select
            value={form.tonality}
            onChange={(e) => setForm({...form, tonality: e.target.value})}
          >
            <option value="any">Любая</option>
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!form.inn || !form.startDate || !form.endDate}
        >
          Поиск
        </button>
      </form>
    </div>
  );
};

export default SearchPage;