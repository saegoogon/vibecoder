create extension if not exists pgcrypto;

create table if not exists public.planmon_profiles (
  id uuid primary key default gen_random_uuid(),
  device_id text not null unique,
  student_name text not null,
  goal text not null,
  subjects jsonb not null default '[]'::jsonb,
  tasks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.planmon_orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  customer_key text,
  customer_name text not null,
  customer_email text not null,
  plan_code text not null,
  amount integer not null,
  payment_status text not null default 'READY',
  payment_key text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists planmon_profiles_set_updated_at on public.planmon_profiles;
create trigger planmon_profiles_set_updated_at
before update on public.planmon_profiles
for each row execute function public.set_updated_at();
