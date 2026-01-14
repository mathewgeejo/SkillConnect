import express from 'express';
import {
  verifyCertificate
} from '../controllers/certificate.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/verify', protect, authorize('admin'), upload.single('certificate'), verifyCertificate);

export default router;
