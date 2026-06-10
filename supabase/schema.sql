-- LIGHT LINK v1.4 Supabase Schema

create extension if not exists "uuid-ossp";

create table if not exists public.stores (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  area text not null,
  station text,
  description text,
  status text not null default 'active',
  created_at timestamptz default now()
);

create table if not exists public.talents (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  age integer,
  area text not null,
  profile text,
  tags text[] not null default '{}',
  price integer not null default 0,
  schedule text,
  ai_score integer not null default 80,
  status text not null default 'active',
  created_at timestamptz default now()
);

create table if not exists public.reservations (
  id uuid primary key default uuid_generate_v4(),
  talent_id uuid references public.talents(id) on delete set null,
  store_id uuid references public.stores(id) on delete set null,
  customer_name text,
  phone text,
  requested_at text,
  note text,
  status text not null default 'new',
  created_at timestamptz default now()
);

alter table public.stores enable row level security;
alter table public.talents enable row level security;
alter table public.reservations enable row level security;

drop policy if exists "stores_read_all" on public.stores;
create policy "stores_read_all" on public.stores for select using (true);

drop policy if exists "talents_read_all" on public.talents;
create policy "talents_read_all" on public.talents for select using (true);

drop policy if exists "talents_insert_demo" on public.talents;
create policy "talents_insert_demo" on public.talents for insert with check (true);

drop policy if exists "reservations_insert_all" on public.reservations;
create policy "reservations_insert_all" on public.reservations for insert with check (true);

drop policy if exists "reservations_read_demo" on public.reservations;
create policy "reservations_read_demo" on public.reservations for select using (true);


-- v1.6 Auth / Store Scope

create table if not exists public.profiles (
  id uuid primary key,
  email text,
  role text not null default 'user' check (role in ('user','store_admin','admin')),
  store_id uuid references public.stores(id) on delete set null,
  display_name text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create table if not exists public.store_members (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'owner',
  created_at timestamptz default now(),
  unique(store_id, user_id)
);

alter table public.store_members enable row level security;

drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "store_members_self_read" on public.store_members;
create policy "store_members_self_read" on public.store_members
for select using (auth.uid() = user_id);

drop policy if exists "talents_store_scope_insert" on public.talents;
create policy "talents_store_scope_insert" on public.talents
for insert with check (
  auth.uid() is null
  or exists (
    select 1 from public.store_members sm
    where sm.store_id = talents.store_id
    and sm.user_id = auth.uid()
  )
);

drop policy if exists "reservations_store_scope_read" on public.reservations;
create policy "reservations_store_scope_read" on public.reservations
for select using (
  auth.uid() is null
  or exists (
    select 1 from public.store_members sm
    where sm.store_id = reservations.store_id
    and sm.user_id = auth.uid()
  )
);


drop policy if exists "talents_store_scope_update" on public.talents;
create policy "talents_store_scope_update" on public.talents
for update using (
  auth.uid() is null
  or exists (
    select 1 from public.store_members sm
    where sm.store_id = talents.store_id
    and sm.user_id = auth.uid()
  )
)
with check (
  auth.uid() is null
  or exists (
    select 1 from public.store_members sm
    where sm.store_id = talents.store_id
    and sm.user_id = auth.uid()
  )
);

drop policy if exists "reservations_store_scope_update" on public.reservations;
create policy "reservations_store_scope_update" on public.reservations
for update using (
  auth.uid() is null
  or exists (
    select 1 from public.store_members sm
    where sm.store_id = reservations.store_id
    and sm.user_id = auth.uid()
  )
)
with check (
  auth.uid() is null
  or exists (
    select 1 from public.store_members sm
    where sm.store_id = reservations.store_id
    and sm.user_id = auth.uid()
  )
);


-- v1.8 AI Chat History

create table if not exists public.ai_chat_histories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  user_text text not null,
  ai_reply text not null,
  extracted text[] not null default '{}',
  recommendations text[] not null default '{}',
  created_at timestamptz default now()
);

alter table public.ai_chat_histories enable row level security;

drop policy if exists "ai_chat_histories_insert_any" on public.ai_chat_histories;
create policy "ai_chat_histories_insert_any" on public.ai_chat_histories
for insert with check (true);

