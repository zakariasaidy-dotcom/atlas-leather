"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

const schema = z.object({
  email: z.string().email("E-mail invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});
type LoginForm = z.infer<typeof schema>;

function ConnexionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/compte";
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  async function onSubmit(data: LoginForm) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error("E-mail ou mot de passe incorrect.");
      return;
    }
    toast.success("Connexion réussie !");
    router.push(redirect);
    router.refresh();
  }

  const inputCls = (err?: string) =>
    `w-full bg-transparent border ${
      err ? "border-destructive" : "border-cream-300"
    } px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-ink transition-colors`;

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
          <h1 className="font-serif text-display-sm text-ink mb-2">Connexion</h1>
          <p className="text-sm text-ink-muted">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="text-leather-100 hover:text-leather-200 transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
              E-mail
            </label>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              className={inputCls(errors.email?.message)}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className={`${inputCls(errors.password?.message)} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="text-right">
            <Link href="/mot-de-passe-oublie" className="text-xs text-ink-muted hover:text-ink transition-colors">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-cream-100/30 border-t-cream-100 rounded-full animate-spin" />
                Connexion…
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="animate-pulse">Chargement...</div></div>}>
      <ConnexionContent />
    </Suspense>
  );
}
