"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/shared/ProductCard";
import { DEMO_PRODUCTS } from "@/data/products";
import { CATEGORY_LABELS, GENDER_LABELS } from "@/lib/utils";
import type { ProductCategory, Gender, ProductFilters } from "@/types";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "nouveautes", label: "Nouveautés" },
  { value: "meilleures-ventes", label: "Meilleures ventes" },
  { value: "prix-croissant", label: "Prix croissant" },
  { value: "prix-decroissant", label: "Prix décroissant" },
] as const;

const COLORS = [
  { name: "Cognac", hex: "#A8703E" },
  { name: "Noir", hex: "#1C1A16" },
  { name: "Sable", hex: "#C8B595" },
  { name: "Brun", hex: "#5A4530" },
  { name: "Bordeaux", hex: "#6B2A2A" },
  { name: "Terracotta", hex: "#B85C3E" },
];

export default function BoutiquePage() {
  const searchParams = useSearchParams();
  const initCategory = searchParams.get("categorie") as ProductCategory | null;
  const initGender = searchParams.get("genre") as Gender | null;

  const [filters, setFilters] = useState<ProductFilters>({
    category: initCategory ? [initCategory] : [],
    gender: initGender ? [initGender] : [],
    colors: [],
    priceMin: 0,
    priceMax: 10000,
    sortBy: "nouveautes",
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...DEMO_PRODUCTS];

    if (filters.category && filters.category.length > 0) {
      result = result.filter((p) => filters.category!.includes(p.category));
    }
    if (filters.gender && filters.gender.length > 0) {
      result = result.filter((p) => filters.gender!.includes(p.gender));
    }
    if (filters.colors && filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors!.includes(c.name))
      );
    }
    if (filters.priceMin) {
      result = result.filter((p) => p.price >= filters.priceMin!);
    }
    if (filters.priceMax && filters.priceMax < 10000) {
      result = result.filter((p) => p.price <= filters.priceMax!);
    }

    switch (filters.sortBy) {
      case "meilleures-ventes":
        result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
        break;
      case "prix-croissant":
        result.sort((a, b) => a.price - b.price);
        break;
      case "prix-decroissant":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [filters]);

  function toggleCategory(cat: ProductCategory) {
    setFilters((f) => ({
      ...f,
      category: f.category?.includes(cat)
        ? f.category.filter((c) => c !== cat)
        : [...(f.category ?? []), cat],
    }));
  }

  function toggleGender(g: Gender) {
    setFilters((f) => ({
      ...f,
      gender: f.gender?.includes(g)
        ? f.gender.filter((x) => x !== g)
        : [...(f.gender ?? []), g],
    }));
  }

  function toggleColor(color: string) {
    setFilters((f) => ({
      ...f,
      colors: f.colors?.includes(color)
        ? f.colors.filter((c) => c !== color)
        : [...(f.colors ?? []), color],
    }));
  }

  function clearFilters() {
    setFilters({ category: [], gender: [], colors: [], priceMin: 0, priceMax: 10000, sortBy: "nouveautes" });
  }

  const activeFilterCount =
    (filters.category?.length ?? 0) +
    (filters.gender?.length ?? 0) +
    (filters.colors?.length ?? 0);

  return (
    <div className="container-premium py-10 lg:py-16">
      {/* En-tête */}
      <div className="mb-10">
        <p className="overline mb-2">Toute la collection</p>
        <h1 className="font-serif text-display-sm lg:text-display-md text-ink">Boutique</h1>
      </div>

      {/* Barre de contrôle */}
      <div className="flex items-center justify-between border-b border-cream-300 pb-4 mb-8">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-light hover:text-ink transition-colors"
        >
          <SlidersHorizontal size={15} strokeWidth={1.5} />
          Filtres
          {activeFilterCount > 0 && (
            <span className="bg-ink text-cream-100 rounded-full w-4 h-4 text-[9px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-muted hidden sm:block">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sortBy: e.target.value as ProductFilters["sortBy"] }))
            }
            className="text-xs uppercase tracking-wider text-ink bg-transparent border border-cream-300 px-3 py-2 outline-none focus:border-ink transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Sidebar filtres desktop */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.aside
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 220 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 overflow-hidden hidden lg:block"
            >
              <div className="w-[220px] space-y-8 pr-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs uppercase tracking-widest text-ink font-medium">Filtres</h2>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-[11px] text-ink-muted hover:text-ink flex items-center gap-1"
                    >
                      <X size={10} /> Effacer
                    </button>
                  )}
                </div>

                {/* Catégorie */}
                <FilterGroup title="Catégorie">
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <FilterCheckbox
                      key={value}
                      label={label}
                      checked={filters.category?.includes(value as ProductCategory) ?? false}
                      onChange={() => toggleCategory(value as ProductCategory)}
                    />
                  ))}
                </FilterGroup>

                {/* Genre */}
                <FilterGroup title="Genre">
                  {Object.entries(GENDER_LABELS).map(([value, label]) => (
                    <FilterCheckbox
                      key={value}
                      label={label}
                      checked={filters.gender?.includes(value as Gender) ?? false}
                      onChange={() => toggleGender(value as Gender)}
                    />
                  ))}
                </FilterGroup>

                {/* Couleurs */}
                <FilterGroup title="Couleur">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => toggleColor(c.name)}
                        title={c.name}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 transition-all",
                          filters.colors?.includes(c.name)
                            ? "border-ink scale-110"
                            : "border-cream-300 hover:border-ink/40"
                        )}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </FilterGroup>

                {/* Prix */}
                <FilterGroup title="Budget maximum">
                  <div className="space-y-2">
                    {[1000, 2000, 3500, 5000].map((price) => (
                      <FilterCheckbox
                        key={price}
                        label={`Jusqu'à ${price} MAD`}
                        checked={filters.priceMax === price}
                        onChange={() =>
                          setFilters((f) => ({
                            ...f,
                            priceMax: f.priceMax === price ? 10000 : price,
                          }))
                        }
                      />
                    ))}
                  </div>
                </FilterGroup>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Grille produits */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-ink mb-3">Aucun produit trouvé</p>
              <p className="text-sm text-ink-muted mb-6">
                Essayez de modifier vos filtres.
              </p>
              <button onClick={clearFilters} className="btn-outline">
                Effacer les filtres
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sous-composants filtres
function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink mb-3 font-medium">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <span
        className={cn(
          "w-3.5 h-3.5 border flex items-center justify-center transition-colors shrink-0",
          checked ? "bg-ink border-ink" : "border-cream-300 group-hover:border-ink/50"
        )}
      >
        {checked && (
          <svg viewBox="0 0 8 6" className="w-2 h-2 fill-none stroke-cream-100 stroke-2">
            <polyline points="1,3 3,5 7,1" />
          </svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-xs text-ink-muted group-hover:text-ink transition-colors">
        {label}
      </span>
    </label>
  );
}
