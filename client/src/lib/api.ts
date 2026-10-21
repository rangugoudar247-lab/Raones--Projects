import {
  AdvisoryRecord,
  CreateAdvisoryInput,
  EmergencyAnalysisInput,
  EmergencyRecord,
  ResourceRecord,
  UserProfile,
  AIEmergencyResponse,
} from '../types';
import { supabase, isSupabaseClientConfigured } from './supabase';

const API_BASE = '/api';

// Helper to retrieve the current auth token
async function getAuthHeader(): Promise<Record<string, string>> {
  if (isSupabaseClientConfigured) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      return { Authorization: `Bearer ${session.access_token}` };
    }
  }

  // Check for local demo session
  const demoToken = localStorage.getItem('demo_auth_token');
  if (demoToken) {
    return { Authorization: `Bearer ${demoToken}` };
  }

  return {};
}

// Generalized JSON fetch wrapper
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const authHeader = await getAuthHeader();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeader,
    ...(options.headers as Record<string, string> || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data.message || data.error || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return data as T;
}

export const api = {
  // Advisories
  async createAdvisory(input: CreateAdvisoryInput): Promise<{ message: string; advisory: AdvisoryRecord }> {
    return apiFetch<{ message: string; advisory: AdvisoryRecord }>('/advisories', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async getAdvisories(category?: string): Promise<{ advisories: AdvisoryRecord[]; total: number }> {
    const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return apiFetch<{ advisories: AdvisoryRecord[]; total: number }>(`/advisories${query}`);
  },

  async getAdvisoryById(id: string): Promise<{ advisory: AdvisoryRecord }> {
    return apiFetch<{ advisory: AdvisoryRecord }>(`/advisories/${id}`);
  },

  async deleteAdvisory(id: string): Promise<{ message: string; id: string }> {
    return apiFetch<{ message: string; id: string }>(`/advisories/${id}`, {
      method: 'DELETE',
    });
  },

  // Emergency
  async analyzeEmergency(input: EmergencyAnalysisInput): Promise<{
    message: string;
    report_id: string;
    analysis: AIEmergencyResponse;
  }> {
    return apiFetch<{
      message: string;
      report_id: string;
      analysis: AIEmergencyResponse;
    }>('/emergency/analyze', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  // Resources
  async getResources(category?: string, search?: string): Promise<{ resources: ResourceRecord[]; total: number }> {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiFetch<{ resources: ResourceRecord[]; total: number }>(`/resources${queryString}`);
  },

  // Profile
  async getProfile(): Promise<{ profile: UserProfile }> {
    return apiFetch<{ profile: UserProfile }>('/profile');
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<{ message: string; profile: UserProfile }> {
    return apiFetch<{ message: string; profile: UserProfile }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // System Health
  async getHealth(): Promise<{
    status: string;
    service: string;
    integrations: { supabase_configured: boolean; gemini_configured: boolean };
  }> {
    return apiFetch('/health');
  },
};
