import { Router } from 'express';
import { analyzeEmergency } from '../controllers/emergency.controller';

const router = Router();

// Emergency triage is accessible immediately (with optional user context)
router.post('/analyze', analyzeEmergency);

export default router;
