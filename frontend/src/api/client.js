import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically inject JWT token to protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const vehicleApi = {
  getAll: () => api.get('/vehicles'),
  search: (params) => api.get('/vehicles/search', { params }),
  create: (data) => api.post('/vehicles', data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
  purchase: (id) => api.post(`/vehicles/${id}/purchase`),
  restock: (id, amount) => api.post(`/vehicles/${id}/restock`, { amount }),
};

export const savedVehicleApi = {
  save: (vehicle_id) => api.post('/saved-vehicles', { vehicle_id }),
  unsave: (vehicle_id) => api.delete(`/saved-vehicles/${vehicle_id}`),
  getMyGarage: () => api.get('/saved-vehicles'),
};

export const transactionApi = {
  getMyPurchases: () => api.get('/transactions/my-purchases'),
};

export default api;