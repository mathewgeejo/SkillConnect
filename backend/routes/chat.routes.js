import express from 'express';
import {
  getChats,
  getChat,
  createChat,
  getMessages,
  sendMessage,
  sendAIMessage,
  clearAIConversation
} from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// AI chat endpoints (public)
router.post('/ai/message', sendAIMessage);
router.delete('/ai/conversation/:conversationId', clearAIConversation);

// Protected routes
router.use(protect);

router.get('/', getChats);
router.post('/', createChat);
router.get('/:id', getChat);
router.get('/:id/messages', getMessages);
router.post('/:id/messages', sendMessage);

export default router;
