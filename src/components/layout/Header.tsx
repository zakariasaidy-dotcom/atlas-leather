"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { CATEGORY_LABELS } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Femme",
    href: "/boutique?genre=femme",
    sub: [
      { label: "Sacs", href: "/boutique?categorie=sacs-femme" },
      { label: "Petite maroquinerie", href: "/boutique?categorie=petite-maroquinerie&genre=femme" },
      { label: "Tout voir", href: "/boutique?genre=femme" },
    ],
  },
  {
    label: "Homme",
    href: "/boutique?genre=homme",
    sub: [
      { label: "Sacs de voyage", href: "/boutique?categorie=sacs-homme" },
      { label: "Portefeuilles", href: "/boutique?categorie=portefeuilles&genre=homme" },
      { label: "Ceintures", href: "/boutique?categorie=ceintures" },
      { label: "Tout voir", href: "/boutique?genre=homme" },
    ],
  },
  {
    label: "Accessoires",
    href: "/boutique?categorie=petite-maroquinerie",
    sub: [
      { label: "Porte-cartes", href: "/boutique?categorie=porte-cartes" },
      { label: "Petite maroquinerie", href: "/boutique?categorie=petite-maroquinerie" },
    ],
  },
  {
    label: "Éditions limitées",
    href: "/boutique?categorie=editions-limitees",
    sub: [],
  },
  { label: "Notre histoire", href: "/histoire", sub: [] },
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.count());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const isHomePage = pathname === "/";

  return (
    <>
      {/* Bande annonce */}
      <div className="bg-ink text-cream-100/80 text-center py-2 px-4 text-[11px] tracking-widest uppercase">
        Livraison offerte au Maroc dès 2 000 MAD — Livraison internationale disponible
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          isScrolled || !isHomePage
            ? "bg-cream-100/95 backdrop-blur-md shadow-sm"
            : "bg-cream-100/95"
        )}
      >
        {/* Desktop nav */}
        <div className="container-premium flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-[1.15rem] lg:text-[1.3rem] tracking-[0.22em] uppercase text-ink hover:text-leather-100 transition-colors duration-300"
          >
            Atlas Leather
          </Link>

          {/* Nav centrale desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-200 pb-1",
                    pathname.startsWith(link.href.split("?")[0]) && link.href !== "/"
                      ? "text-leather-100 border-b border-leather-100"
                      : "text-ink-light hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {activeDropdown === link.label && link.sub.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-cream-100 border border-cream-300 shadow-xl min-w-[180px] py-4 px-2">
                        {link.sub.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2.5 text-[11px] uppercase tracking-wider text-ink-light hover:text-ink hover:bg-cream-200 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Recherche */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-ink-light hover:text-ink transition-colors"
              aria-label="Rechercher"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link
              href="/compte/wishlist"
              className="p-2.5 text-ink-light hover:text-ink transition-colors relative hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-gold text-ink text-[8px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Compte */}
            <Link
              href="/compte"
              className="p-2.5 text-ink-light hover:text-ink transition-colors"
              aria-label="Mon compte"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>

            {/* Panier */}
            <button
              onClick={openCart}
              className="p-2.5 text-ink-light hover:text-ink transition-colors relative"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {mounted && totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-ink text-cream-100 text-[8px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Burger mobile */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2.5 text-ink lg:hidden"
              aria-label="Menu"
            >
              {isMobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Barre de recherche */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-cream-300 overflow-hidden"
            >
              <div className="container-premium py-4">
                <div className="flex items-center gap-3 max-w-lg mx-auto">
                  <Search size={16} className="text-ink-muted shrink-0" />
                  <input
                    ref={searchRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un produit…"
                    className="flex-1 bg-transparent border-b border-ink/30 pb-1 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-ink transition-colors"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-ink-muted hover:text-ink transition-colors text-xs uppercase tracking-widest"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-cream-300 bg-cream-100 overflow-hidden"
            >
              <nav className="container-premium py-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className="block py-3 text-sm uppercase tracking-wider text-ink border-b border-cream-300/60"
                    >
                      {link.label}
                    </Link>
                    {link.sub.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-2 pl-4 text-xs uppercase tracking-wider text-ink-muted hover:text-ink"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="pt-4 flex gap-4">
                  <Link href="/connexion" className="btn-outline text-xs px-5 py-3">
                    Connexion
                  </Link>
                  <Link href="/compte/wishlist" className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-light">
                    <Heart size={14} /> Wishlist
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
