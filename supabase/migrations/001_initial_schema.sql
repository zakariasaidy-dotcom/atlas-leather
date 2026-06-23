-- ============================================================
-- ATLAS LEATHER — Schéma de base de données Supabase
-- Migration 001 : structure initiale
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- recherche texte produits

-- ============================================================
-- ENUMS
-- ============================================================

create type product_category as enum (
  'sacs-femme',
  'sacs-homme',
  'portefeuilles',
  'porte-cartes',
  'ceintures',
  'petite-maroquinerie',
  'editions-limitees'
);

create type product_gender as enum ('femme', 'homme', 'mixte');

create type order_status as enum (
  'en_attente',
  'confirmee',
  'en_preparation',
  'expediee',
  'livree',
  'annulee'
);

create type payment_method as enum ('stripe', 'paypal', 'cod');

create type blog_category as enum (
  'entretien-cuir',
  'tendances',
  'artisanat-marocain'
);

-- ============================================================
-- TABLE: profiles (étend auth.users de Supabase)
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  default_address jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Informations complémentaires des clients, liées à auth.users';

-- ============================================================
-- TABLE: products
-- ============================================================

create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  category product_category not null,
  gender product_gender not null default 'mixte',
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2),
  currency text not null default 'MAD',
  short_description text not null,
  description text not null,
  features text[] not null default '{}',
  dimensions text,
  material text not null,
  colors jsonb not null default '[]', -- [{name, hex, imageIndex}]
  images jsonb not null default '[]', -- [{url, alt, position}]
  stock integer not null default 0 check (stock >= 0),
  is_new_arrival boolean not null default false,
  is_best_seller boolean not null default false,
  is_limited_edition boolean not null default false,
  limited_edition_count integer,
  rating numeric(2, 1) default 0,
  review_count integer default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_products_category on public.products(category);
create index idx_products_gender on public.products(gender);
create index idx_products_published on public.products(is_published);
create index idx_products_created_at on public.products(created_at desc);
create index idx_products_search on public.products using gin (name gin_trgm_ops);

comment on table public.products is 'Catalogue produits Atlas Leather';

-- ============================================================
-- TABLE: orders
-- ============================================================

create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  items jsonb not null, -- snapshot des CartItem au moment de la commande
  subtotal numeric(10, 2) not null,
  shipping_cost numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  currency text not null default 'MAD',
  shipping_address jsonb not null,
  billing_address jsonb,
  payment_method payment_method not null,
  payment_reference text, -- id de transaction Stripe/PayPal
  status order_status not null default 'en_attente',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_email on public.orders(email);
create index idx_orders_status on public.orders(status);
create index idx_orders_created_at on public.orders(created_at desc);

comment on table public.orders is 'Commandes clients, tous moyens de paiement confondus';

-- ============================================================
-- TABLE: wishlists
-- ============================================================

create table public.wishlists (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  added_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index idx_wishlists_user_id on public.wishlists(user_id);

-- ============================================================
-- TABLE: testimonials
-- ============================================================

create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  author_location text,
  rating integer not null check (rating between 1 and 5),
  content text not null,
  product_name text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABLE: blog_posts
-- ============================================================

create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category blog_category not null,
  cover_image text not null,
  author text not null default 'Atlas Leather',
  reading_time integer not null default 5,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index idx_blog_posts_category on public.blog_posts(category);
create index idx_blog_posts_published_at on public.blog_posts(published_at desc);

-- ============================================================
-- TABLE: newsletter_subscribers
-- ============================================================

create table public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  is_active boolean not null default true
);

-- ============================================================
-- TABLE: contact_messages
-- ============================================================

create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TRIGGER: updated_at automatique
-- ============================================================

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger trg_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

create trigger trg_orders_updated_at before update on public.orders
  for each row execute function public.set_updated_at();

-- ============================================================
-- TRIGGER: création automatique du profil à l'inscription
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- FUNCTION: génération de numéro de commande lisible
-- ============================================================

create or replace function public.generate_order_number()
returns text as $$
declare
  new_number text;
begin
  new_number := 'AL-' || to_char(now(), 'YYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0');
  return new_number;
end;
$$ language plpgsql;
