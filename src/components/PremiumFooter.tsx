"use client";
import Link from "next/link";
import Image from "next/image";
import GTranslate from "@/components/GTranslate";
import { Mail, MapPin, Globe, Cookie, Shield, ArrowUpRight, Laptop, Monitor, HardDrive, Router, Network, Server, ChevronRight, Clock, Sparkles } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const NAV = [{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }];
const CATS = [
  { label: "Laptops", href: "/shop?category=Laptop", icon: Laptop },
  { label: "Monitors", href: "/shop?category=Monitor", icon: Monitor },
  { label: "Desktops", href: "/shop?category=Desktop", icon: HardDrive },
  { label: "Routers", href: "/shop?category=Router", icon: Router },
  { label: "Switches", href: "/shop?category=Network%20Switch", icon: Network },
  { label: "Servers", href: "/shop?category=Server", icon: Server },
];
const CURRENCIES = ["VND ₫", "EUR €", "USD $"];

export default function Footer() {
  const { openModal } = useCookieConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-[#fffef1] overflow-hidden">
      {/* Ambient shader */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-60 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-[500px] h-[400px] rounded-full bg-[radial-gradient(ellipse,#005C4F_0%,transparent_70%)] opacity-25 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* ── Editorial CTA band ── */}
        <div className="pt-16 lg:pt-20 pb-12 border-b border-[#fffef1]/10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A7060]">
                <Sparkles className="w-3 h-3" /><span>Wholesale · Vietnam to Worldwide</span>
              </div>
              <h3 className="text-3xl lg:text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] mb-4">
                Sourcing electronics <span className="italic font-serif text-[#0A7060] font-medium">at scale</span>?
              </h3>
              <p className="text-[14px] text-[#fffef1]/55 max-w-lg leading-relaxed">
                Share your requirement — laptops, servers, networking, displays. Quotes in VND, EUR, or USD within 24 hours.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/contact" className="group inline-flex items-center justify-between gap-3 bg-[#fffef1] text-[#003933] text-sm font-semibold pl-6 pr-3 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#fffef1]/10 transition-all">
                Request a Quote <span className="w-8 h-8 rounded-full bg-[#003933] text-[#fffef1] flex items-center justify-center group-hover:rotate-45 transition-transform"><ArrowUpRight className="w-4 h-4" /></span>
              </Link>
              <a href="mailto:Exencolimited@gmail.com" className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#fffef1]/80 hover:text-[#fffef1] border-b border-[#fffef1]/25 hover:border-[#fffef1] pb-0.5 transition-colors self-start sm:self-auto lg:self-end">
                <Mail className="w-3.5 h-3.5" /> Exencolimited@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* ── Main footer ── */}
        <div className="py-14 grid lg:grid-cols-12 gap-10 lg:gap-8 border-b border-[#fffef1]/10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <Image src="/logo.png" alt="Exen Co Limited" width={56} height={56} className="h-12 w-auto object-contain flex-shrink-0" style={{ filter: "brightness(0) invert(1)" }} />
              <div className="leading-none">
                <span className="text-[15px] font-bold tracking-tight">Exen Co <span className="italic font-serif font-medium text-[#0A7060]">Limited</span></span>
                <span className="block text-[10px] font-semibold text-[#fffef1]/45 uppercase tracking-widest mt-1">Vietnam · Co Ltd</span>
              </div>
            </div>
            <p className="text-[13px] text-[#fffef1]/55 leading-relaxed max-w-xs mb-6">
              B2B wholesale supplier of electronics, computers & IT equipment — serving business buyers across Vietnam, the EU & international markets.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {CURRENCIES.map((c) => (
                <span key={c} className="text-[10px] font-bold uppercase tracking-wider text-[#fffef1]/70 bg-[#fffef1]/5 border border-[#fffef1]/10 rounded-full px-2.5 py-1">{c}</span>
              ))}
            </div>
            <a href="mailto:Exencolimited@gmail.com" className="group inline-flex items-center gap-2.5 bg-[#fffef1]/5 hover:bg-[#003933]/40 border border-[#fffef1]/10 hover:border-[#0A7060]/40 rounded-xl px-3.5 py-2.5 transition-all w-fit">
              <div className="w-7 h-7 rounded-lg bg-[#003933] flex items-center justify-center"><Mail className="w-3.5 h-3.5 text-[#0A7060]" /></div>
              <span className="text-xs font-semibold text-[#fffef1]/80 group-hover:text-[#fffef1] transition-colors">Exencolimited@gmail.com</span>
            </a>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A7060] mb-4">Navigate</h4>
            <div className="space-y-0.5">
              {NAV.map((l) => (
                <Link key={l.label} href={l.href} className="group flex items-center gap-1.5 py-1.5 text-[13px] text-[#fffef1]/65 hover:text-[#fffef1] transition-colors">
                  {l.label}<ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#0A7060]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A7060] mb-4">Top Categories</h4>
            <div className="space-y-0.5">
              {CATS.map((c) => (
                <Link key={c.label} href={c.href} className="group flex items-center gap-2 py-1.5 text-[13px] text-[#fffef1]/65 hover:text-[#fffef1] transition-colors">
                  <c.icon className="w-3.5 h-3.5 text-[#fffef1]/35 group-hover:text-[#0A7060] transition-colors" />{c.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Business */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A7060] mb-4">Business</h4>
            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#0A7060] mt-0.5 flex-shrink-0" />
                <div><div className="text-[13px] font-semibold text-[#fffef1]">Hanoi, Vietnam</div><div className="text-[11px] text-[#fffef1]/50">Serving Worldwide</div></div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#0A7060] mt-0.5 flex-shrink-0" />
                <div><div className="text-[13px] font-semibold text-[#fffef1]">Mon–Fri · 9–18 ICT</div><div className="text-[11px] text-[#fffef1]/50">UTC+7</div></div>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-3.5 h-3.5 text-[#0A7060] mt-0.5 flex-shrink-0" />
                <div><div className="text-[13px] font-semibold text-[#fffef1]">exencolimited.com</div><div className="text-[11px] text-[#fffef1]/50">Online catalog</div></div>
              </div>
            </div>
            <Link href="/contact" className="group inline-flex items-center gap-1.5 mt-5 bg-[#003933] hover:bg-[#0A7060] text-[#fffef1] text-xs font-semibold px-4 py-2 rounded-full transition-all hover:shadow-md hover:shadow-[#003933]/30">
              Request a Quote <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-[#fffef1]/50">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0A7060]" />
            <span>© {year} <span className="font-semibold text-[#fffef1]/75">Exen Co Limited</span> · All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-[#fffef1]/40" /><GTranslate /></div>
            <span className="w-px h-3 bg-[#fffef1]/15" />
            <button onClick={openModal} className="flex items-center gap-1 text-[11px] text-[#fffef1]/50 hover:text-[#0A7060] transition-colors"><Cookie className="h-3.5 w-3.5" />Cookies</button>
            <span className="w-px h-3 bg-[#fffef1]/15" />
            <div className="flex items-center gap-1 text-[11px] text-[#fffef1]/50"><Shield className="h-3.5 w-3.5 text-[#0A7060]" />GDPR</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
