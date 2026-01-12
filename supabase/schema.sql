-- Supporters table
create table if not exists public.supporters (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  zip text,
  locality text,
  tags text[],
  source text,
  subscribed boolean default true,
  created_at timestamptz default timezone('utc', now())
);

alter table public.supporters enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'supporters' and policyname = 'Allow anonymous insert'
  ) then
    create policy "Allow anonymous insert" on public.supporters for insert with check (true);
  end if;
end$$;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'supporters' and policyname = 'Allow anonymous select'
  ) then
    create policy "Allow anonymous select" on public.supporters for select using (true);
  end if;
end$$;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'supporters' and policyname = 'Allow anonymous update'
  ) then
    create policy "Allow anonymous update" on public.supporters for update using (true) with check (true);
  end if;
end$$;

-- Petition signatures table
create table if not exists public.petition_signatures (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  zip text,
  locality text,
  is_host boolean default false,
  consent_given boolean not null,
  consent_timestamp timestamptz not null,
  source text,
  created_at timestamptz default timezone('utc', now())
);

alter table public.petition_signatures enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'petition_signatures' and policyname = 'Allow anonymous insert'
  ) then
    create policy "Allow anonymous insert" on public.petition_signatures for insert with check (true);
  end if;
end$$;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'petition_signatures' and policyname = 'Allow anonymous select'
  ) then
    create policy "Allow anonymous select" on public.petition_signatures for select using (true);
  end if;
end$$;
