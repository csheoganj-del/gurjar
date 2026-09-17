import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Outfit } from "next/font/google";
import { house } from "@/lib/catalog";
import "./globals.css";

const sans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://mansinghgurjar.in";

export const metadata: Metadata = {
  title: {
    default: `${house.name} — ${house.experience}`,
    template: `%s — ${house.name}`,
  },
  description:
    "The Private Table: a personal universe of finance, business, lifestyle, tech, and original software. Objects as decisions.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: house.name,
    title: `${house.name} — ${house.experience}`,
    description: house.line,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "The Private Table — Gurjar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${house.name} — ${house.experience}`,
    description: house.line,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-ivory">{children}</body>
    </html>
  );
}
