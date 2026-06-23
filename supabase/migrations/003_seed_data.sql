-- ============================================================
-- ATLAS LEATHER — Données de démonstration
-- Migration 003 : seed
-- ============================================================

insert into public.products (
  slug, name, category, gender, price, compare_at_price, short_description, description,
  features, dimensions, material, colors, images, stock,
  is_new_arrival, is_best_seller, is_limited_edition, rating, review_count
) values
(
  'sac-casbah',
  'Sac Casbah',
  'sacs-femme',
  'femme',
  2400.00,
  null,
  'Sac porté épaule en cuir pleine fleur, façonné à la main à Casablanca.',
  'Le Sac Casbah incarne l''élégance intemporelle de la maroquinerie marocaine. Taillé dans un cuir pleine fleur sélectionné avec exigence, chaque pièce est façonnée à la main par nos artisans selon des techniques transmises de génération en génération. Sa silhouette structurée et son fermoir doré signature en font un compagnon de tous les jours, aussi à l''aise en ville que lors de vos voyages.',
  array['Cuir pleine fleur tanné végétal', 'Fermoir doré signature', 'Intérieur doublé en toile de coton', 'Une poche zippée et deux poches plaquées', 'Bandoulière ajustable amovible'],
  '30 x 22 x 12 cm',
  'Cuir pleine fleur',
  '[{"name":"Cognac","hex":"#A8703E"},{"name":"Noir","hex":"#1C1A16"},{"name":"Sable","hex":"#C8B595"}]'::jsonb,
  '[{"url":"/images/products/sac-casbah-1.jpg","alt":"Sac Casbah en cuir cognac, vue de face","position":1},{"url":"/images/products/sac-casbah-2.jpg","alt":"Sac Casbah, vue de détail du fermoir doré","position":2},{"url":"/images/products/sac-casbah-3.jpg","alt":"Sac Casbah porté en situation","position":3}]'::jsonb,
  18, true, true, false, 4.8, 32
),
(
  'portefeuille-fes',
  'Portefeuille Fès',
  'portefeuilles',
  'mixte',
  890.00,
  null,
  'Portefeuille compact en cuir grainé, finitions cousues main.',
  'Inspiré de l''artisanat séculaire de la médina de Fès, ce portefeuille allie compacité et fonctionnalité. Six emplacements pour cartes, deux compartiments billets et une poche pour la monnaie, le tout dans un cuir grainé qui se patine avec le temps.',
  array['Cuir de vachette grainé', 'Six emplacements cartes', 'Deux compartiments billets', 'Poche monnaie zippée', 'Point de selle cousu main'],
  '11 x 9 x 2 cm',
  'Cuir de vachette',
  '[{"name":"Brun","hex":"#5A4530"},{"name":"Noir","hex":"#1C1A16"}]'::jsonb,
  '[{"url":"/images/products/portefeuille-fes-1.jpg","alt":"Portefeuille Fès en cuir brun","position":1},{"url":"/images/products/portefeuille-fes-2.jpg","alt":"Portefeuille Fès ouvert montrant les emplacements cartes","position":2}]'::jsonb,
  42, false, true, false, 4.9, 58
),
(
  'ceinture-medina',
  'Ceinture Medina',
  'ceintures',
  'homme',
  650.00,
  750.00,
  'Ceinture réversible en cuir lisse, boucle laiton brossé.',
  'Une ceinture deux-en-un : réversible noir et brun, elle s''adapte à toutes vos tenues. La boucle en laiton brossé pivote d''un geste simple, sans jamais retirer la ceinture.',
  array['Cuir lisse réversible noir/brun', 'Boucle laiton brossé pivotante', 'Largeur 3,5 cm', 'Disponible en plusieurs tailles'],
  'Largeur 3,5 cm',
  'Cuir de vachette',
  '[{"name":"Noir/Brun","hex":"#3B2A1E"}]'::jsonb,
  '[{"url":"/images/products/ceinture-medina-1.jpg","alt":"Ceinture Medina réversible","position":1}]'::jsonb,
  35, false, false, false, 4.7, 21
),
(
  'sac-atlas-weekender',
  'Sac Atlas Weekender',
  'sacs-homme',
  'homme',
  3200.00,
  null,
  'Sac de voyage souple en cuir épais, anses renforcées.',
  'Conçu pour les voyages courts, le Weekender Atlas combine robustesse et raffinement. Sa structure souple s''adapte à vos besoins tandis que les anses renforcées à triple couture garantissent une tenue irréprochable au fil des années.',
  array['Cuir de vachette pleine fleur', 'Anses à triple couture', 'Compartiment chaussures séparé', 'Bandoulière amovible incluse', 'Pieds métalliques protecteurs'],
  '50 x 30 x 25 cm',
  'Cuir pleine fleur épais',
  '[{"name":"Cognac","hex":"#A8703E"},{"name":"Noir","hex":"#1C1A16"}]'::jsonb,
  '[{"url":"/images/products/weekender-1.jpg","alt":"Sac Atlas Weekender en cuir cognac","position":1},{"url":"/images/products/weekender-2.jpg","alt":"Sac Weekender, vue de détail","position":2}]'::jsonb,
  12, true, false, false, 5.0, 14
),
(
  'porte-cartes-essaouira',
  'Porte-cartes Essaouira',
  'porte-cartes',
  'mixte',
  420.00,
  null,
  'Porte-cartes ultra-fin, cuir tressé artisanal.',
  'Minimaliste et raffiné, ce porte-cartes accueille jusqu''à 6 cartes dans un profil ultra-fin. Le détail tressé sur la tranche rend hommage aux techniques de tressage traditionnelles d''Essaouira.',
  array['Cuir pleine fleur', 'Tressage artisanal sur la tranche', 'Capacité 6 cartes', 'Profil ultra-fin 5mm'],
  '9.5 x 7 cm',
  'Cuir pleine fleur',
  '[{"name":"Cognac","hex":"#A8703E"},{"name":"Noir","hex":"#1C1A16"},{"name":"Bordeaux","hex":"#6B2A2A"}]'::jsonb,
  '[{"url":"/images/products/porte-cartes-1.jpg","alt":"Porte-cartes Essaouira tressé","position":1}]'::jsonb,
  60, true, false, false, 4.6, 9
),
(
  'sac-marrakech-mini',
  'Sac Marrakech Mini',
  'sacs-femme',
  'femme',
  1950.00,
  null,
  'Mini sac structuré, idéal pour les sorties en soirée.',
  'Le format mini du Sac Marrakech conserve toute l''élégance de notre best-seller dans un format compact. Sa chaînette dorée amovible permet de le porter en bandoulière ou à la main.',
  array['Cuir pleine fleur', 'Chaînette dorée amovible', 'Fermoir tournant signature', 'Intérieur doublé suédine'],
  '20 x 14 x 8 cm',
  'Cuir pleine fleur',
  '[{"name":"Blanc cassé","hex":"#EDE6D8"},{"name":"Noir","hex":"#1C1A16"},{"name":"Cognac","hex":"#A8703E"}]'::jsonb,
  '[{"url":"/images/products/marrakech-mini-1.jpg","alt":"Sac Marrakech Mini en blanc cassé","position":1}]'::jsonb,
  25, false, true, false, 4.9, 47
),
(
  'edition-limitee-zellige',
  'Édition Limitée Zellige',
  'editions-limitees',
  'femme',
  4500.00,
  null,
  'Pièce numérotée, motif zellige gaufré à la main. 50 exemplaires.',
  'Une collaboration exclusive avec un maître artisan de Fès : chaque sac de la collection Zellige porte un motif géométrique gaufré à la main, inspiré des mosaïques traditionnelles marocaines. Produite à seulement 50 exemplaires numérotés, cette pièce est accompagnée d''un certificat d''authenticité.',
  array['Cuir pleine fleur gaufré à la main', 'Motif zellige exclusif', 'Numéroté de 1 à 50', 'Certificat d''authenticité inclus', 'Écrin de présentation en bois de cèdre'],
  '28 x 20 x 11 cm',
  'Cuir pleine fleur gaufré',
  '[{"name":"Terracotta","hex":"#B85C3E"}]'::jsonb,
  '[{"url":"/images/products/zellige-1.jpg","alt":"Édition Limitée Zellige, motif gaufré","position":1},{"url":"/images/products/zellige-2.jpg","alt":"Détail du gaufrage zellige","position":2}]'::jsonb,
  8, true, false, true, 5.0, 6
);

