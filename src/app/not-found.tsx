import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-premium py-32 text-center max-w-lg mx-auto">
      <p className="font-serif text-[8rem] text-cream-300 leading-none mb-4">404</p>
      <h1 className="font-serif text-display-sm text-ink mb-3">Page introuvable</h1>
      <p className="text-ink-muted mb-8 leading-relaxed">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="btn-primary">Retour à l&apos;accueil</Link>
        <Link href="/boutique" className="btn-outline">Voir la boutique</Link>
      </div>
    </div>
  );
}
