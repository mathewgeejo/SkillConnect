import express from 'express';
import {
  getWorkers,
  getWorker,
  updateWorker,
  deleteWorker,
  searchWorkers,
  updateCertificate,
  addPortfolio,
  deletePortfolio
} from '../controllers/worker.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getWorkers);
router.get('/search', searchWorkers);
router.get('/:id', getWorker);
router.put('/profile', protect, authorize('worker'), updateWorker);
router.delete('/profile', protect, authorize('worker'), deleteWorker);
router.post('/certificate', protect, authorize('worker'), upload.single('certificate'), updateCertificate);
router.post('/portfolio', protect, authorize('worker'), upload.single('image'), addPortfolio);
router.delete('/portfolio/:portfolioId', protect, authorize('worker'), deletePortfolio);

export default router;
