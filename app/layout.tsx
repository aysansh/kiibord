import "@/index.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const siteUrl = "https://kiibord.app";
const siteTitle = "KIIBORD | Tournament Auth Portal";
const siteDescription =
  "OTP-only authentication experience for KIIBORD, the competitive gaming operations platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | KIIBORD",
  },
  description: siteDescription,
  applicationName: "KIIBORD",
  keywords: [
    "esports",
    "tournaments",
    "gaming platform",
    "OTP login",
    "next.js",
  ],
  authors: [{ name: "KIIBORD" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "KIIBORD",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "KIIBORD auth portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kiibord",
    site: "@kiibord",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030213",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "KIIBORD Auth Portal",
    url: siteUrl,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    about:
      "OTP-based authentication experience for KIIBORD tournament management.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-background`}
      >
        {children}
        <Script
          id="app-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
