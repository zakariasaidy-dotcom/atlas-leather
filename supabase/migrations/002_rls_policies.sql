-- ============================================================
-- ATLAS LEATHER — Row Level Security
-- Migration 002 : politiques de sécurité
-- ============================================================

-- Active RLS sur toutes les tables sensibles
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.wishlists enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;

-- ============================================================
-- PROFILES
-- ============================================================

create policy "Les utilisateurs peuvent lire leur propre profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Les utilisateurs peuvent modifier leur propre profil"
  on public.profiles for update
  using (auth.uid() = id);

-- ============================================================
-- PRODUCTS — lecture publique, écriture admin uniquement
-- ============================================================

create policy "Les produits publiés sont visibles par tous"
  on public.products for select
  using (is_published = true);

create policy "Le service role peut tout gérer sur les produits"
  on public.products for all
  using (auth.jwt() ->> 'role' = 'service_role');

-- ============================================================
-- ORDERS — chaque utilisateur ne voit que ses commandes
-- ============================================================

create policy "Les utilisateurs voient leurs propres commandes"
  on public.orders for select
  using (auth.uid() = user_id or auth.jwt() ->> 'role' = 'service_role');

create policy "Le service role peut créer des commandes"
  on public.orders for insert
  with check (true);

create policy "Le service role peut mettre à jour les commandes"
  on public.orders for update
  using (auth.jwt() ->> 'role' = 'service_role');

-- ============================================================
-- WISHLISTS — privé à chaque utilisateur
-- ============================================================

create policy "Les utilisateurs gèrent leur propre wishlist"
  on public.wishlists for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- TESTIMONIALS — lecture publique
-- ============================================================

create policy "Les témoignages publiés sont visibles par tous"
  on public.testimonials for select
  using (is_published = true);

-- ============================================================
-- BLOG POSTS — lecture publique
-- ============================================================

create policy "Les articles publiés sont visibles par tous"
  on public.blog_posts for select
  using (is_published = true);

-- ============================================================
-- NEWSLETTER — insertion publique (formulaire), pas de lecture
-- ============================================================

create policy "Tout le monde peut s'inscrire à la newsletter"
  on public.newsletter_subscribers for insert
  with check (true);

-- ============================================================
-- CONTACT MESSAGES — insertion publique uniquement
-- ============================================================

create policy "Tout le monde peut envoyer un message de contact"
  on public.contact_messages for insert
  with check (true);
