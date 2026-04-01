create extension if not exists pgcrypto;

create table if not exists public.turmas (
  id text primary key,
  codigo text unique not null,
  nome text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.users (
  id text primary key,
  username text not null,
  pontos integer not null default 0 check (pontos >= 0),
  turma text not null references public.turmas(codigo) on update cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_points_desc on public.users (pontos desc);
create index if not exists idx_users_turma_points on public.users (turma, pontos desc);

create or replace function public.set_users_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_users_updated_at on public.users;
create trigger trg_set_users_updated_at
before update on public.users
for each row execute function public.set_users_updated_at();

alter table public.turmas enable row level security;
alter table public.users enable row level security;

drop policy if exists turmas_read_all on public.turmas;
create policy turmas_read_all on public.turmas
for select
using (true);

drop policy if exists users_read_all on public.users;
create policy users_read_all on public.users
for select
using (true);

