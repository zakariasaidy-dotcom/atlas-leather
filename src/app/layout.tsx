import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlasleather.ma"),
  title: {
    default: "Atlas Leather — Maroquinerie artisanale marocaine",
    template: "%s | Atlas Leather",
  },
  description:
    "Découvrez Atlas Leather, maison de maroquinerie artisanale fondée à Casablanca. Sacs, portefeuilles, ceintures et petite maroquinerie en cuir pleine fleur, façonnés à la main.",
  keywords: [
    "maroquinerie marocaine",
    "cuir artisanal Maroc",
    "sac cuir Casablanca",
    "Atlas Leather",
    "maroquinerie haut de gamme",
    "cadeau cuir",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://atlasleather.ma",
    siteName: "Atlas Leather",
    title: "Atlas Leather — Maroquinerie artisanale marocaine",
    description:
      "L'élégance du cuir marocain, façonnée à la main. Sacs, portefeuilles, ceintures et accessoires en cuir pleine fleur.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Leather — Maroquinerie artisanale marocaine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Leather — Maroquinerie artisanale marocaine",
    description: "L'élégance du cuir marocain, façonnée à la main.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1A16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1C1A16",
              color: "#F7F3EC",
              border: "1px solid rgba(201,164,85,0.2)",
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
