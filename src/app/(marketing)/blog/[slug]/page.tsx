import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const POSTS: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string[];
    category: string;
    coverImage: string;
    readingTime: number;
    publishedAt: string;
  }
> = {
  "entretenir-cuir-pleine-fleur": {
    title: "Comment entretenir un cuir pleine fleur au quotidien",
    excerpt:
      "Les gestes simples pour préserver l'éclat et la souplesse de vos pièces en cuir pleine fleur pendant des décennies.",
    content: [
      "Le cuir pleine fleur est la matière la plus noble de la maroquinerie. Contrairement au cuir corrigé ou au cuir reconstitué, il conserve la surface naturelle de la peau, avec ses variations de grain et ses légères imperfections qui font sa beauté. Il se patine avec le temps, acquérant un caractère unique.",
      "Pour préserver cet investissement, quelques gestes simples suffisent. Le plus important : éviter l'eau prolongée. Si votre sac est mouillé, séchez-le délicatement avec un chiffon doux et laissez-le sécher à l'air libre, jamais au soleil direct ni à proximité d'une source de chaleur.",
      "Deux à trois fois par an, appliquez une crème nourrissante pour cuir — de préférence à base de cire d'abeille ou de lanoline. Testez toujours sur une zone peu visible d'abord. Appliquez en mouvements circulaires, laissez pénétrer vingt minutes, puis lustrez avec un chiffon propre.",
      "Quand vous ne l'utilisez pas, rangez votre sac dans sa housse en coton fournie à l'achat. Évitez les sacs plastiques qui empêchent le cuir de respirer. Bourrez-le avec du papier de soie pour qu'il conserve sa forme.",
      "Une rayure légère ? Frottez délicatement avec le bout du doigt — la chaleur et les huiles naturelles de la peau suffisent souvent à effacer les petites marques sur un cuir de qualité. Pour les griffures plus profondes, une crème incolore appliquée en petite quantité peut faire des miracles.",
    ],
    category: "Entretien du cuir",
    coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200",
    readingTime: 4,
    publishedAt: "2025-01-15",
  },
  "tendances-maroquinerie-2025": {
    title: "Les tendances maroquinerie à suivre en 2025",
    excerpt:
      "Formats compacts, couleurs terreuses et finitions mates : un tour d'horizon des tendances qui marqueront l'année.",
    content: [
      "2025 confirme un mouvement de fond amorcé depuis plusieurs saisons : le retour du minimalisme structuré. Les grandes maisons internationales comme les marques indépendantes s'accordent sur une silhouette épurée, avec des lignes claires et peu d'ornements superflus.",
      "Côté couleurs, la palette terreuse s'impose. Terracotta, cognac profond, vert olive, beige sable — les teintes qui évoquent les paysages naturels dominent les nouvelles collections. Une tendance qui sied particulièrement bien à la maroquinerie marocaine, dont les cuirs pleine fleur prennent naturellement ces nuances après tannage végétal.",
      "Le format compact poursuit sa progression. Le mini-sac n'est plus une fantaisie de soirée : des maisons comme The Row ou Polène l'ont imposé comme pièce quotidienne. L'idée : concentrer le maximum de sophistication dans le minimum d'espace.",
      "Les finitions mates prennent le dessus sur le brillant. Les cuirs avec une patine naturelle, légèrement cirés, valorisent la texture de la matière plutôt que de la masquer. Une tendance alignée avec la montée en puissance des pièces artisanales.",
      "Enfin, le retour du sac de voyage de qualité : dans un contexte où les voyageurs cherchent à investir dans des pièces durables plutôt qu'à renouveler une valise bon marché chaque été, les weekenders en cuir épais, façonnés pour durer des décennies, connaissent un regain d'intérêt significatif.",
    ],
    category: "Tendances",
    coverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200",
    readingTime: 6,
    publishedAt: "2025-01-08",
  },
  "histoire-artisanat-maroquinerie-marocaine": {
    title: "L'artisanat de la maroquinerie marocaine — une histoire millénaire",
    excerpt:
      "Des tanneries de Fès aux ateliers contemporains, retour sur des siècles de savoir-faire.",
    content: [
      "L'histoire de la maroquinerie marocaine remonte au XIe siècle, époque à laquelle les premières tanneries de Fès s'établirent près des sources d'eau de l'Oued Fès. La Chouara, la plus ancienne tannerie encore en activité au monde, date de cette période fondatrice.",
      "Le travail du cuir au Maroc obéissait à une organisation en guildes strictement codifiée. Chaque étape de la production — trempage, épilation, tannage, teinture, coupe, couture — était confiée à des artisans spécialisés, formés dès l'adolescence dans le cadre du compagnonnage traditionnel.",
      "Le tannage végétal, dit tannage à l'écorce de chêne ou à l'écorce de mimosa, est la technique historiquement utilisée au Maroc. Il produit un cuir plus ferme, plus respirant et plus durable que le tannage chimique au chrome, dominant depuis la révolution industrielle. C'est ce tannage qui donne au cuir marocain sa réputation de longévité.",
      "La colonisation puis l'industrialisation du XXe siècle ont failli avoir raison de cet artisanat. Dans les années 1970-1980, la concurrence des produits synthétiques et du cuir industriel importé a contraint de nombreux artisans à fermer boutique.",
      "La renaissance a commencé dans les années 2000, portée par une nouvelle génération de créateurs marocains formés à l'international — Paris, Milan, Florence — qui ont choisi de revenir au pays pour mêler technique contemporaine et savoir-faire ancestral. Atlas Leather fait partie de cette vague.",
    ],
    category: "Artisanat marocain",
    coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
    readingTime: 8,
    publishedAt: "2024-12-20",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <article className="container-premium py-16 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex gap-2 text-xs text-ink-muted uppercase tracking-wider mb-10">
        <Link href="/" className="hover:text-ink transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-ink line-clamp-1">{post.title}</span>
      </nav>

      {/* Meta */}
      <p className="overline mb-4">{post.category}</p>
      <h1 className="font-serif text-display-sm lg:text-display-md text-ink mb-5 leading-tight">
        {post.title}
      </h1>
      <div className="flex items-center gap-3 text-xs text-ink-muted uppercase tracking-wider mb-10">
        <span>Atlas Leather</span>
        <span>·</span>
        <span>
          {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span>·</span>
        <span>{post.readingTime} min de lecture</span>
      </div>

      {/* Image */}
      <div className="aspect-[16/9] relative bg-cream-300 mb-12">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>

      {/* Chapeau */}
      <p className="font-serif text-lg text-ink leading-relaxed border-l-2 border-gold pl-5 mb-10">
        {post.excerpt}
      </p>

      {/* Corps */}
      <div className="space-y-6">
        {post.content.map((para, i) => (
          <p key={i} className="text-base text-ink-muted leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Signature */}
      <div className="mt-12 pt-8 border-t border-cream-300 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-ink-muted">
            Par Atlas Leather
          </p>
        </div>
        <Link href="/blog" className="text-xs uppercase tracking-wider text-ink-light hover:text-ink link-underline">
          ← Retour au blog
        </Link>
      </div>
    </article>
  );
}
