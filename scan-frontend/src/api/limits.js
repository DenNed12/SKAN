import axios from 'axios';
import { getAccessToken } from '../utils/auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.scan.ru/v1';

export const fetchCompanyLimits = async () => {
  try {
    const token = getAccessToken();

    if (!token) {
      throw new Error('Требуется авторизация');
    }

    const response = await axios.get(`${API_BASE_URL}/account/limits`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      used: response.data.usedCompanies,
      limit: response.data.companyLimit
    };

  } catch (error) {
    console.error('Ошибка получения лимитов:', error);
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Неизвестная ошибка при получении лимитов'
    );
  }
};