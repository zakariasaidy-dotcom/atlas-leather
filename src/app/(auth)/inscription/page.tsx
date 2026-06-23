"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  email: z.string().email("E-mail invalide"),
  password: z
    .string()
    .min(8, "Minimum 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[0-9]/, "Au moins un chiffre"),
  acceptTerms: z.boolean().refine((v) => v, "Veuillez accepter les CGV"),
});

type RegisterForm = z.infer<typeof schema>;

export default function InscriptionPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(schema) });

  async function onSubmit(data: RegisterForm) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        emailRedirectTo: `${window.location.origin}/compte`,
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setDone(true);
  }

  const inputCls = (err?: string) =>
    `w-full bg-transparent border ${
      err ? "border-destructive" : "border-cream-300"
    } px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-ink transition-colors`;

  if (done) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-5">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-leather-100/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="font-serif text-display-sm text-ink mb-3">Vérifiez votre e-mail</h1>
          <p className="text-ink-muted leading-relaxed mb-6">
            Un e-mail de confirmation a été envoyé à votre adresse. Cliquez sur le
            lien pour activer votre compte.
          </p>
          <Link href="/connexion" className="btn-primary">
            Aller à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase text-ink mb-8 block">
            Atlas Leather
          </Link>
          <h1 className="font-serif text-display-sm text-ink mb-2">Créer un compte</h1>
          <p className="text-sm text-ink-muted">
            Déjà membre ?{" "}
            <Link href="/connexion" className="text-leather-100 hover:text-leather-200 transition-colors">
              Se connecter
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
              Nom complet
            </label>
            <input {...register("fullName")} placeholder="Prénom Nom" className={inputCls(errors.fullName?.message)} />
            {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
              E-mail
            </label>
            <input {...register("email")} type="email" autoComplete="email" placeholder="vous@exemple.com" className={inputCls(errors.email?.message)} />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 8 caractères"
                className={`${inputCls(errors.password?.message)} pr-10`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-0.5 w-4 h-4 border border-cream-300 accent-ink"
            />
            <span className="text-xs text-ink-muted leading-relaxed">
              J&apos;accepte les{" "}
              <Link href="/cgv" className="text-ink hover:text-leather-100">
                Conditions générales de vente
              </Link>{" "}
              et la{" "}
              <Link href="/confidentialite" className="text-ink hover:text-leather-100">
                politique de confidentialité
              </Link>
            </span>
          </label>
          {errors.acceptTerms && <p className="text-xs text-destructive -mt-3">{errors.acceptTerms.message}</p>}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {isSubmitting ? (
              <><span className="w-4 h-4 border-2 border-cream-100/30 border-t-cream-100 rounded-full animate-spin" />Création…</>
            ) : "Créer mon compte"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
