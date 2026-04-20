import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { Toaster } from "react-hot-toast";
import PremiumHeader from "@/components/PremiumHeader";
import PremiumFooter from "@/components/PremiumFooter";
import ModernCookieBanner from "@/components/ModernCookieBanner";
import CookieModal from "@/components/CookieModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exen Co Limited — Wholesale Electronics & Computers · Vietnam → Worldwide",
  description: "Vietnam-based B2B wholesale supplier of laptops, servers, monitors, desktops, video cards, routers, network switches, and enterprise IT equipment. Tri-currency settlement in VND, EUR, and USD. Serving buyers across Vietnam, the EU, and international markets.",
  keywords: "laptops, servers, monitors, desktops, video cards, routers, network switches, access points, cables, webcams, UPS, wholesale, B2B, Vietnam, EU, worldwide, electronics, computers, IT equipment, VND, EUR, USD",
  authors: [{ name: "Exen Co Limited" }],
  creator: "Exen Co Limited",
  publisher: "Exen Co Limited",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://www.exencolimited.com",
    siteName: "Exen Co Limited",
    title: "Wholesale Electronics & Computers · Vietnam → Worldwide",
    description: "B2B wholesale supplier of laptops, servers, networking gear, and enterprise IT equipment. Tri-currency settlement in VND, EUR, USD. Shipping worldwide from Vietnam.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Exen Co Limited — Wholesale Electronics & Computers" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-[#fffef1] text-[#0a0a0a] antialiased`}>
        <CookieConsentProvider>
          <CartProvider>
            <CurrencyProvider>
              <div className="min-h-screen flex flex-col">
                <PremiumHeader />
                <main className="flex-1">{children}</main>
                <PremiumFooter />
              </div>
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 4000,
                  style: { background: '#003933', color: '#fffef1', borderRadius: '100px', fontWeight: '600', fontSize: '13px', padding: '10px 20px', boxShadow: '0 12px 40px rgba(0,57,51,0.25)' },
                  success: { duration: 3000, style: { background: '#003933', color: '#fffef1', borderLeft: '4px solid #0A7060' } },
                  error: { duration: 5000, style: { background: '#0a0a0a', color: '#fffef1', borderLeft: '4px solid #C0272D' } },
                }}
              />
              <ModernCookieBanner />
              <CookieModal />
            </CurrencyProvider>
          </CartProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
