-- Drop the trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Drop the function if it exists
drop function if exists handle_new_user();

-- Drop the table if it exists
drop table if exists public.profiles;

-- Drop the avatars bucket if it exists
delete from storage.buckets where id = 'avatars';

-- Drop existing policies for storage objects
drop policy if exists "Avatar images are publicly accessible." on storage.objects;
drop policy if exists "Anyone can upload an avatar." on storage.objects;
drop policy if exists "Anyone can update their own avatar." on storage.objects;

-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone not null default now(),
  username text unique,
  firstname text,
  lastname text,
  bio text,
  avatar_url text,
  email text not null unique,
  joined_date timestamp with time zone not null default now(),
  constraint username_length check (char_length(username) >= 3)
);

-- Create a function to update the 'updated_at' column
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to update 'updated_at' before any update
create trigger update_profiles_updated_at
before update on public.profiles
for each row execute procedure update_updated_at_column();

-- Set up Row Level Security (RLS)
alter table public.profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on public.profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger
set search_path = 'public'
as $$
begin
  insert into public.profiles (id, email, username, joined_date)
  values (new.id, new.email, new.raw_user_meta_data->>'username', now());
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true);

-- Set up access controls for storage.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');
