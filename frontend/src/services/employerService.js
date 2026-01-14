import api from '../lib/axios';

// Get employer by ID
export const getEmployer = async (id) => {
  const { data } = await api.get(`/employers/${id}`);
  return data;
};

// Update employer profile
export const updateEmployer = async (profileData) => {
  const { data } = await api.put('/employers/profile', profileData);
  return data;
};
