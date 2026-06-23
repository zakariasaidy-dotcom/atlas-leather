"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook, MessageCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const FOOTER_LINKS = {
  boutique: {
    title: "Boutique",
    links: [
      { label: "Sacs femme", href: "/boutique?categorie=sacs-femme" },
      { label: "Sacs homme", href: "/boutique?categorie=sacs-homme" },
      { label: "Portefeuilles", href: "/boutique?categorie=portefeuilles" },
      { label: "Porte-cartes", href: "/boutique?categorie=porte-cartes" },
      { label: "Ceintures", href: "/boutique?categorie=ceintures" },
      { label: "Éditions limitées", href: "/boutique?categorie=editions-limitees" },
    ],
  },
  maison: {
    title: "Notre maison",
    links: [
      { label: "Notre histoire", href: "/histoire" },
      { label: "Savoir-faire", href: "/histoire#savoir-faire" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  service: {
    title: "Service client",
    links: [
      { label: "Livraison et retours", href: "/contact#livraison" },
      { label: "Guide des tailles", href: "/contact#tailles" },
      { label: "Entretien du cuir", href: "/blog/entretenir-cuir-pleine-fleur" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "Mon compte", href: "/compte" },
    ],
  },
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success("Merci pour votre inscription !");
        setEmail("");
      } else {
        toast.error("Une erreur est survenue, veuillez réessayer.");
      }
    } catch {
      toast.error("Impossible de s'inscrire pour le moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-ink text-cream-100/80">
      {/* Bande newsletter */}
      <div className="border-b border-white/10">
        <div className="container-premium py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="overline text-gold-light mb-2">Newsletter</p>
            <h2 className="font-serif text-2xl text-cream-100">
              Recevez nos nouvelles collections
            </h2>
            <p className="text-sm text-cream-100/50 mt-1">
              Soyez les premiers informés des nouveautés et des éditions limitées.
            </p>
          </div>
          <form
            onSubmit={handleNewsletter}
            className="flex w-full lg:w-auto max-w-md gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
              className="flex-1 bg-white/5 border border-white/15 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-100/30 outline-none focus:border-gold/50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gold text-ink px-5 py-3 hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2 text-xs uppercase tracking-widest font-medium shrink-0"
            >
              {loading ? "…" : <><ArrowRight size={14} /></>}
            </button>
          </form>
        </div>
      </div>

      {/* Colonnes de liens */}
      <div className="container-premium py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Marque */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-serif text-xl text-cream-100 tracking-[0.2em] uppercase mb-4">
            Atlas Leather
          </p>
          <p className="text-sm text-cream-100/50 leading-relaxed mb-6 max-w-[200px]">
            Maroquinerie artisanale façonnée à la main à Casablanca, Maroc.
          </p>
          <div className="flex gap-4">
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/atlasleather.ma"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-100/40 hover:text-gold-light transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/atlasleather.ma"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-100/40 hover:text-gold-light transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-100/40 hover:text-gold-light transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Colonnes de liens */}
        {Object.values(FOOTER_LINKS).map((col) => (
          <div key={col.title}>
            <h3 className="text-cream-100 text-[11px] uppercase tracking-[0.2em] mb-5 font-medium">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-100/50 hover:text-cream-100/90 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10">
        <div className="container-premium py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-100/30">
          <p>© {new Date().getFullYear()} Atlas Leather. Tous droits réservés.</p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-cream-100/60 transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-cream-100/60 transition-colors">
              Confidentialité
            </Link>
            <Link href="/cgv" className="hover:text-cream-100/60 transition-colors">
              CGV
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span>Paiement sécurisé</span>
            <div className="flex gap-2 opacity-60">
              {["Visa", "MC", "PayPal"].map((m) => (
                <span key={m} className="bg-white/10 px-1.5 py-0.5 rounded-sm text-[10px]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
