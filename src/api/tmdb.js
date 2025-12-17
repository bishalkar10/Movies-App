import axios from 'axios';

// In production (Netlify), this falls back to '/api' (relative path).
// In local dev, I can set VITE_API_BASE_URL="https://your-app.netlify.app/api" to use the remote proxy.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
  },
  timeout: 30000, // 30 seconds timeout
});

export const getTrending = (type, time, page = 1) => {
  return api.get(`/trending/${type}/${time}`, { params: { page } });
};

export const getDiscover = (type, page = 1, genre = '') => {
  return api.get(`/discover/${type}`, { params: { page, with_genres: genre } });
};

export const getSearch = (type, query, page = 1) => {
  return api.get(`/search/${type}`, {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });
};

export const getDetails = (type, id) => {
  return api.get(`/${type}/${id}`);
};

export default api;
