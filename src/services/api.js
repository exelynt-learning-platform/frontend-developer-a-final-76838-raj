import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6a96b78f0e3240db90615393.mockapi.io/api/v1',
});

export const fetchEmployees = () => api.get('/employee');
export const fetchEmployeeById = (id) => api.get(`/employee/${id}`);
export const createEmployee = (data) => api.post('/employee', data);
export const updateEmployee = (id, data) => api.put(`/employee/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employee/${id}`);
export const fetchCountries = () => api.get('/country');