import express from 'express';
import {
  getEmployer,
  updateEmployer,
  deleteEmployer
} from '../controllers/employer.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:id', getEmployer);
router.put('/profile', protect, authorize('employer'), updateEmployer);
router.delete('/profile', protect, authorize('employer'), deleteEmployer);

export default router;
