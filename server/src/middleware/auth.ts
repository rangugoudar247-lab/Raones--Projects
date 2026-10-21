import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin, isSupabaseConfigured } from '../services/supabase.service';

export interface AuthenticatedUser {
  id: string;
  email?: string;
  role?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  token?: string;
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication token is missing. Please log in.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  req.token = token;

  // Development/Demo fallback token for quick testing
  if (token === 'demo-user-token' || token.startsWith('demo-')) {
    req.user = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'raitha.demo@ruralassistant.org',
      role: 'authenticated',
    };
    next();
    return;
  }

  // Validate with Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

      if (error || !user) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid or expired session. Please log in again.',
        });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      next();
      return;
    } catch (err) {
      console.error('Auth verification error:', err);
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Could not verify authentication credentials.',
      });
      return;
    }
  }

  // If Supabase credentials are placeholder in development, allow demo user id
  req.user = {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'local.farmer@ruralassistant.org',
    role: 'authenticated',
  };
  next();
};
