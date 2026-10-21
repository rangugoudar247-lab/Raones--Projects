import { Router } from 'express';
import { getResources } from '../controllers/resource.controller';

const router = Router();

// Resources are publicly readable
router.get('/', getResources);

export default router;
