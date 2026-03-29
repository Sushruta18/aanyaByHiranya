-- Run this in your Supabase SQL Editor

create table artworks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  medium text,
  price numeric,
  availability text default 'Available',
  description text,
  image_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  cover_image_url text,
  content text,
  published boolean default false,
  created_at timestamptz default now()
);

create table orders (
  id uuid default gen_random_uuid() primary key,
  buyer_name text,
  buyer_email text,
  artwork_id uuid references artworks(id),
  artwork_title text,
  amount numeric,
  status text default 'Pending',
  created_at timestamptz default now()
);

-- Allow public read on artworks and published blog posts
alter table artworks enable row level security;
alter table blog_posts enable row level security;
alter table orders enable row level security;

create policy "Public read artworks" on artworks for select using (true);
create policy "Public read published posts" on blog_posts for select using (published = true);
create policy "Service role full access artworks" on artworks using (true) with check (true);
create policy "Service role full access blog" on blog_posts using (true) with check (true);
create policy "Service role full access orders" on orders using (true) with check (true);
