"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { Suspense } from "react";

function CommandeConfirmeeContent() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "—";

  return (
    <div className="container-premium py-24 text-center max-w-xl mx-auto">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 18, stiffness: 200 }}
        className="mb-8"
      >
        <CheckCircle size={64} strokeWidth={1} className="text-leather-100 mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <p className="overline mb-3">Commande confirmée</p>
        <h1 className="font-serif text-display-sm text-ink mb-4">
          Merci pour votre commande&nbsp;!
        </h1>
        <p className="text-ink-muted leading-relaxed mb-2">
          Votre commande <span className="font-medium text-ink">#{ref}</span> a bien
          été reçue. Vous recevrez un e-mail de confirmation dans quelques minutes.
        </p>
        <p className="text-sm text-ink-muted mb-10">
          Nos équipes préparent votre commande avec soin dans notre atelier de
          Casablanca.
        </p>

        <div className="bg-cream-200/70 p-6 mb-10 text-left space-y-3">
          {[
            { icon: Package, text: "Préparation de votre commande : 1-2 jours ouvrés" },
            { icon: ArrowRight, text: "Livraison au Maroc : 2-4 jours ouvrés" },
            {
              icon: ArrowRight,
              text: "Vous recevrez un lien de suivi par e-mail dès l'expédition",
            },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3 text-sm text-ink-muted">
              <Icon size={14} strokeWidth={1.5} className="text-leather-100 mt-0.5 shrink-0" />
              {text}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/compte/commandes" className="btn-primary">
            Suivre ma commande
          </Link>
          <Link href="/boutique" className="btn-outline">
            Continuer mes achats
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function CommandeConfirmeePage() {
  return (
    <Suspense fallback={<div className="container-premium py-24 text-center"><div className="animate-pulse">Chargement...</div></div>}>
      <CommandeConfirmeeContent />
    </Suspense>
  );
}
