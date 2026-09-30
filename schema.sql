-- ============================================================
-- PROPKADS DATABASE SCHEMA (Neon)
-- Run this in: Neon Console > your project > SQL Editor
-- ============================================================

-- Team members / admin users
create table if not exists users (
  id serial primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null default 'team',  -- 'admin' or 'team'
  created_at timestamptz not null default now()
);

-- Contact form submissions
create table if not exists leads (
  id serial primary key,
  full_name text not null,
  company_name text,
  phone text not null,
  city text,
  inventory_type text,
  status text not null default 'New',  -- New / Contacted / Site Visit / Booked / Closed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Follow-up notes/log per lead
create table if not exists lead_notes (
  id serial primary key,
  lead_id integer not null references leads(id) on delete cascade,
  author_name text,
  note text not null,
  created_at timestamptz not null default now()
);

-- Editable site text
create table if not exists site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

insert into site_content (key, value) values
  ('hero_heading', 'Sell Your Real Estate Inventory With a Complete Revenue System — Not Just Ads'),
  ('hero_subheading', 'We help real estate developers generate high-intent buyers, control leads through CRM, monitor sales teams, and improve conversions — end to end.'),
  ('hero_bullet_1', 'Performance Marketing (Buyer Acquisition)'),
  ('hero_bullet_2', 'CRM Integration & Lead Control'),
  ('hero_bullet_3', 'Sales Team Accountability & Closing Support'),
  ('service_1_title', 'Buyer Acquisition'),
  ('service_1_desc', 'High-intent buyers through targeted digital campaigns based on location, budget, and inventory type.'),
  ('service_2_title', 'CRM Integration & Lead Control'),
  ('service_2_desc', 'All leads captured in CRM with real-time tracking, tagging, and automated distribution.'),
  ('service_3_title', 'Sales Team Accountability'),
  ('service_3_desc', 'Response times, follow-ups, and conversions monitored to improve discipline and performance.'),
  ('service_4_title', 'Closing & Deal Support'),
  ('service_4_desc', 'Objection handling, payment guidance, documentation clarity, and deal structure support.'),
  ('commercial_model_tagline', 'We earn more only when you sell more.'),
  ('contact_phone', '+92 333 3401101'),
  ('contact_email', 'contact@propkads.com'),
  ('contact_location', 'Karachi, Pakistan')
on conflict (key) do nothing;

-- ============================================================
-- IMPORTANT: Create your first admin user manually.
-- 1. Run locally:  node scripts/hash-password.js "yourpassword"
-- 2. Copy the output hash, then run below with your details:
--
-- insert into users (name, email, password_hash, role)
-- values ('Khurram', 'you@propkads.com', 'PASTE_HASH_HERE', 'admin');
-- ============================================================
