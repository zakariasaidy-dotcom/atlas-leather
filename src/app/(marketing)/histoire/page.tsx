import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "Découvrez l'histoire d'Atlas Leather, maison de maroquinerie artisanale fondée à Casablanca. Notre savoir-faire, nos valeurs et notre engagement pour la qualité.",
};

const TIMELINE = [
  {
    year: "2008",
    title: "Les débuts dans la médina",
    text: "Fondée dans un atelier de la médina de Casablanca par Youssef Alami, Atlas Leather commence comme une petite structure de maroquinerie sur-mesure, travaillant pour des boutiques locales.",
  },
  {
    year: "2013",
    title: "La signature de marque",
    text: "Après cinq ans à affiner les techniques et à sélectionner les meilleurs tanneurs du pays, Atlas Leather lance sa première collection signature : le Sac Casbah. La réponse du marché est immédiate.",
  },
  {
    year: "2018",
    title: "Ouverture à l'international",
    text: "Les premières commandes arrivent d'Europe — France, Belgique, Espagne. La marque investit dans l'emballage premium et la logistique internationale pour répondre à cette demande croissante.",
  },
  {
    year: "2023",
    title: "La boutique en ligne",
    text: "Atlas Leather lance son site e-commerce, rendant ses créations accessibles aux amateurs de maroquinerie du monde entier, tout en conservant l'âme artisanale qui fait son identité.",
  },
];

const TEAM = [
  {
    name: "Youssef Alami",
    role: "Fondateur & Directeur artistique",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Formé auprès des maîtres artisans de Fès, Youssef a passé deux décennies à maîtriser les techniques de la maroquinerie marocaine avant de créer Atlas Leather.",
  },
  {
    name: "Fatima Benali",
    role: "Maître artisane — Couture",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "Avec 18 ans d'expérience dans les ateliers de Casablanca, Fatima supervise toutes les finitions cousues main de la collection.",
  },
  {
    name: "Mehdi Tazi",
    role: "Responsable sélection des cuirs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Mehdi parcourt chaque année les tanneries du Maroc pour sélectionner uniquement les cuirs pleine fleur qui répondent aux exigences d'Atlas Leather.",
  },
];

export default function HistoirePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-leather-500 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80"
          alt="Atelier Atlas Leather Casablanca"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="relative z-10 text-center px-5 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold-light mb-5">
            Notre histoire
          </p>
          <h1 className="font-serif text-display-md lg:text-display-lg text-cream-100 leading-tight">
            Une maison née de la passion du cuir marocain
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="container-premium py-20 lg:py-28 max-w-3xl mx-auto text-center">
        <p className="overline mb-4">Casablanca, Maroc</p>
        <p className="font-serif text-xl lg:text-2xl text-ink leading-relaxed mb-6">
          Atlas Leather est née d&apos;une conviction simple : le Maroc possède un
          patrimoine artisanal exceptionnel qui mérite d&apos;être mis en valeur sur la
          scène internationale.
        </p>
        <p className="text-ink-muted leading-relaxed">
          Fondée en 2008, notre maison perpétue les techniques ancestrales de la
          maroquinerie marocaine tout en les réinterprétant pour une clientèle
          contemporaine exigeante. Chaque pièce qui sort de notre atelier est le
          résultat d&apos;heures de travail manuel, d&apos;un choix rigoureux des matières et
          d&apos;une attention portée aux moindres détails.
        </p>
      </section>

      {/* Atelier immersif */}
      <section className="grid lg:grid-cols-2 min-h-[500px]">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900"
            alt="Artisan travaillant le cuir"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="bg-cream-200 flex items-center px-10 lg:px-16 py-16">
          <div>
            <p className="overline mb-4">Notre atelier</p>
            <h2 className="font-serif text-display-sm text-ink mb-6">
              15 artisans,<br />un seul exigence
            </h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              Notre atelier de Casablanca réunit quinze artisans spécialisés, chacun
              maître dans sa discipline : couture main au point de selle, coupe du
              cuir, teinture, pose des ferrures dorées.
            </p>
            <p className="text-ink-muted leading-relaxed">
              Il faut en moyenne six à huit heures de travail pour produire un sac
              de notre collection principale. C&apos;est ce temps, cette attention, qui
              font la différence entre une pièce industrielle et une pièce qui se
              bonifie avec les années.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-premium py-20 lg:py-28">
        <div className="text-center mb-16">
          <p className="overline mb-3">Notre parcours</p>
          <h2 className="font-serif text-display-sm lg:text-display-md text-ink">
            De l&apos;atelier au monde
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Ligne verticale */}
          <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-px bg-cream-300 -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex gap-8 lg:gap-0 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Point sur la timeline */}
                <div className="absolute left-[28px] lg:left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-gold border-2 border-cream-100 rounded-full z-10 mt-1.5" />

                {/* Contenu */}
                <div
                  className={`pl-14 lg:pl-0 lg:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                  }`}
                >
                  <p className="text-gold text-sm font-medium mb-1">{item.year}</p>
                  <h3 className="font-serif text-lg text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-ink py-20 lg:py-28">
        <div className="container-premium">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold-light mb-3">
              Ce en quoi nous croyons
            </p>
            <h2 className="font-serif text-display-sm lg:text-display-md text-cream-100">
              Nos valeurs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                label: "Qualité sans compromis",
                text: "Seul le cuir pleine fleur tanné végétalement entre dans nos ateliers. Nous refusons systématiquement les matières qui ne répondent pas à nos standards.",
              },
              {
                label: "Authenticité marocaine",
                text: "Chaque pièce est conçue et produite au Maroc. Nous travaillons avec des artisans locaux et des tanneries marocaines pour soutenir l'économie artisanale du pays.",
              },
              {
                label: "Durabilité responsable",
                text: "Nos pièces sont conçues pour traverser les décennies. Une maroquinerie de qualité, c'est la meilleure réponse à la fast-fashion : acheter moins, acheter mieux.",
              },
            ].map((v) => (
              <div key={v.label} className="text-center">
                <div className="w-8 h-px bg-gold mx-auto mb-6" />
                <h3 className="font-serif text-lg text-cream-100 mb-3">{v.label}</h3>
                <p className="text-sm text-cream-100/55 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="container-premium py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="overline mb-3">Les visages de la maison</p>
          <h2 className="font-serif text-display-sm lg:text-display-md text-ink">
            Notre équipe
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 relative bg-cream-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <h3 className="font-serif text-lg text-ink mb-1">{member.name}</h3>
              <p className="text-xs uppercase tracking-widest text-leather-100 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-300/60 py-16 text-center">
        <p className="overline mb-4">Prêt à découvrir ?</p>
        <h2 className="font-serif text-display-sm text-ink mb-6">
          Explorez notre collection
        </h2>
        <Link href="/boutique" className="btn-primary">
          Voir la boutique
        </Link>
      </section>
    </>
  );
}