insert into public.testimonials (author_name, author_location, rating, content, product_name) values
('Yasmine B.', 'Casablanca', 5, 'La qualité du cuir est exceptionnelle. On sent immédiatement le travail artisanal et l''attention portée aux finitions. Mon Sac Casbah ne me quitte plus.', 'Sac Casbah'),
('Karim T.', 'Rabat', 5, 'Le portefeuille Fès a une finition impeccable. Après six mois d''usage quotidien, le cuir se patine magnifiquement.', 'Portefeuille Fès'),
('Sophie L.', 'Paris', 5, 'Commande depuis la France, livraison rapide et soignée. Le sac est encore plus beau en vrai que sur les photos.', 'Sac Marrakech Mini'),
('Anas E.', 'Marrakech', 4, 'Très satisfait de la ceinture Medina, le système réversible est ingénieux et la boucle est élégante.', 'Ceinture Medina');

insert into public.blog_posts (slug, title, excerpt, content, category, cover_image, author, reading_time) values
(
  'entretenir-cuir-pleine-fleur',
  'Comment entretenir un cuir pleine fleur au quotidien',
  'Les gestes simples pour préserver l''éclat et la souplesse de vos pièces en cuir pleine fleur pendant des années.',
  'Le cuir pleine fleur est une matière noble qui, correctement entretenue, traverse les décennies en se bonifiant. Voici nos recommandations...',
  'entretien-cuir',
  '/images/blog/entretien-cuir.jpg',
  'Atlas Leather',
  4
),
(
  'tendances-maroquinerie-2026',
  'Les tendances maroquinerie à suivre en 2026',
  'Formats compacts, couleurs terreuses et finitions mates : un tour d''horizon des tendances qui marqueront l''année.',
  'Cette année confirme le retour des formats compacts et des teintes naturelles inspirées des paysages marocains...',
  'tendances',
  '/images/blog/tendances-2026.jpg',
  'Atlas Leather',
  6
),
(
  'histoire-artisanat-maroquinerie-marocaine',
  'Plongée dans l''histoire de l''artisanat de la maroquinerie marocaine',
  'Des tanneries de Fès aux ateliers de Marrakech, retour sur des siècles de savoir-faire transmis de génération en génération.',
  'L''histoire de la maroquinerie marocaine remonte à plusieurs siècles, portée par les tanneries historiques de Fès...',
  'artisanat-marocain',
  '/images/blog/artisanat-marocain.jpg',
  'Atlas Leather',
  8
);
