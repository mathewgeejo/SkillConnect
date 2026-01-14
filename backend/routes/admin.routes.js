import express from 'express';
import {
  getUsers,
  updateUserStatus,
  getStats,
  getCertificatesForVerification
} from '../controllers/admin.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/stats', getStats);
router.get('/certificates/pending', getCertificatesForVerification);

export default router;
