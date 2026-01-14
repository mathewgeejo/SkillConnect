import api from '../lib/axios';

// Get all workers
export const getWorkers = async (params) => {
  const { data } = await api.get('/workers', { params });
  return data;
};

// Search workers
export const searchWorkers = async (params) => {
  const { data } = await api.get('/workers/search', { params });
  return data;
};

// Get worker by ID
export const getWorker = async (id) => {
  const { data } = await api.get(`/workers/${id}`);
  return data;
};

// Update worker profile
export const updateWorker = async (profileData) => {
  const { data } = await api.put('/workers/profile', profileData);
  return data;
};

// Add certificate
export const addCertificate = async (formData) => {
  const { data } = await api.post('/workers/certificate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Add portfolio item
export const addPortfolio = async (formData) => {
  const { data } = await api.post('/workers/portfolio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Delete portfolio item
export const deletePortfolio = async (portfolioId) => {
  const { data } = await api.delete(`/workers/portfolio/${portfolioId}`);
  return data;
};
