import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes avec clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatte un prix en MAD */
export function formatPrice(
  amount: number,
  options: { showCurrency?: boolean; locale?: string } = {}
) {
  const { showCurrency = true, locale = "fr-MA" } = options;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return showCurrency ? `${formatted} MAD` : formatted;
}

/** Slugify un nom de produit */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** Calcul des frais de livraison */
export function calculateShipping(
  subtotal: number,
  country: string = "MA"
): number {
  if (country === "MA") {
    return subtotal >= 2000 ? 0 : 49;
  }
  // International
  if (subtotal >= 5000) return 0;
  const rates: Record<string, number> = {
    FR: 150,
    BE: 150,
    ES: 150,
    IT: 150,
    DE: 150,
    US: 250,
    CA: 250,
  };
  return rates[country] ?? 200;
}

/** Label lisible pour une catégorie */
export const CATEGORY_LABELS: Record<string, string> = {
  "sacs-femme": "Sacs femme",
  "sacs-homme": "Sacs homme",
  portefeuilles: "Portefeuilles",
  "porte-cartes": "Porte-cartes",
  ceintures: "Ceintures",
  "petite-maroquinerie": "Petite maroquinerie",
  "editions-limitees": "Éditions limitées",
};

export const GENDER_LABELS: Record<string, string> = {
  femme: "Femme",
  homme: "Homme",
  mixte: "Mixte",
};

/** Conversion MAD → EUR (indicatif) */
export function madToEur(amount: number): number {
  return Math.round(amount / 10.8);
}

/** Tronque un texte à n caractères */
export function truncate(text: string, n: number): string {
  if (text.length <= n) return text;
  return text.slice(0, n).trim() + "…";
}

/** Génère un numéro de commande côté client (sera remplacé par la DB) */
export function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `AL-${date}-${rand}`;
}
