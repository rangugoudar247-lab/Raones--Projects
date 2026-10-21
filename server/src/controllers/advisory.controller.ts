import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { AdvisoryInputSchema } from '../schemas';
import { geminiService } from '../services/gemini.service';
import { dataStore } from '../services/store.service';

export const createAdvisory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', message: 'User identification missing.' });
    return;
  }

  // 1. Validate request body with Zod
  const validatedInput = AdvisoryInputSchema.parse(req.body);

  // 2. Call Gemini AI service
  const aiResponse = await geminiService.generateAdvisory(validatedInput);

  // 3. Save into Supabase / dataStore
  const record = await dataStore.saveAdvisory({
    user_id: userId,
    category: validatedInput.category,
    subcategory: validatedInput.subcategory || null,
    problem_description: validatedInput.problem_description,
    location: validatedInput.location || null,
    crop_type: validatedInput.crop_type || null,
    crop_stage: validatedInput.crop_stage || null,
    livestock_type: validatedInput.livestock_type || null,
    livestock_age: validatedInput.livestock_age || null,
    duration: validatedInput.duration || null,
    user_severity: validatedInput.user_severity || null,
    language: validatedInput.language,
    additional_information: validatedInput.additional_information || null,
    ai_summary: aiResponse.summary,
    ai_urgency: aiResponse.urgency,
    ai_response: aiResponse,
  });

  res.status(201).json({
    message: 'Advisory generated successfully',
    advisory: record,
  });
};

export const getAdvisories = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', message: 'User identification missing.' });
    return;
  }

  const category = req.query.category as string | undefined;
  const records = await dataStore.getUserAdvisories(userId, category);

  res.status(200).json({
    advisories: records,
    total: records.length,
  });
};

export const getAdvisoryById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', message: 'User identification missing.' });
    return;
  }

  const id = String(req.params.id);
  const advisory = await dataStore.getAdvisoryById(id, userId);

  if (!advisory) {
    res.status(404).json({
      error: 'Not Found',
      message: 'Advisory not found or you do not have permission to view it.',
    });
    return;
  }

  res.status(200).json({ advisory });
};

export const deleteAdvisory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', message: 'User identification missing.' });
    return;
  }

  const id = String(req.params.id);
  const deleted = await dataStore.deleteAdvisory(id, userId);

  if (!deleted) {
    res.status(404).json({
      error: 'Not Found',
      message: 'Advisory not found or already deleted.',
    });
    return;
  }

  res.status(200).json({
    message: 'Advisory successfully deleted',
    id,
  });
};
