-- Cover leaderboard table. Paste into Supabase > SQL Editor > New query, then Run.
create table if not exists public.slips (
  id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  handle text,
  data jsonb not null,
  updated timestamptz not null default now()
);
alter table public.slips enable row level security;
create policy "Anyone can read the leaderboard" on public.slips for select using (true);
create policy "Players create their own row" on public.slips for insert with check (auth.uid() = id);
create policy "Players update their own row" on public.slips for update using (auth.uid() = id) with check (auth.uid() = id);
create index if not exists slips_updated_idx on public.slips (updated desc);
