-- ==============================================================================
-- Rural Emergency & Livelihood Assistant (Gram Sahayak)
-- Database Migration: Initial Schema, Indexes & Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  preferred_language text not null default 'en',
  village text,
  district text,
  state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. ADVISORIES TABLE
create table if not exists public.advisories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  subcategory text,
  problem_description text not null,
  location text,
  crop_type text,
  crop_stage text,
  livestock_type text,
  livestock_age text,
  duration text,
  user_severity text,
  language text not null default 'en',
  additional_information text,
  ai_summary text,
  ai_urgency text,
  ai_response jsonb,
  created_at timestamptz not null default now()
);

-- 3. EMERGENCY REPORTS TABLE
create table if not exists public.emergency_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  emergency_type text not null,
  description text not null,
  location text,
  urgency text not null,
  ai_response jsonb,
  created_at timestamptz not null default now()
);

-- 4. RESOURCES TABLE (Rural safety, helpline & agricultural directories)
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  phone text,
  website text,
  state text,
  district text,
  created_at timestamptz not null default now()
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================
create index if not exists advisories_user_id_idx on public.advisories(user_id);
create index if not exists advisories_category_idx on public.advisories(category);
create index if not exists advisories_created_at_idx on public.advisories(created_at desc);
create index if not exists emergency_reports_user_id_idx on public.emergency_reports(user_id);
create index if not exists resources_category_idx on public.resources(category);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.advisories enable row level security;
alter table public.emergency_reports enable row level security;
alter table public.resources enable row level security;

-- Profiles Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Advisories Policies
create policy "Users can view own advisories"
  on public.advisories for select
  using (auth.uid() = user_id);

create policy "Users can insert own advisories"
  on public.advisories for insert
  with check (auth.uid() = user_id);

create policy "Users can update own advisories"
  on public.advisories for update
  using (auth.uid() = user_id);

create policy "Users can delete own advisories"
  on public.advisories for delete
  using (auth.uid() = user_id);

-- Emergency Reports Policies
create policy "Users can view own emergency reports"
  on public.emergency_reports for select
  using (auth.uid() = user_id);

create policy "Users can insert own emergency reports"
  on public.emergency_reports for insert
  with check (auth.uid() = user_id);

-- Resources Policies (Public read for all authenticated and anonymous visitors)
create policy "Public resources read access"
  on public.resources for select
  using (true);

-- Service role can manage resources
create policy "Service role can manage resources"
  on public.resources for all
  using (auth.role() = 'service_role');

-- ==============================================================================
-- PROFILE AUTO-CREATION TRIGGER
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, preferred_language, created_at, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Rural Assistant User'),
    coalesce(new.raw_user_meta_data->>'preferred_language', 'en'),
    now(),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
