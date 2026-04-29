import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";


const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Chamie Cakes | Custom Cakes in Dallas/Fort Worth",
  description: "Handcrafted, artisanal custom cakes for weddings, birthdays, and special events in the Dallas/Fort Worth area. Order your dream cake today.",
  keywords: ["custom cakes", "Dallas bakery", "Fort Worth bakery", "wedding cakes", "birthday cakes DFW", "artisanal bakery"],
  openGraph: {
    title: "Chamie Cakes | Custom Cakes in Dallas/Fort Worth",
    description: "Handcrafted, artisanal custom cakes for weddings, birthdays, and special events in the Dallas/Fort Worth area.",
    url: "https://chamiecakes.com",
    siteName: "Chamie Cakes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chamie Cakes | Custom Cakes in Dallas/Fort Worth",
    description: "Handcrafted, artisanal custom cakes for weddings, birthdays, and special events in the Dallas/Fort Worth area.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

import Script from "next/script";
import PublicWrapper from "@/components/layout/PublicWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body 
        className={`${outfit.variable} ${inter.variable} min-h-full flex flex-col font-body`}
        suppressHydrationWarning
      >
        <PublicWrapper>
          {children}
        </PublicWrapper>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
