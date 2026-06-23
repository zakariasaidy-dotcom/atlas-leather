import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Package, Heart, LogOut, User } from "lucide-react";

export const metadata = { title: "Mon compte" };

export default async function ComptePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?redirect=/compte");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, total, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const STATUS_LABELS: Record<string, string> = {
    en_attente: "En attente",
    confirmee: "Confirmée",
    en_preparation: "En préparation",
    expediee: "Expédiée",
    livree: "Livrée",
    annulee: "Annulée",
  };

  const STATUS_COLORS: Record<string, string> = {
    en_attente: "bg-sand-200 text-ink",
    confirmee: "bg-leather-100/20 text-leather-100",
    en_preparation: "bg-gold/20 text-gold-dark",
    expediee: "bg-leather-300/20 text-leather-300",
    livree: "bg-leather-100/30 text-leather-200",
    annulee: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="container-premium py-12 lg:py-16 max-w-4xl mx-auto">
      {/* En-tête */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="overline mb-2">Espace client</p>
          <h1 className="font-serif text-display-sm text-ink">
            Bonjour, {profile?.full_name?.split(" ")[0] ?? "vous"}
          </h1>
          <p className="text-sm text-ink-muted mt-1">{user.email}</p>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-muted hover:text-ink transition-colors">
            <LogOut size={14} strokeWidth={1.5} />
            Déconnexion
          </button>
        </form>
      </div>

      {/* Cards rapides */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: Package, label: "Mes commandes", href: "/compte/commandes", count: orders?.length ?? 0 },
          { icon: Heart, label: "Ma wishlist", href: "/compte/wishlist", count: null },
          { icon: User, label: "Mon profil", href: "/compte/profil", count: null },
        ].map(({ icon: Icon, label, href, count }) => (
          <Link
            key={href}
            href={href}
            className="bg-cream-200/60 p-5 flex items-center gap-4 hover:bg-cream-300/60 transition-colors group"
          >
            <div className="w-10 h-10 bg-cream-300 flex items-center justify-center group-hover:bg-leather-100/15 transition-colors">
              <Icon size={18} strokeWidth={1.5} className="text-leather-100" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{label}</p>
              {count !== null && (
                <p className="text-xs text-ink-muted">{count} commande{count > 1 ? "s" : ""}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Dernières commandes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-ink">Dernières commandes</h2>
          <Link href="/compte/commandes" className="text-xs uppercase tracking-wider text-ink-muted hover:text-ink link-underline">
            Tout voir
          </Link>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-cream-200/50 p-10 text-center">
            <Package size={36} strokeWidth={1} className="text-ink-muted/30 mx-auto mb-4" />
            <p className="font-serif text-lg text-ink mb-2">Aucune commande pour l&apos;instant</p>
            <p className="text-sm text-ink-muted mb-5">Découvrez notre collection et passez votre première commande.</p>
            <Link href="/boutique" className="btn-primary">Voir la boutique</Link>
          </div>
        ) : (
          <div className="border-t border-cream-300">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-4 border-b border-cream-300">
                <div>
                  <p className="text-sm font-medium text-ink">#{order.order_number}</p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {new Date(order.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 ${STATUS_COLORS[order.status] ?? "bg-cream-300 text-ink"}`}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="text-sm font-medium text-ink">{order.total.toLocaleString("fr-MA")} MAD</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
