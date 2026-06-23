"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MessageCircle, Instagram, Facebook, Mail, MapPin, Clock } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  email: z.string().email("E-mail invalide"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message trop court (min. 10 caractères)"),
});

type ContactForm = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  async function onSubmit(data: ContactForm) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSent(true);
      reset();
      toast.success("Votre message a bien été envoyé !");
    } else {
      toast.error("Erreur lors de l'envoi — veuillez réessayer.");
    }
  }

  const inputCls = (err?: string) =>
    `w-full bg-transparent border ${
      err ? "border-destructive" : "border-cream-300"
    } px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-ink transition-colors`;

  return (
    <>
      {/* Hero simple */}
      <section className="bg-cream-200 py-16 lg:py-20 text-center">
        <p className="overline mb-3">Contactez-nous</p>
        <h1 className="font-serif text-display-sm lg:text-display-md text-ink mb-3">
          Nous sommes à votre écoute
        </h1>
        <p className="text-ink-muted max-w-md mx-auto text-sm">
          Une question sur un produit, une commande ou un projet sur-mesure ?
          Notre équipe vous répond dans les 24 heures.
        </p>
      </section>

      <div className="container-premium py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16">
          {/* Formulaire */}
          <div>
            <h2 className="font-serif text-2xl text-ink mb-8">Envoyer un message</h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream-200 p-8 text-center"
              >
                <div className="w-12 h-12 bg-leather-100/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={20} className="text-leather-100" />
                </div>
                <h3 className="font-serif text-xl text-ink mb-2">Message reçu !</h3>
                <p className="text-sm text-ink-muted">
                  Merci de nous avoir contactés. Nous vous répondrons dans les 24
                  heures ouvrées.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-xs uppercase tracking-wider text-ink-light hover:text-ink link-underline"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      {...register("fullName")}
                      placeholder="Prénom Nom"
                      className={inputCls(errors.fullName?.message)}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
                      E-mail *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="vous@exemple.com"
                      className={inputCls(errors.email?.message)}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
                      Téléphone (optionnel)
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="+212 6 00 00 00 00"
                      className={inputCls()}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
                      Sujet (optionnel)
                    </label>
                    <select {...register("subject")} className={inputCls()}>
                      <option value="">— Choisir —</option>
                      <option>Question sur un produit</option>
                      <option>Suivi de commande</option>
                      <option>Retour / échange</option>
                      <option>Commande sur-mesure</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Votre message…"
                    className={`${inputCls(errors.message?.message)} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-cream-100/30 border-t-cream-100 rounded-full animate-spin" />
                      Envoi…
                    </>
                  ) : (
                    "Envoyer le message"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Infos de contact */}
          <aside className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-ink mb-6">Coordonnées</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: "Adresse",
                    value: "Casablanca, Maroc\nCasablanca Anfa — Maarif",
                  },
                  {
                    icon: Mail,
                    label: "E-mail",
                    value: "contact@atlasleather.ma",
                  },
                  {
                    icon: Clock,
                    label: "Disponibilité",
                    value: "Lun – Ven, 9h – 18h\nHeure du Maroc (GMT+1)",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon size={16} strokeWidth={1.5} className="text-leather-100 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-ink-muted mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm text-ink whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Réseaux et WhatsApp */}
            <div className="border-t border-cream-300 pt-7">
              <h3 className="text-[11px] uppercase tracking-wider text-ink-muted mb-5">
                Suivez-nous
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-ink hover:text-leather-100 transition-colors group"
                >
                  <span className="w-8 h-8 bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle size={15} className="text-[#25D366]" />
                  </span>
                  WhatsApp — Réponse rapide
                </a>
                <a
                  href="https://instagram.com/atlasleather.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-ink hover:text-leather-100 transition-colors group"
                >
                  <span className="w-8 h-8 bg-cream-300 flex items-center justify-center group-hover:bg-cream-300/80 transition-colors">
                    <Instagram size={15} className="text-ink" />
                  </span>
                  @atlasleather.ma
                </a>
                <a
                  href="https://facebook.com/atlasleather.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-ink hover:text-leather-100 transition-colors group"
                >
                  <span className="w-8 h-8 bg-cream-300 flex items-center justify-center group-hover:bg-cream-300/80 transition-colors">
                    <Facebook size={15} className="text-ink" />
                  </span>
                  Atlas Leather Maroc
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
