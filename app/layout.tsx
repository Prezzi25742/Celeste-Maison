import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  // This is the primary title Google will show
  title: "Maison Celeste | Mobile Massage Therapy",
  description: "Bespoke mobile massage therapy and luxury relaxation rituals delivered to your home in Limerick, Ireland.",
  
  // This helps search engines confirm your specific domain
  alternates: {
    canonical: "https://maisoncelestelimerick.com",
  },

  // Social Media / Search Preview settings
  openGraph: {
    title: "Maison Celeste",
    description: "Luxury Mobile Massage Therapy in Limerick.",
    url: "https://maisoncelestelimerick.com",
    siteName: "Maison Celeste",
    locale: "en_IE",
    type: "website",
  },

  // Explicitly pointing to your icon files
  icons: {
    icon: "/favicon.ico", // This matches your current file name
    apple: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
