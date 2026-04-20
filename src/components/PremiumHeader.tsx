"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Menu, X, User, Mail, ArrowUpRight, Globe, ChevronRight, Laptop, Monitor, HardDrive, Router, Network, Cable, Webcam, Zap, Wifi, Cpu, MapPin, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CurrencySelector from "@/components/CurrencySelector";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";

const NAV = [{ href: "/", label: "Home" }, { href: "/shop", label: "Catalog" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];
const CATS = [
  { label: "Laptops", href: "/shop?category=Laptop", icon: Laptop },
  { label: "Monitors", href: "/shop?category=Monitor", icon: Monitor },
  { label: "Desktops", href: "/shop?category=Desktop", icon: HardDrive },
  { label: "Video Cards", href: "/shop?category=Video%20Card", icon: Cpu },
  { label: "Servers", href: "/shop?category=Server", icon: HardDrive },
  { label: "Routers", href: "/shop?category=Router", icon: Router },
  { label: "Switches", href: "/shop?category=Network%20Switch", icon: Network },
  { label: "Access Points", href: "/shop?category=Access%20Point", icon: Wifi },
  { label: "Webcams", href: "/shop?category=Webcam", icon: Webcam },
  { label: "UPS", href: "/shop?category=UPS", icon: Zap },
  { label: "Cables", href: "/shop?category=Cable", icon: Cable },
];
const TAGS = [{ l: "Laptops", q: "laptop" }, { l: "Monitors", q: "monitor" }, { l: "Servers", q: "server" }, { l: "Routers", q: "router" }, { l: "Video Cards", q: "video card" }];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [topSearch, setTopSearch] = useState("");
  const [active, setActive] = useState("/");
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { cartItems } = useCart();
  const count = cartItems.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => { if (typeof window !== "undefined") setActive(window.location.pathname); }, []);
  useEffect(() => { if (searchOpen && ref.current) ref.current.focus(); }, [searchOpen]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(p => !p); } if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn);
  }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (e: React.FormEvent, q: string, reset: () => void) => { e.preventDefault(); if (q.trim()) { window.location.href = `/shop?search=${encodeURIComponent(q)}`; reset(); setSearchOpen(false); } };

  return (
    <>
      <div className="sticky top-0 z-50">
        {/* ═══ Row 1 — Announcement strip (teal) ═══ */}
        <div className="hidden md:block bg-[#003933] text-[#fffef1]">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex items-center justify-between h-9 gap-4 text-[10.5px] font-semibold tracking-wide">
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex w-1.5 h-1.5"><span className="absolute inset-0 rounded-full bg-[#0A7060] animate-ping opacity-80" /><span className="relative rounded-full w-1.5 h-1.5 bg-[#0A7060]" /></span>
                <span className="uppercase tracking-[0.2em]">B2B Electronics · Vietnam → Worldwide</span>
              </span>
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[#fffef1]/70"><MapPin className="w-3 h-3" /> Hanoi · ICT (UTC+7)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[#fffef1]/80"><Sparkles className="w-3 h-3 text-[#0A7060]" /> VND · EUR · USD Settlement</span>
              <a href="mailto:Exencolimited@gmail.com" className="group inline-flex items-center gap-1.5 text-[#fffef1] hover:text-[#0A7060] transition-colors">
                <Mail className="w-3 h-3" /><span>Exencolimited@gmail.com</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* ═══ Row 2 — Main bar (cream) ═══ */}
        <div className={`bg-[#fffef1]/95 backdrop-blur-md border-b transition-all ${scrolled ? "border-[#003933]/15 shadow-sm shadow-[#003933]/5" : "border-[#003933]/10"}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[68px] gap-4">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative flex items-center justify-center flex-shrink-0 group-hover:-translate-y-0.5 transition-transform">
                <Image src="/logo.png" alt="Exen Co Limited" width={56} height={56} className="h-12 w-auto object-contain" priority />
              </div>
              <div className="leading-none hidden sm:block">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[16px] font-bold text-[#003933] tracking-tight">EXEN CO</span>
                  <span className="text-[12px] italic font-serif text-[#0A7060]">Limited</span>
                </div>
                <span className="block text-[9.5px] font-bold text-[#003933]/55 uppercase tracking-[0.22em] mt-1">Electronics · Worldwide</span>
              </div>
            </Link>

            {/* Search — desktop */}
            <form onSubmit={(e) => go(e, topSearch, () => setTopSearch(""))} className="hidden md:flex items-center flex-1 max-w-md mx-4 h-10 bg-white hover:bg-white border border-[#003933]/20 hover:border-[#003933]/40 focus-within:border-[#003933] rounded-full transition-all shadow-sm">
              <Search className="h-4 w-4 text-[#003933]/60 ml-4 flex-shrink-0" />
              <input value={topSearch} onChange={(e) => setTopSearch(e.target.value)} placeholder="Search laptops, servers, routers…" className="flex-1 h-full px-3 text-[13px] text-[#0a0a0a] placeholder-[#003933]/40 bg-transparent outline-none" />
              <kbd className="hidden lg:inline-block text-[9px] font-semibold text-[#003933]/60 border border-[#003933]/20 rounded px-1.5 py-0.5 mr-3 font-mono bg-[#fffef1]">⌘K</kbd>
            </form>

            {/* Right cluster */}
            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} className="md:hidden h-9 w-9 rounded-full text-[#003933] hover:bg-[#003933]/10 flex items-center justify-center transition-all"><Search className="h-4 w-4" /></button>
              <div className="hidden sm:block"><CurrencySelector /></div>
              <button onClick={() => setCartOpen(true)} className="relative h-9 w-9 rounded-full text-[#003933] hover:bg-[#003933]/10 flex items-center justify-center transition-all">
                <ShoppingCart className="h-4 w-4" />
                {count > 0 && <span className="absolute -top-0.5 -right-0.5 h-[17px] min-w-[17px] px-1 flex items-center justify-center text-[9px] font-bold rounded-full bg-[#003933] text-[#fffef1] ring-2 ring-[#fffef1]">{count}</span>}
              </button>
              <div className="hidden lg:block w-px h-5 bg-[#003933]/15 mx-1.5" />
              <button onClick={() => setLoginOpen(true)} className="hidden lg:inline-flex items-center gap-1.5 h-9 px-3 text-[12px] font-semibold text-[#003933]/80 hover:text-[#003933] rounded-full hover:bg-[#003933]/10 transition-all"><User className="h-3.5 w-3.5" />Sign in</button>
              <Link href="/contact" className="hidden lg:inline-flex items-center gap-1.5 h-9 px-5 bg-gradient-to-br from-[#003933] to-black text-[#fffef1] text-[12px] font-semibold rounded-full shadow-md shadow-[#003933]/25 hover:shadow-lg hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all">Request Quote<ArrowUpRight className="h-3.5 w-3.5" /></Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden h-9 w-9 rounded-full text-[#003933] hover:bg-[#003933]/10 flex items-center justify-center transition-all ml-0.5">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </div>

          {/* Nav row under brand (desktop only) */}
          <div className="hidden xl:block border-t border-[#003933]/10">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-11 gap-6">
              <nav className="flex items-center gap-1">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} onClick={() => setActive(n.href)} className={`relative px-4 py-1.5 text-[12px] font-semibold rounded-full transition-all ${active === n.href ? "bg-[#003933] text-[#fffef1]" : "text-[#003933]/70 hover:text-[#003933] hover:bg-[#003933]/8"}`}>{n.label}</Link>
                ))}
              </nav>
              <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar justify-end">
                {CATS.slice(0, 8).map((c) => (
                  <Link key={c.label} href={c.href} className="group flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#003933]/60 hover:text-[#003933] hover:bg-[#003933]/8 transition-all">
                    <c.icon className="w-3 h-3" />{c.label}
                  </Link>
                ))}
                <Link href="/shop" className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold text-[#003933] border border-[#003933]/25 hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933] transition-all ml-1">All<ChevronRight className="w-3 h-3" /></Link>
              </div>
            </div>
          </div>

          {/* Category strip — mobile/tablet */}
          <div className="xl:hidden border-t border-[#003933]/10 bg-[#f9f8eb]/60">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar">
              <Link href="/shop" className="flex-shrink-0 text-[10.5px] font-bold text-[#003933] uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#003933] text-[#fffef1]">All</Link>
              {CATS.map((c) => (
                <Link key={c.label} href={c.href} className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#003933]/65 hover:text-[#003933] hover:bg-[#003933]/8 transition-all border border-[#003933]/10 bg-white/60">
                  <c.icon className="w-3 h-3" />{c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Search Overlay ═══ */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-[#003933]/40 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
          <div className="relative max-w-xl mx-auto mt-[12vh] px-4">
            <form onSubmit={(e) => go(e, search, () => setSearch(""))} className="bg-[#fffef1] rounded-3xl shadow-2xl shadow-[#003933]/30 ring-1 ring-[#003933]/15 overflow-hidden">
              <div className="flex items-center gap-3 px-5 h-16">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#003933] to-black flex items-center justify-center flex-shrink-0"><Search className="h-4 w-4 text-[#fffef1]" /></div>
                <input ref={ref} type="text" placeholder="Search electronics catalog…" value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 h-full text-[15px] font-medium text-[#0a0a0a] placeholder-[#003933]/40 bg-transparent outline-none" />
                <kbd onClick={() => setSearchOpen(false)} className="text-[10px] font-semibold text-[#003933]/60 bg-[#f9f8eb] border border-[#003933]/15 rounded-md px-2 py-1 cursor-pointer hover:bg-[#003933] hover:text-[#fffef1] transition-all">ESC</kbd>
              </div>
              <div className="px-5 py-3 border-t border-[#003933]/10 bg-[#f9f8eb]/70">
                <div className="text-[9px] font-bold text-[#003933]/55 uppercase tracking-[0.2em] mb-2">Trending searches</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {TAGS.map((t) => (
                    <button key={t.q} type="button" onClick={() => { setSearch(t.q); ref.current?.focus(); }} className="text-[11px] font-semibold text-[#003933]/70 bg-white border border-[#003933]/15 px-3 py-1.5 rounded-full hover:border-[#003933] hover:text-[#003933] hover:bg-[#fffef1] transition-all">{t.l}</button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══ Mobile Menu ═══ */}
      <div className={`fixed inset-0 z-[55] xl:hidden transition-all duration-400 ${menuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-[#003933]/50 backdrop-blur-md transition-opacity duration-400 ${menuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full max-w-[380px] bg-[#fffef1] shadow-2xl shadow-[#003933]/40 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-[#003933]/10 bg-[#003933] text-[#fffef1]">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Exen Co Limited" width={48} height={48} className="h-11 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              <div className="leading-none">
                <div className="flex items-baseline gap-1.5"><span className="text-[14px] font-bold">EXEN CO</span><span className="text-[10px] italic font-serif text-[#0A7060]">Limited</span></div>
                <span className="text-[9px] font-semibold text-[#fffef1]/60 uppercase tracking-widest mt-0.5">Electronics · Worldwide</span>
              </div>
            </Link>
            <button onClick={() => setMenuOpen(false)} className="h-9 w-9 rounded-full bg-[#fffef1]/10 hover:bg-[#fffef1]/20 flex items-center justify-center text-[#fffef1] transition-all"><X className="h-4 w-4" /></button>
          </div>

          <div className="flex flex-col h-[calc(100%-64px)] overflow-y-auto">
            {/* Search */}
            <div className="px-5 pt-5 pb-3">
              <form onSubmit={(e) => { go(e, search, () => setSearch("")); setMenuOpen(false); }} className="flex items-center bg-white border border-[#003933]/20 rounded-full h-11 shadow-sm">
                <Search className="h-3.5 w-3.5 text-[#003933]/50 ml-4" />
                <input type="text" placeholder="Search catalog…" value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 h-full pl-3 pr-2 text-[13px] text-[#0a0a0a] placeholder-[#003933]/40 bg-transparent outline-none" />
                <button type="submit" className="h-8 w-8 mr-1.5 rounded-full bg-gradient-to-br from-[#003933] to-black flex items-center justify-center flex-shrink-0"><ChevronRight className="h-3.5 w-3.5 text-[#fffef1]" /></button>
              </form>
            </div>

            {/* Nav */}
            <div className="px-4 py-2 space-y-1">
              <div className="text-[9px] font-bold text-[#003933]/55 uppercase tracking-[0.22em] px-4 mb-2">Navigate</div>
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => { setMenuOpen(false); setActive(n.href); }} className={`group flex items-center justify-between h-11 px-4 text-[13px] font-semibold rounded-xl transition-all ${active === n.href ? "bg-[#003933] text-[#fffef1]" : "text-[#003933]/80 hover:bg-[#003933]/8 hover:text-[#003933]"}`}>
                  {n.label}
                  <ChevronRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 ${active === n.href ? "text-[#fffef1]/60" : "text-[#003933]/30"}`} />
                </Link>
              ))}
            </div>

            <div className="mx-5 my-2 border-t border-[#003933]/10" />

            {/* Categories */}
            <div className="px-4 py-2">
              <div className="text-[9px] font-bold text-[#003933]/55 uppercase tracking-[0.22em] px-4 mb-2">Top Categories</div>
              <div className="grid grid-cols-2 gap-1.5 px-2">
                {CATS.slice(0, 8).map((c) => (
                  <Link key={c.label} href={c.href} onClick={() => setMenuOpen(false)} className="group flex items-center gap-2 py-2 px-3 rounded-xl text-[12px] font-semibold text-[#003933]/70 hover:bg-[#003933]/8 hover:text-[#003933] transition-all">
                    <c.icon className="w-3.5 h-3.5 text-[#003933]/45 group-hover:text-[#003933]" />{c.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mx-5 my-2 border-t border-[#003933]/10" />

            {/* Account + Currency */}
            <div className="px-4 py-2 space-y-1">
              <button onClick={() => { setLoginOpen(true); setMenuOpen(false); }} className="flex items-center gap-3 w-full h-11 px-4 text-[13px] font-semibold text-[#003933]/80 rounded-xl hover:bg-[#003933]/8 hover:text-[#003933] transition-all">
                <div className="h-7 w-7 rounded-lg bg-[#003933]/10 flex items-center justify-center"><User className="h-3.5 w-3.5 text-[#003933]" /></div>Sign in
              </button>
              <div className="flex items-center gap-3 px-4 h-11">
                <div className="h-7 w-7 rounded-lg bg-[#003933]/10 flex items-center justify-center"><Globe className="h-3.5 w-3.5 text-[#003933]" /></div>
                <CurrencySelector />
              </div>
            </div>

            <div className="flex-1" />

            {/* Footer CTA */}
            <div className="p-5 space-y-3 bg-[#f9f8eb] border-t border-[#003933]/10">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="group flex items-center justify-center gap-2 h-12 w-full bg-gradient-to-br from-[#003933] to-black text-[#fffef1] text-[13px] font-semibold rounded-full shadow-lg shadow-[#003933]/25 transition-all active:scale-[0.98]">
                Request a Quote <ArrowUpRight className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
              <a href="mailto:Exencolimited@gmail.com" className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#003933]/70 hover:text-[#003933] transition-colors">
                <Mail className="h-3 w-3" />Exencolimited@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
