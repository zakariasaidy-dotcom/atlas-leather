// Types métier Atlas Leather — alignés sur le schéma Supabase (voir database.types.ts pour les types générés)

export type ProductCategory =
  | "sacs-femme"
  | "sacs-homme"
  | "portefeuilles"
  | "porte-cartes"
  | "ceintures"
  | "petite-maroquinerie"
  | "editions-limitees";

export type Gender = "femme" | "homme" | "mixte";

export type ProductColor = {
  name: string;
  hex: string;
  imageIndex?: number; // index de l'image galerie associée à cette couleur
};

export type ProductImage = {
  url: string;
  alt: string;
  position: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  gender: Gender;
  price: number; // en MAD
  compareAtPrice?: number | null;
  currency: "MAD";
  shortDescription: string;
  description: string;
  features: string[]; // caractéristiques (dimensions, matière, etc.)
  dimensions?: string;
  material: string;
  colors: ProductColor[];
  images: ProductImage[];
  stock: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isLimitedEdition: boolean;
  limitedEditionCount?: number | null;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
};

export type ProductFilters = {
  category?: ProductCategory[];
  gender?: Gender[];
  colors?: string[];
  priceMin?: number;
  priceMax?: number;
  sortBy?: "nouveautes" | "meilleures-ventes" | "prix-croissant" | "prix-decroissant";
};

export type CartItem = {
  id: string; // identifiant unique de la ligne (productId + couleur)
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  quantity: number;
  stock: number;
};

export type Address = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentMethod = "stripe" | "paypal" | "cod";

export type OrderStatus =
  | "en_attente"
  | "confirmee"
  | "en_preparation"
  | "expediee"
  | "livree"
  | "annulee";

export type Order = {
  id: string;
  orderNumber: string;
  userId?: string | null;
  email: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  currency: "MAD";
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  content: string;
  productName?: string;
};

export type BlogCategory = "entretien-cuir" | "tendances" | "artisanat-marocain";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverImage: string;
  author: string;
  readingTime: number;
  publishedAt: string;
};

export type WishlistItem = {
  productId: string;
  addedAt: string;
};