drop policy if exists "ai_chat_histories_self_read" on public.ai_chat_histories;
create policy "ai_chat_histories_self_read" on public.ai_chat_histories
for select using (auth.uid() is null or auth.uid() = user_id);


-- v1.9 LINE Event / Conversion Tracking

create table if not exists public.line_events (
  id uuid primary key default uuid_generate_v4(),
  source text,
  event_type text not null default 'click',
  metadata jsonb not null default '{}',
  created_at timestamptz default now()
);

alter table public.line_events enable row level security;

drop policy if exists "line_events_insert_any" on public.line_events;
create policy "line_events_insert_any" on public.line_events
for insert with check (true);


-- v2.0 Billing / Stripe
create table if not exists public.billing_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free','standard','premium')),
  status text not null default 'inactive',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz default now()
);

alter table public.billing_subscriptions enable row level security;

drop policy if exists "billing_subscriptions_store_read" on public.billing_subscriptions;
create policy "billing_subscriptions_store_read" on public.billing_subscriptions
for select using (auth.uid() is null or true);

drop policy if exists "billing_subscriptions_write_demo" on public.billing_subscriptions;
create policy "billing_subscriptions_write_demo" on public.billing_subscriptions
for insert with check (true);


-- v2.2 Analytics Events

create table if not exists public.analytics_events (
  id uuid primary key default uuid_generate_v4(),
  event_name text not null,
  source text,
  metadata jsonb not null default '{}',
  created_at timestamptz default now()
);

alter table public.analytics_events enable row level security;

drop policy if exists "analytics_events_insert_any" on public.analytics_events;
create policy "analytics_events_insert_any" on public.analytics_events
for insert with check (true);

drop policy if exists "analytics_events_admin_read" on public.analytics_events;
create policy "analytics_events_admin_read" on public.analytics_events
for select using (true);


-- v2.3 Talent Media / Supabase Storage

create table if not exists public.talent_media (
  id uuid primary key default uuid_generate_v4(),
  talent_id uuid references public.talents(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order integer not null default 99,
  created_at timestamptz default now()
);

alter table public.talent_media enable row level security;

drop policy if exists "talent_media_read_all" on public.talent_media;
create policy "talent_media_read_all" on public.talent_media
for select using (true);

drop policy if exists "talent_media_write_demo" on public.talent_media;
create policy "talent_media_write_demo" on public.talent_media
for all using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('talent-media', 'talent-media', true)
on conflict (id) do update set public = excluded.public;


-- v2.4 AI Matching Profiles

create table if not exists public.matching_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  mood text,
  pace text,
  talk text,
  budget text,
  area text,
  timing text,
  result jsonb not null default '{}',
  created_at timestamptz default now()
);

alter table public.matching_profiles enable row level security;

drop policy if exists "matching_profiles_insert_any" on public.matching_profiles;
create policy "matching_profiles_insert_any" on public.matching_profiles
for insert with check (true);

drop policy if exists "matching_profiles_read_demo" on public.matching_profiles;
create policy "matching_profiles_read_demo" on public.matching_profiles
for select using (auth.uid() is null or auth.uid() = user_id);


-- v2.5 Preference Learning

create table if not exists public.user_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  favorite_tags text[] not null default '{}',
  favorite_talent_ids text[] not null default '{}',
  viewed_talent_ids text[] not null default '{}',
  matching_history jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_preferences enable row level security;

drop policy if exists "user_preferences_self" on public.user_preferences;
create policy "user_preferences_self" on public.user_preferences
for all using (auth.uid() is null or auth.uid() = user_id)
with check (auth.uid() is null or auth.uid() = user_id);


-- v2.7 Notifications

create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id) on delete cascade,
  type text not null default 'system',
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;

drop policy if exists "notifications_read_demo" on public.notifications;
create policy "notifications_read_demo" on public.notifications
for select using (true);

drop policy if exists "notifications_insert_any" on public.notifications;
create policy "notifications_insert_any" on public.notifications
for insert with check (true);

drop policy if exists "notifications_update_demo" on public.notifications;
create policy "notifications_update_demo" on public.notifications
for update using (true) with check (true);


