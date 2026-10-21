import { z } from 'zod';

export const UrgencyLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);
export const LanguageSchema = z.enum(['en', 'kn']);

// 1. Advisory Input Schema
export const AdvisoryInputSchema = z.object({
  category: z.string().min(1, 'Category is required').max(100),
  subcategory: z.string().max(100).optional(),
  problem_description: z.string().min(5, 'Problem description must be at least 5 characters').max(5000),
  location: z.string().max(200).optional(),
  crop_type: z.string().max(100).optional(),
  crop_stage: z.string().max(100).optional(),
  livestock_type: z.string().max(100).optional(),
  livestock_age: z.string().max(100).optional(),
  duration: z.string().max(100).optional(),
  user_severity: UrgencyLevelSchema.optional(),
  language: LanguageSchema.default('en'),
  additional_information: z.string().max(5000).optional(),
});

export type AdvisoryInput = z.infer<typeof AdvisoryInputSchema>;

// 2. AI Advisory Output Schema
export const AIAdvisoryResponseSchema = z.object({
  summary: z.string().min(1),
  urgency: UrgencyLevelSchema,
  immediate_actions: z.array(z.string()).min(1),
  recommended_next_steps: z.array(z.string()),
  things_to_avoid: z.array(z.string()),
  professional_help: z.object({
    recommended: z.boolean(),
    reason: z.string(),
  }),
  follow_up_questions: z.array(z.string()).default([]),
  disclaimer: z.string(),
  possible_concerns: z.array(z.string()).optional(),
  possible_causes: z.array(z.string()).optional(),
});

export type AIAdvisoryResponse = z.infer<typeof AIAdvisoryResponseSchema>;

// 3. Emergency Input Schema
export const EmergencyInputSchema = z.object({
  emergency_type: z.string().min(1, 'Emergency type is required').max(100),
  description: z.string().min(5, 'Description must be at least 5 characters').max(5000),
  location: z.string().max(200).optional(),
  urgency: UrgencyLevelSchema.default('high'),
  language: LanguageSchema.default('en'),
});

export type EmergencyInput = z.infer<typeof EmergencyInputSchema>;

// 4. AI Emergency Output Schema
export const AIEmergencyResponseSchema = z.object({
  emergency_level: UrgencyLevelSchema,
  immediate_safety_actions: z.array(z.string()).min(1),
  call_emergency_services: z.boolean(),
  professional_assistance: z.array(z.string()),
  things_to_avoid: z.array(z.string()),
  next_steps: z.array(z.string()),
  warning: z.string(),
});

export type AIEmergencyResponse = z.infer<typeof AIEmergencyResponseSchema>;

// 5. User Profile Update Schema
export const ProfileUpdateSchema = z.object({
  full_name: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  preferred_language: LanguageSchema.default('en'),
  village: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
});

export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;

// 6. Resource Query Schema
export const ResourceQuerySchema = z.object({
  category: z.string().optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  search: z.string().optional(),
});

export type ResourceQuery = z.infer<typeof ResourceQuerySchema>;
