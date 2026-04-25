create extension if not exists pgcrypto;

create table if not exists public.cursor_profiles (
  id uuid primary key default gen_random_uuid(),
  device_id text not null unique,
  display_name text not null,
  bio text not null,
  selected_skin text not null,
  owned_skins jsonb not null default '[]'::jsonb,
  favorite_skins jsonb not null default '[]'::jsonb,
  clicks integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cursor_orders (
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

drop trigger if exists cursor_profiles_set_updated_at on public.cursor_profiles;
create trigger cursor_profiles_set_updated_at
before update on public.cursor_profiles
for each row execute function public.set_updated_at();
