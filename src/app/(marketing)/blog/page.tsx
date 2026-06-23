import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils d'entretien du cuir, tendances maroquinerie et plongées dans l'artisanat marocain — le blog Atlas Leather.",
};

const POSTS = [
  {
    slug: "entretenir-cuir-pleine-fleur",
    title: "Comment entretenir un cuir pleine fleur au quotidien",
    excerpt:
      "Les gestes simples pour préserver l'éclat et la souplesse de vos pièces en cuir pleine fleur pendant des décennies.",
    category: "Entretien du cuir",
    categoryHref: "entretien-cuir",
    coverImage:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800",
    readingTime: 4,
    publishedAt: "2025-01-15",
    author: "Atlas Leather",
  },
  {
    slug: "tendances-maroquinerie-2025",
    title: "Les tendances maroquinerie à suivre en 2025",
    excerpt:
      "Formats compacts, couleurs terreuses et finitions mates : un tour d'horizon des tendances qui marqueront l'année.",
    category: "Tendances",
    categoryHref: "tendances",
    coverImage:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    readingTime: 6,
    publishedAt: "2025-01-08",
    author: "Atlas Leather",
  },
  {
    slug: "histoire-artisanat-maroquinerie-marocaine",
    title: "L'artisanat de la maroquinerie marocaine — une histoire millénaire",
    excerpt:
      "Des tanneries historiques de Fès aux ateliers contemporains, retour sur des siècles de savoir-faire transmis de génération en génération.",
    category: "Artisanat marocain",
    categoryHref: "artisanat-marocain",
    coverImage:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    readingTime: 8,
    publishedAt: "2024-12-20",
    author: "Atlas Leather",
  },
];

export default function BlogPage() {
  return (
    <div className="container-premium py-16 lg:py-24">
      {/* En-tête */}
      <div className="max-w-2xl mb-16">
        <p className="overline mb-3">Journal</p>
        <h1 className="font-serif text-display-sm lg:text-display-md text-ink mb-4">
          Le blog Atlas Leather
        </h1>
        <p className="text-ink-muted leading-relaxed">
          Conseils d&apos;entretien, tendances, histoires d&apos;artisans — tout ce qui gravite
          autour de la maroquinerie de qualité.
        </p>
      </div>

      {/* Article à la une */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <Link href={`/blog/${POSTS[0].slug}`} className="group block">
          <div className="img-zoom-wrap aspect-[16/10] relative bg-cream-300 mb-5">
            <Image
              src={POSTS[0].coverImage}
              alt={POSTS[0].title}
              fill
              className="img-zoom object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center">
          <Link href={`/blog/${POSTS[0].slug}`} className="group">
            <span className="overline mb-3 block">{POSTS[0].category}</span>
            <h2 className="font-serif text-display-sm text-ink group-hover:text-leather-100 transition-colors mb-4 leading-snug">
              {POSTS[0].title}
            </h2>
            <p className="text-ink-muted leading-relaxed mb-5">{POSTS[0].excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-ink-muted uppercase tracking-wider">
              <span>{POSTS[0].author}</span>
              <span>·</span>
              <span>
                {new Date(POSTS[0].publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{POSTS[0].readingTime} min</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Autres articles */}
      <div className="border-t border-cream-300 pt-12">
        <h2 className="font-serif text-xl text-ink mb-10">Autres articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {POSTS.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-5">
              <div className="img-zoom-wrap w-28 h-28 relative bg-cream-300 shrink-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="img-zoom object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-leather-100 mb-1 block">
                  {post.category}
                </span>
                <h3 className="font-serif text-base text-ink group-hover:text-leather-100 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-ink-muted flex items-center gap-2">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{post.readingTime} min de lecture</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
