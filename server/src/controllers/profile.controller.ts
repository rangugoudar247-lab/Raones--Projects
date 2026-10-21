import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { ProfileUpdateSchema } from '../schemas';
import { dataStore } from '../services/store.service';

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', message: 'User identification missing.' });
    return;
  }

  const profile = await dataStore.getProfile(userId);
  res.status(200).json({ profile });
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', message: 'User identification missing.' });
    return;
  }

  const validated = ProfileUpdateSchema.parse(req.body);
  const updated = await dataStore.updateProfile(userId, validated);

  res.status(200).json({
    message: 'Profile updated successfully',
    profile: updated,
  });
};
