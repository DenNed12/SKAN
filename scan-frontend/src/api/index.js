import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.scan.ru/v1',
});

export const authAPI = {
  login: (credentials) => API.post('/account/login', credentials),
};

export const searchAPI = {
  getHistograms: (params) => API.post('/objectsearch/histograms', params),
  getDocuments: (ids) => API.post('/documents', { ids }),
};