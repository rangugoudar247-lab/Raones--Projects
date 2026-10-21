import { supabaseAdmin, isSupabaseConfigured } from './supabase.service';
import { AdvisoryRecord, EmergencyRecord, ResourceRecord, UserProfile } from '../types';

// In-memory fallback database for local offline demonstration / pre-configured Supabase setups
class InMemoryDatabase {
  public advisories: AdvisoryRecord[] = [];
  public emergencies: EmergencyRecord[] = [];
  public profiles: Map<string, UserProfile> = new Map();
  public resources: ResourceRecord[] = [
    {
      id: 'res-1',
      title: 'National Emergency Response Support System (ERSS)',
      description: 'Unified 24x7 emergency response service for police, fire, and medical emergencies across India.',
      category: 'Emergency',
      phone: '112',
      website: 'https://112.gov.in',
      state: 'All India',
      district: 'National',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-2',
      title: 'Pashu Sanjeevani - Veterinary Emergency Helpline',
      description: 'Toll-free 24/7 emergency veterinary healthcare assistance and mobile veterinary ambulance services for livestock in Karnataka.',
      category: 'Livestock',
      phone: '1962',
      website: 'https://ahvs.karnataka.gov.in',
      state: 'Karnataka',
      district: 'Statewide',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-3',
      title: 'Kisan Call Center (KCC) - Ministry of Agriculture',
      description: 'Free toll-free expert agricultural consultancy in Kannada and English on crops, pest control, weather, and fertilizers.',
      category: 'Agriculture',
      phone: '1800-180-1551',
      website: 'https://farmer.gov.in',
      state: 'All India',
      district: 'National',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-4',
      title: 'Karnataka State Disaster Management Authority (KSDMA)',
      description: 'Emergency control room for flood, cyclone, lightning, and severe drought distress.',
      category: 'Emergency',
      phone: '1070',
      website: 'https://ksdma.karnataka.gov.in',
      state: 'Karnataka',
      district: 'Statewide',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-5',
      title: 'Raitha Samparka Kendra (RSK) Portal',
      description: 'Local village-level agricultural extension centers for subsidized certified seeds, fertilizers, and pest management advisory.',
      category: 'Agriculture',
      phone: '080-22212842',
      website: 'https://raitamitra.karnataka.gov.in',
      state: 'Karnataka',
      district: 'Statewide',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-6',
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Crop insurance grievance and claim assistance for weather damages, drought, or pest devastation.',
      category: 'Agriculture',
      phone: '1800-200-5142',
      website: 'https://pmfby.gov.in',
      state: 'All India',
      district: 'National',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-7',
      title: 'PM-KISAN Farmer Helpline',
      description: 'Direct income support helpline for Rs. 6000 annual transfer queries and registration verification.',
      category: 'Livelihood',
      phone: '155261',
      website: 'https://pmkisan.gov.in',
      state: 'All India',
      district: 'National',
      created_at: new Date().toISOString(),
    },
    {
      id: 'res-8',
      title: 'Damini Lightning Alert System',
      description: 'Early warning mobile service for lightning strikes within 20-40 km radius.',
      category: 'Weather',
      phone: '1077',
      website: 'https://play.google.com/store/apps/details?id=com.lightening.live.damini',
      state: 'All India',
      district: 'National',
      created_at: new Date().toISOString(),
    }
  ];

  constructor() {
    // Seed default demo user profile
    this.profiles.set('00000000-0000-0000-0000-000000000001', {
      id: '00000000-0000-0000-0000-000000000001',
      full_name: 'Basavaraj Gowda',
      phone: '+91 98450 12345',
      preferred_language: 'kn',
      village: 'Hulimavu',
      district: 'Ramanagara',
      state: 'Karnataka',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}

export const inMemoryDb = new InMemoryDatabase();

export const dataStore = {
  // --- ADVISORIES ---
  async saveAdvisory(record: Omit<AdvisoryRecord, 'id' | 'created_at'>): Promise<AdvisoryRecord> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseAdmin
          .from('advisories')
          .insert({
            user_id: record.user_id,
            category: record.category,
            subcategory: record.subcategory,
            problem_description: record.problem_description,
            location: record.location,
            crop_type: record.crop_type,
            crop_stage: record.crop_stage,
            livestock_type: record.livestock_type,
            livestock_age: record.livestock_age,
            duration: record.duration,
            user_severity: record.user_severity,
            language: record.language,
            additional_information: record.additional_information,
            ai_summary: record.ai_summary,
            ai_urgency: record.ai_urgency,
            ai_response: record.ai_response,
          })
          .select()
          .single();

        if (!error && data) {
          return data as AdvisoryRecord;
        }
        console.warn('Supabase insert advisory returned error, falling back to local store:', error?.message);
      } catch (err) {
        console.warn('Supabase insert advisory failed:', err);
      }
    }

    const saved: AdvisoryRecord = {
      ...record,
      id: 'adv-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
    };
    inMemoryDb.advisories.unshift(saved);
    return saved;
  },