-- v2.8 Notification Dispatch Logs

create table if not exists public.notification_dispatch_logs (
  id uuid primary key default uuid_generate_v4(),
  channel text not null,
  status text not null,
  payload jsonb not null default '{}',
  created_at timestamptz default now()
);

alter table public.notification_dispatch_logs enable row level security;

drop policy if exists "notification_dispatch_logs_demo" on public.notification_dispatch_logs;
create policy "notification_dispatch_logs_demo" on public.notification_dispatch_logs
for all using (true) with check (true);


-- v2.9 Realtime Notifications
-- Supabase Realtime用。既にpublication登録済みの場合はエラーになることがあります。
-- Supabase SQL Editorで必要に応じて実行してください。
-- alter publication supabase_realtime add table public.notifications;


-- v4.0 AI Concierge Sessions

create table if not exists public.concierge_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  mood text,
  area text,
  budget text,
  timing text,
  messages jsonb not null default '[]',
  recommendations jsonb not null default '[]',
  created_at timestamptz default now()
);

alter table public.concierge_sessions enable row level security;

drop policy if exists "concierge_sessions_insert_any" on public.concierge_sessions;
create policy "concierge_sessions_insert_any" on public.concierge_sessions
for insert with check (true);

drop policy if exists "concierge_sessions_read_demo" on public.concierge_sessions;
create policy "concierge_sessions_read_demo" on public.concierge_sessions
for select using (auth.uid() is null or auth.uid() = user_id);


-- v4.1 SaaS Store Applications

create table if not exists public.store_applications (
  id uuid primary key default uuid_generate_v4(),
  store_name text not null,
  owner_name text not null,
  email text not null,
  phone text,
  area text,
  status text not null default 'pending' check (status in ('pending','approved','rejected','hold')),
  created_at timestamptz default now()
);

alter table public.store_applications enable row level security;

drop policy if exists "store_applications_insert_any" on public.store_applications;
create policy "store_applications_insert_any" on public.store_applications
for insert with check (true);

drop policy if exists "store_applications_admin_demo" on public.store_applications;
create policy "store_applications_admin_demo" on public.store_applications
for all using (true) with check (true);


-- v4.2 Store Growth

create table if not exists public.store_blog_posts (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id) on delete cascade,
  title text not null,
  body text not null,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz default now()
);

alter table public.store_blog_posts enable row level security;

drop policy if exists "store_blog_posts_read_published" on public.store_blog_posts;
create policy "store_blog_posts_read_published" on public.store_blog_posts
for select using (status = 'published' or auth.uid() is null);

drop policy if exists "store_blog_posts_write_demo" on public.store_blog_posts;
create policy "store_blog_posts_write_demo" on public.store_blog_posts
for all using (true) with check (true);


-- v4.3 AI Ranking

create table if not exists public.ranking_snapshots (
  id uuid primary key default uuid_generate_v4(),
  ranking_type text not null,
  items jsonb not null default '[]',
  created_at timestamptz default now()
);

alter table public.ranking_snapshots enable row level security;

drop policy if exists "ranking_snapshots_read_all" on public.ranking_snapshots;
create policy "ranking_snapshots_read_all" on public.ranking_snapshots
for select using (true);

drop policy if exists "ranking_snapshots_write_demo" on public.ranking_snapshots;
create policy "ranking_snapshots_write_demo" on public.ranking_snapshots
for insert with check (true);


-- v5.1 Safety / Reports

create table if not exists public.safety_reports (
  id uuid primary key default uuid_generate_v4(),
  target_type text not null default 'general',
  target_id text,
  reason text not null default 'other',
  detail text not null,
  status text not null default 'open' check (status in ('open','reviewing','closed')),
  created_at timestamptz default now()
);

alter table public.safety_reports enable row level security;

drop policy if exists "safety_reports_insert_any" on public.safety_reports;
create policy "safety_reports_insert_any" on public.safety_reports
for insert with check (true);

drop policy if exists "safety_reports_admin_demo" on public.safety_reports;
create policy "safety_reports_admin_demo" on public.safety_reports
for select using (true);
