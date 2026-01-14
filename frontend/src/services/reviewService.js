import api from '../lib/axios';

// Get reviews for a user
export const getReviews = async (userId) => {
  const { data } = await api.get(`/reviews/${userId}`);
  return data;
};

// Create review
export const createReview = async (reviewData) => {
  const { data } = await api.post('/reviews', reviewData);
  return data;
};

// Update review
export const updateReview = async (id, reviewData) => {
  const { data } = await api.put(`/reviews/${id}`, reviewData);
  return data;
};

// Delete review
export const deleteReview = async (id) => {
  const { data } = await api.delete(`/reviews/${id}`);
  return data;
};

// Mark review as helpful
export const markHelpful = async (id) => {
  const { data } = await api.post(`/reviews/${id}/helpful`);
  return data;
};