  async getUserAdvisories(userId: string, category?: string): Promise<AdvisoryRecord[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabaseAdmin
          .from('advisories')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (category && category !== 'all') {
          query = query.ilike('category', `%${category}%`);
        }

        const { data, error } = await query;
        if (!error && data) {
          return data as AdvisoryRecord[];
        }
        console.warn('Supabase get advisories error, falling back to local store:', error?.message);
      } catch (err) {
        console.warn('Supabase query advisories failed:', err);
      }
    }

    return inMemoryDb.advisories.filter(a => {
      const matchesUser = a.user_id === userId;
      const matchesCat = !category || category === 'all' || a.category.toLowerCase().includes(category.toLowerCase());
      return matchesUser && matchesCat;
    });
  },

  async getAdvisoryById(id: string, userId: string): Promise<AdvisoryRecord | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseAdmin
          .from('advisories')
          .select('*')
          .eq('id', id)
          .eq('user_id', userId)
          .single();

        if (!error && data) {
          return data as AdvisoryRecord;
        }
      } catch (err) {
        console.warn('Supabase query single advisory failed:', err);
      }
    }

    const found = inMemoryDb.advisories.find(a => a.id === id && a.user_id === userId);
    return found || null;
  },

  async deleteAdvisory(id: string, userId: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabaseAdmin
          .from('advisories')
          .delete()
          .eq('id', id)
          .eq('user_id', userId);

        if (!error) {
          return true;
        }
      } catch (err) {
        console.warn('Supabase delete advisory failed:', err);
      }
    }

    const initialLen = inMemoryDb.advisories.length;
    inMemoryDb.advisories = inMemoryDb.advisories.filter(a => !(a.id === id && a.user_id === userId));
    return inMemoryDb.advisories.length < initialLen;
  },

  // --- EMERGENCY REPORTS ---
  async saveEmergencyReport(record: Omit<EmergencyRecord, 'id' | 'created_at'>): Promise<EmergencyRecord> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseAdmin
          .from('emergency_reports')
          .insert({
            user_id: record.user_id,
            emergency_type: record.emergency_type,
            description: record.description,
            location: record.location,
            urgency: record.urgency,
            ai_response: record.ai_response,
          })
          .select()
          .single();

        if (!error && data) {
          return data as EmergencyRecord;
        }
      } catch (err) {
        console.warn('Supabase save emergency failed:', err);
      }
    }

    const saved: EmergencyRecord = {
      ...record,
      id: 'emg-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
    };
    inMemoryDb.emergencies.unshift(saved);
    return saved;
  },

  // --- RESOURCES ---
  async getResources(category?: string, search?: string): Promise<ResourceRecord[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabaseAdmin
          .from('resources')
          .select('*')
          .order('created_at', { ascending: false });

        if (category && category !== 'all') {
          query = query.ilike('category', `%${category}%`);
        }
        if (search) {
          query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as ResourceRecord[];
        }
      } catch (err) {
        console.warn('Supabase get resources failed:', err);
      }
    }

    return inMemoryDb.resources.filter(r => {
      const matchCat = !category || category === 'all' || r.category.toLowerCase().includes(category.toLowerCase());
      const matchSearch = !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  },

  // --- USER PROFILE ---
  async getProfile(userId: string): Promise<UserProfile | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (!error && data) {
          return data as UserProfile;
        }
      } catch (err) {
        console.warn('Supabase get profile failed:', err);
      }
    }

    return inMemoryDb.profiles.get(userId) || {
      id: userId,
      full_name: 'Farmer User',
      phone: null,
      preferred_language: 'en',
      village: null,
      district: null,
      state: 'Karnataka',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseAdmin
          .from('profiles')
          .upsert({
            id: userId,
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (!error && data) {
          return data as UserProfile;
        }
      } catch (err) {
        console.warn('Supabase update profile failed:', err);
      }
    }

    const current = await this.getProfile(userId);
    const updated: UserProfile = {
      ...current!,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    inMemoryDb.profiles.set(userId, updated);
    return updated;
  }
};
