"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, PackageCheck, ChevronRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, calculateShipping } from "@/lib/utils";
import type { PaymentMethod } from "@/types";
import Image from "next/image";

const addressSchema = z.object({
  fullName: z.string().min(2, "Nom complet requis"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("E-mail invalide"),
  addressLine1: z.string().min(5, "Adresse requise"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().min(4, "Code postal requis"),
  country: z.string().min(2, "Pays requis"),
});

type AddressForm = z.infer<typeof addressSchema>;

const COUNTRIES = [
  { value: "MA", label: "Maroc" },
  { value: "FR", label: "France" },
  { value: "BE", label: "Belgique" },
  { value: "ES", label: "Espagne" },
  { value: "DE", label: "Allemagne" },
  { value: "US", label: "États-Unis" },
  { value: "CA", label: "Canada" },
];

export default function PaiementPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { country: "MA" },
  });

  const country = watch("country");
  const subtotal = getTotalPrice();
  const shipping = calculateShipping(subtotal, country);
  const total = subtotal + shipping;

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace("/panier");
    }
  }, [mounted, items.length, router]);

  if (!mounted) return null;

  if (items.length === 0) {
    return null;
  }

  async function onSubmit(data: AddressForm) {
    setLoading(true);
    try {
      if (method === "stripe") {
        const res = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, address: data, shipping }),
        });
        const json = await res.json();
        if (json.url) {
          window.location.href = json.url;
        } else {
          throw new Error("Pas d'URL de redirection Stripe");
        }
      } else if (method === "cod") {
        const res = await fetch("/api/checkout/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, address: data, shipping }),
        });
        const json = await res.json();
        if (res.ok) {
          clearCart();
          router.push(`/commande-confirmee?ref=${json.orderNumber}`);
        } else {
          throw new Error("Erreur lors de la commande");
        }
      }
      // PayPal géré via @paypal/react-paypal-js dans le composant dédié
    } catch (err) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-premium py-10 lg:py-16">
      <h1 className="font-serif text-display-sm text-ink mb-2">Paiement</h1>
      <p className="text-xs uppercase tracking-widest text-ink-muted mb-10 flex items-center gap-1.5">
        <Lock size={11} /> Paiement sécurisé SSL
      </p>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Adresse de livraison */}
          <section>
            <h2 className="font-serif text-xl text-ink mb-6">Adresse de livraison</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom complet" error={errors.fullName?.message}>
                <input {...register("fullName")} placeholder="Prénom Nom" className={inputClass(!!errors.fullName)} />
              </Field>
              <Field label="Téléphone" error={errors.phone?.message}>
                <input {...register("phone")} placeholder="+212 6 00 00 00 00" className={inputClass(!!errors.phone)} />
              </Field>
              <Field label="E-mail" error={errors.email?.message} className="sm:col-span-2">
                <input {...register("email")} type="email" placeholder="vous@exemple.com" className={inputClass(!!errors.email)} />
              </Field>
              <Field label="Adresse" error={errors.addressLine1?.message} className="sm:col-span-2">
                <input {...register("addressLine1")} placeholder="Rue, numéro, appartement…" className={inputClass(!!errors.addressLine1)} />
              </Field>
              <Field label="Complément (optionnel)">
                <input {...register("addressLine2")} placeholder="Résidence, étage…" className={inputClass(false)} />
              </Field>
              <Field label="Ville" error={errors.city?.message}>
                <input {...register("city")} placeholder="Casablanca" className={inputClass(!!errors.city)} />
              </Field>
              <Field label="Code postal" error={errors.postalCode?.message}>
                <input {...register("postalCode")} placeholder="20000" className={inputClass(!!errors.postalCode)} />
              </Field>
              <Field label="Pays" error={errors.country?.message}>
                <select {...register("country")} className={inputClass(!!errors.country)}>
                  {COUNTRIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          {/* Mode de paiement */}
          <section>
            <h2 className="font-serif text-xl text-ink mb-6">Mode de paiement</h2>
            <div className="space-y-3">
              {[
                {
                  value: "stripe" as PaymentMethod,
                  icon: <CreditCard size={18} strokeWidth={1.5} />,
                  label: "Carte bancaire",
                  sub: "Visa, Mastercard — Paiement sécurisé par Stripe",
                },
                {
                  value: "paypal" as PaymentMethod,
                  icon: <span className="text-base font-bold text-[#003087]">P</span>,
                  label: "PayPal",
                  sub: "Paiement via votre compte PayPal",
                },
                {
                  value: "cod" as PaymentMethod,
                  icon: <PackageCheck size={18} strokeWidth={1.5} />,
                  label: "Paiement à la livraison",
                  sub: "Disponible au Maroc uniquement",
                  disabled: country !== "MA",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => setMethod(opt.value)}
                  className={`w-full flex items-center gap-4 p-4 border-2 text-left transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    method === opt.value
                      ? "border-ink bg-cream-200/60"
                      : "border-cream-300 hover:border-ink/30"
                  }`}
                >
                  <div className="w-8 flex items-center justify-center text-ink shrink-0">
                    {opt.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">{opt.label}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{opt.sub}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === opt.value ? "border-ink" : "border-cream-300"}`}>
                    {method === opt.value && <div className="w-2 h-2 rounded-full bg-ink" />}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-cream-100/30 border-t-cream-100 rounded-full animate-spin" />
                Traitement…
              </>
            ) : (
              <>
                {method === "stripe"
                  ? "Payer avec ma carte"
                  : method === "paypal"
                  ? "Continuer vers PayPal"
                  : "Confirmer la commande"}
                <ChevronRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Récapitulatif */}
        <aside className="h-fit bg-cream-200/60 p-6">
          <h2 className="font-serif text-lg text-ink mb-5">Votre commande</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-14 h-16 relative bg-cream-300 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-ink text-cream-100 text-[9px] rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] text-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-ink line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-ink-muted">{item.color}</p>
                  <p className="text-xs text-ink mt-1">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-cream-300 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-ink-muted">
              <span>Sous-total</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Livraison</span>
              <span>{shipping === 0 ? <span className="text-leather-100 text-xs">Offerte</span> : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-3 border-t border-cream-300">
              <span className="text-xs uppercase tracking-wider text-ink">Total</span>
              <span className="font-serif text-xl text-ink">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-transparent border ${hasError ? "border-destructive" : "border-cream-300"} px-3 py-3 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-ink transition-colors`;
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-destructive mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
