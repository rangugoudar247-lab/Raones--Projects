import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import {
  createAdvisory,
  getAdvisories,
  getAdvisoryById,
  deleteAdvisory,
} from '../controllers/advisory.controller';

const router = Router();

// All advisory routes require authentication
router.use(authenticateUser);

router.post('/', createAdvisory);
router.get('/', getAdvisories);
router.get('/:id', getAdvisoryById);
router.delete('/:id', deleteAdvisory);

export default router;
