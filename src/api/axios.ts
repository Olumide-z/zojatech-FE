import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

console.log('API URL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  console.log(
    'REQUEST:',
    config.method,
    `${config.baseURL}${config.url}`,
    config.data
  );

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('RESPONSE:', response);
    return response;
  },
  (error) => {
    console.log('AXIOS ERROR:', error);
    return Promise.reject(error);
  }
);

export default api;