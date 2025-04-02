import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (email, password) =>
  api.post('/auth/login', { email, password }).then((res) => res.data);

export const register = (data) =>
  api.post('/auth/register', data).then((res) => res.data);

export const createEvent = (eventData) =>
  api.post('/events', eventData).then((res) => res.data);

export const getEvents = (filters = {}) =>
  api.get('/events', { params: filters }).then((res) => res.data);

export const updateEvent = (id, eventData) =>
  api.put(`/events/${id}`, eventData).then((res) => res.data);

export const deleteEvent = (id) =>
  api.delete(`/events/${id}`).then((res) => res.data);

export const approveEvent = (id) =>
  api.put(`/events/${id}/approve`).then((res) => res.data);

export const rateEvent = (id, rating) =>
  api.post(`/events/${id}/rate`, { rating }).then((res) => res.data);