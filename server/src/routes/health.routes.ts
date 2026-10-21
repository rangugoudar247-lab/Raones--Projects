import { Router, Request, Response } from 'express';
import { isSupabaseConfigured } from '../services/supabase.service';
import { config } from '../config';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'Rural Emergency & Livelihood Assistant API',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    integrations: {
      supabase_configured: isSupabaseConfigured(),
      gemini_configured: Boolean(config.gemini.apiKey),
    }
  });
});

export default router;
