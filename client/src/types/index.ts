export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type Language = 'en' | 'kn';

export interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  preferred_language: Language;
  village: string | null;
  district: string | null;
  state: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AIProfessionalHelp {
  recommended: boolean;
  reason: string;
}

export interface AIAdvisoryResponse {
  summary: string;
  urgency: UrgencyLevel;
  immediate_actions: string[];
  recommended_next_steps: string[];
  things_to_avoid: string[];
  professional_help: AIProfessionalHelp;
  follow_up_questions: string[];
  disclaimer: string;
  possible_concerns?: string[];
  possible_causes?: string[];
}

export interface AIEmergencyResponse {
  emergency_level: UrgencyLevel;
  immediate_safety_actions: string[];
  call_emergency_services: boolean;
  professional_assistance: string[];
  things_to_avoid: string[];
  next_steps: string[];
  warning: string;
}

export interface AdvisoryRecord {
  id: string;
  user_id: string;
  category: string;
  subcategory?: string | null;
  problem_description: string;
  location?: string | null;
  crop_type?: string | null;
  crop_stage?: string | null;
  livestock_type?: string | null;
  livestock_age?: string | null;
  duration?: string | null;
  user_severity?: UrgencyLevel | null;
  language: Language;
  additional_information?: string | null;
  ai_summary?: string | null;
  ai_urgency?: UrgencyLevel | null;
  ai_response: AIAdvisoryResponse;
  created_at: string;
}

export interface EmergencyRecord {
  id: string;
  user_id: string;
  emergency_type: string;
  description: string;
  location?: string | null;
  urgency: UrgencyLevel;
  ai_response: AIEmergencyResponse;
  created_at: string;
}

export interface ResourceRecord {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  phone?: string | null;
  website?: string | null;
  state?: string | null;
  district?: string | null;
  created_at: string;
}

export interface CreateAdvisoryInput {
  category: string;
  subcategory?: string;
  problem_description: string;
  location?: string;
  crop_type?: string;
  crop_stage?: string;
  livestock_type?: string;
  livestock_age?: string;
  duration?: string;
  user_severity?: UrgencyLevel;
  language: Language;
  additional_information?: string;
}

export interface EmergencyAnalysisInput {
  emergency_type: string;
  description: string;
  location?: string;
  urgency: UrgencyLevel;
  language: Language;
}
