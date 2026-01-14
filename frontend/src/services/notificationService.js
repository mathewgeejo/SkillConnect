import api from '../lib/axios';

// Get notifications
export const getNotifications = async (params) => {
  const { data } = await api.get('/notifications', { params });
  return data;
};

// Mark as read
export const markAsRead = async (id) => {
  const { data } = await api.put(`/notifications/${id}/read`);
  return data;
};

// Mark all as read
export const markAllAsRead = async () => {
  const { data } = await api.put('/notifications/read-all');
  return data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const { data } = await api.delete(`/notifications/${id}`);
  return data;
};
