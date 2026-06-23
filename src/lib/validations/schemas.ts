import { z } from "zod";

// ============================================================
// Addresses & Shipping
// ============================================================

export const addressSchema = z.object({
  fullName: z.string().min(2, "Nom complet requis (minimum 2 caractères)"),
  phone: z.string().min(8, "Numéro de téléphone invalide (minimum 8 chiffres)"),
  email: z.string().email("Adresse e-mail invalide"),
  addressLine1: z.string().min(5, "Adresse requise (minimum 5 caractères)"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().min(3, "Code postal requis"),
  country: z.string().min(2, "Pays requis"),
});

export type Address = z.infer<typeof addressSchema>;

// ============================================================
// Contact Form
// ============================================================

export const contactSchema = z.object({
  fullName: z.string().min(2, "Nom complet requis"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message trop court (minimum 10 caractères)").max(2000, "Message trop long (maximum 2000 caractères)"),
});

export type Contact = z.infer<typeof contactSchema>;

// ============================================================
// Newsletter
// ============================================================

export const newsletterSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  firstName: z.string().optional(),
});

export type NewsletterSignup = z.infer<typeof newsletterSchema>;

// ============================================================
// Authentication
// ============================================================

export const signupSchema = z
  .object({
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(8, "Mot de passe (minimum 8 caractères)"),
    passwordConfirm: z.string(),
    firstName: z.string().min(2, "Prénom requis"),
    lastName: z.string().min(2, "Nom de famille requis"),
    agreeToTerms: z.boolean().refine((val) => val, "Vous devez accepter les conditions"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
  });

export type Signup = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(1, "Mot de passe requis"),
  rememberMe: z.boolean().optional(),
});

export type Signin = z.infer<typeof signinSchema>;

// ============================================================
// Product Search & Filters
// ============================================================

export const productFilterSchema = z.object({
  category: z.array(z.string()).optional(),
  gender: z.array(z.enum(["femme", "homme", "mixte"])).optional(),
  colors: z.array(z.string()).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  sortBy: z.enum(["nouveautes", "meilleures-ventes", "prix-croissant", "prix-decroissant"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export type ProductFilter = z.infer<typeof productFilterSchema>;

// ============================================================
// Cart & Checkout
// ============================================================

export const cartItemSchema = z.object({
  productId: z.string().uuid("ID produit invalide"),
  slug: z.string(),
  name: z.string(),
  price: z.number().min(0),
  image: z.string().url(),
  color: z.string(),
  colorHex: z.string(),
  quantity: z.number().min(1).max(10),
  stock: z.number().min(0),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Panier vide"),
  address: addressSchema,
  shippingCost: z.number().min(0),
  paymentMethod: z.enum(["stripe", "paypal", "cod"]),
});

export type Checkout = z.infer<typeof checkoutSchema>;

// ============================================================
// Blog
// ============================================================

export const blogFilterSchema = z.object({
  category: z.enum(["entretien-cuir", "tendances", "artisanat-marocain"]).optional(),
  search: z.string().optional(),
  page: z.number().min(1).optional(),
});

export type BlogFilter = z.infer<typeof blogFilterSchema>;

// ============================================================
// Profile (Account)
// ============================================================

export const profileUpdateSchema = z.object({
  fullName: z.string().min(2, "Nom complet requis").optional(),
  phone: z.string().optional(),
  email: z.string().email("Adresse e-mail invalide").optional(),
});

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z.string().min(8, "Nouveau mot de passe (minimum 8 caractères)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type PasswordChange = z.infer<typeof passwordChangeSchema>;
