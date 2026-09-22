import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "Fancy Text Generator 2.0 — Aesthetic Fonts, Cursive & Cool Styles",
  description:
    "Generate 40+ aesthetic Unicode fonts, cursive script, gothic text, zalgo glitch, and decorative symbols for Instagram, TikTok, Discord, and gaming nicknames. 1-click copy.",
  keywords: [
    "fancy text generator",
    "aesthetic fonts",
    "cursive text generator",
    "gothic font",
    "zalgo glitch text",
    "discord bio fonts",
    "instagram font generator"
  ],
  authors: [{ name: "Fancy Text Studio" }],
  openGraph: {
    title: "Fancy Text Generator 2.0 — Aesthetic Fonts & Cool Text Styles",
    description: "Instant copy-paste 40+ stylish Unicode fonts for bios, chats, and gaming.",
    url: "https://fancytextgenerator.vercel.app",
    siteName: "Fancy Text Generator 2.0",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fancy Text Generator 2.0",
    description: "Generate stylish Unicode fonts for social bios and games instantly."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Fancy Text Generator 2.0",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires JavaScript",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
