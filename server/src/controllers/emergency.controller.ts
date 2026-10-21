import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { EmergencyInputSchema } from '../schemas';
import { geminiService } from '../services/gemini.service';
import { dataStore } from '../services/store.service';

export const analyzeEmergency = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  // Can be authenticated or guest/urgent reporter
  const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';

  // 1. Validate request body with Zod
  const validatedInput = EmergencyInputSchema.parse(req.body);

  // 2. Call Gemini emergency AI model
  const aiResponse = await geminiService.generateEmergencyGuidance(validatedInput);

  // 3. Save report to database
  const record = await dataStore.saveEmergencyReport({
    user_id: userId,
    emergency_type: validatedInput.emergency_type,
    description: validatedInput.description,
    location: validatedInput.location || null,
    urgency: aiResponse.emergency_level,
    ai_response: aiResponse,
  });

  res.status(200).json({
    message: 'Emergency analyzed successfully',
    report_id: record.id,
    analysis: aiResponse,
  });
};
