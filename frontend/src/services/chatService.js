import api from '../lib/axios';

// Get all chats
export const getChats = async () => {
  const { data } = await api.get('/chat');
  return data;
};

// Get single chat
export const getChat = async (id) => {
  const { data } = await api.get(`/chat/${id}`);
  return data;
};

// Create chat
export const createChat = async (chatData) => {
  const { data } = await api.post('/chat', chatData);
  return data;
};

// Get messages
export const getMessages = async (chatId, params) => {
  const { data } = await api.get(`/chat/${chatId}/messages`, { params });
  return data;
};

// Send message
export const sendMessage = async (chatId, messageData) => {
  const { data } = await api.post(`/chat/${chatId}/messages`, messageData);
  return data;
};
