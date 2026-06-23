// ============================================================
// Application Constants — Atlas Leather
// ============================================================

// ============================================================
// Routes
// ============================================================

export const PROTECTED_ROUTES = ["/compte"];

export const AUTH_ROUTES = ["/connexion", "/inscription"];

export const PUBLIC_ROUTES = ["/", "/boutique", "/histoire", "/contact", "/blog"];

export const SHOP_ROUTES = {
  SHOP: "/boutique",
  PRODUCT: "/produit",
  CART: "/panier",
  CHECKOUT: "/paiement",
  ORDER_CONFIRMED: "/commande-confirmee",
};

export const ACCOUNT_ROUTES = {
  ACCOUNT: "/compte",
  ORDERS: "/compte/commandes",
  WISHLIST: "/compte/wishlist",
};

export const AUTH_ROUTES_LIST = {
  LOGIN: "/connexion",
  SIGNUP: "/inscription",
  LOGOUT: "/api/auth/signout",
};

// ============================================================
// Payment Methods
// ============================================================

export const PAYMENT_METHODS = {
  STRIPE: "stripe",
  PAYPAL: "paypal",
  COD: "cod", // Cash on Delivery
} as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  stripe: "Carte Bancaire",
  paypal: "PayPal",
  cod: "Paiement à la Livraison",
};

// ============================================================
// Order Status
// ============================================================

export const ORDER_STATUS = {
  PENDING: "en_attente",
  CONFIRMED: "confirmee",
  PREPARING: "en_preparation",
  SHIPPED: "expediee",
  DELIVERED: "livree",
  CANCELLED: "annulee",
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  en_preparation: "En préparation",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  en_attente: "bg-yellow-100 text-yellow-800",
  confirmee: "bg-blue-100 text-blue-800",
  en_preparation: "bg-purple-100 text-purple-800",
  expediee: "bg-cyan-100 text-cyan-800",
  livree: "bg-green-100 text-green-800",
  annulee: "bg-red-100 text-red-800",
};

// ============================================================
// Categories
// ============================================================

export const PRODUCT_CATEGORIES = {
  BAGS_WOMEN: "sacs-femme",
  BAGS_MEN: "sacs-homme",
  WALLETS: "portefeuilles",
  CARDHOLDERS: "porte-cartes",
  BELTS: "ceintures",
  ACCESSORIES: "petite-maroquinerie",
  LIMITED: "editions-limitees",
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  "sacs-femme": "Sacs Femme",
  "sacs-homme": "Sacs Homme",
  portefeuilles: "Portefeuilles",
  "porte-cartes": "Porte-Cartes",
  ceintures: "Ceintures",
  "petite-maroquinerie": "Petite Maroquinerie",
  "editions-limitees": "Éditions Limitées",
};

// ============================================================
// Gender/Demographics
// ============================================================

export const GENDERS = {
  WOMEN: "femme",
  MEN: "homme",
  UNISEX: "mixte",
} as const;

export const GENDER_LABELS: Record<string, string> = {
  femme: "Femme",
  homme: "Homme",
  mixte: "Unisex",
};

// ============================================================
// Blog Categories
// ============================================================

export const BLOG_CATEGORIES = {
  LEATHER_CARE: "entretien-cuir",
  TRENDS: "tendances",
  MOROCCAN_CRAFTSMANSHIP: "artisanat-marocain",
} as const;

export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  "entretien-cuir": "Entretien du Cuir",
  tendances: "Tendances",
  "artisanat-marocain": "Artisanat Marocain",
};

// ============================================================
// Shipping
// ============================================================

export const SHIPPING_RATES = {
  MOROCCO_FREE_THRESHOLD: 2000, // Free shipping over 2000 MAD
  MOROCCO_COST: 49,
  INTERNATIONAL_FREE_THRESHOLD: 5000,
  DEFAULT_INTERNATIONAL: 200,
  RATES: {
    FR: 150,
    BE: 150,
    ES: 150,
    IT: 150,
    DE: 150,
    US: 250,
    CA: 250,
  },
} as const;

// ============================================================
// Countries
// ============================================================

export const COUNTRIES = [
  { value: "MA", label: "Maroc", flag: "🇲🇦" },
  { value: "FR", label: "France", flag: "🇫🇷" },
  { value: "BE", label: "Belgique", flag: "🇧🇪" },
  { value: "ES", label: "Espagne", flag: "🇪🇸" },
  { value: "IT", label: "Italie", flag: "🇮🇹" },
  { value: "DE", label: "Allemagne", flag: "🇩🇪" },
  { value: "US", label: "États-Unis", flag: "🇺🇸" },
  { value: "CA", label: "Canada", flag: "🇨🇦" },
];

// ============================================================
// Pagination
// ============================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  PRODUCTS_PER_PAGE: 12,
  BLOG_POSTS_PER_PAGE: 6,
  TESTIMONIALS_PER_PAGE: 3,
} as const;

// ============================================================
// UI/UX
// ============================================================

export const TOAST_DURATION = 3000; // ms

export const ANIMATION_DURATION = {
  SHORT: 0.2,
  MEDIUM: 0.3,
  LONG: 0.5,
} as const;

// ============================================================
// Validation
// ============================================================

export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MIN_PASSWORD_LENGTH: 8,
  MIN_PHONE_LENGTH: 8,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 2000,
  MAX_QUANTITY_PER_ITEM: 10,
} as const;

// ============================================================
// Social Media & Contact
// ============================================================

export const SOCIAL_LINKS = {
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/atlasleather.ma",
  FACEBOOK: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/atlasleather.ma",
  WHATSAPP: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000"}`,
};

export const CONTACT_EMAIL = process.env.NOTIFICATION_EMAIL || "contact@atlasleather.ma";

// ============================================================
// Stripe
// ============================================================

export const STRIPE_CONFIG = {
  CURRENCY: "mad",
  API_VERSION: "2024-12-18.acacia",
} as const;

// ============================================================
// PayPal
// ============================================================

export const PAYPAL_CONFIG = {
  CURRENCY: "USD",
  EXCHANGE_RATE: 10.8, // 1 MAD = ~0.092 USD (update regularly!)
} as const;

// ============================================================
// Error Messages
// ============================================================

export const ERROR_MESSAGES = {
  GENERIC: "Une erreur est survenue. Veuillez réessayer.",
  NETWORK: "Erreur réseau. Veuillez vérifier votre connexion.",
  UNAUTHORIZED: "Vous devez être connecté.",
  FORBIDDEN: "Vous n'avez pas les permissions nécessaires.",
  NOT_FOUND: "Ressource non trouvée.",
  VALIDATION: "Vérifiez vos données et réessayez.",
  PAYMENT_FAILED: "Le paiement a échoué. Veuillez réessayer.",
  PAYMENT_CANCELLED: "Le paiement a été annulé.",
  EMPTY_CART: "Votre panier est vide.",
} as const;

// ============================================================
// Success Messages
// ============================================================

export const SUCCESS_MESSAGES = {
  ITEM_ADDED_TO_CART: "Produit ajouté au panier",
  ITEM_REMOVED: "Produit retiré",
  ORDER_CONFIRMED: "Votre commande a été confirmée",
  EMAIL_SENT: "Email envoyé avec succès",
  SUBSCRIBED: "Inscription à la newsletter réussie",
  UNSUBSCRIBED: "Désinscription réussie",
} as const;
