import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Parcourez toute la collection Atlas Leather : sacs, portefeuilles, ceintures et accessoires en cuir artisanal marocain.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
