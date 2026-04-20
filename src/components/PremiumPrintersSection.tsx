"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowUpRight, Mail, Truck, Shield, Globe, Package, ChevronRight, Sparkles, HardDrive, Network, Zap, Wifi, Webcam } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import toast from "react-hot-toast";

interface Product { _id: string; title: string; price: number; images: string[]; wilkyart_category: string; description?: string; }

const CATS = [
  { name: "Desktop", label: "Desktops", icon: HardDrive },
  { name: "Network Switch", label: "Switches", icon: Network },
  { name: "UPS", label: "UPS & Power", icon: Zap },
  { name: "Access Point", label: "Access Points", icon: Wifi },
  { name: "Webcam", label: "Webcams", icon: Webcam },
];

const VALUES = [
  { icon: Truck, t: "Worldwide Shipping", d: "From Vietnam to EU & international markets" },
  { icon: Shield, t: "Manufacturer Warranty", d: "Genuine stock, full factory coverage" },
  { icon: Globe, t: "Multi-Currency", d: "Settle in VND, EUR, or USD" },
  { icon: Package, t: "B2B Wholesale", d: "Tiered volume pricing on bulk orders" },
];

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    (async () => {
      try {
        const r: Record<string, Product[]> = {};
        await Promise.all(CATS.map(async (c) => { const res = await fetch(`/api/products?category=${encodeURIComponent(c.name)}&limit=4`); const d = await res.json(); r[c.name] = d.products || []; }));
        setProducts(r);
      } catch (e) { console.error("Fetch failed:", e); } finally { setLoading(false); }
    })();
  }, []);

  const add = (p: Product) => {
    addToCart({ id: p._id, title: p.title, price: p.price, thumbnail: p.images?.[0] || "/placeholder.jpg", images: p.images });
    toast.success("Added to cart", { style: { background: "#003933", color: "#fffef1", fontWeight: "600", borderRadius: "12px" } });
  };

  const cat = CATS[tab];
  const items = products[cat.name] || [];

  return (
    <div className="bg-[#fffef1]">
      {/* ═══ Featured Products ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          {/* Header */}
          <motion.div {...fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 pb-5 border-b border-[#003933]/15">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003933]">
                <Sparkles className="w-3 h-3" /><span>Featured Stock · Ready to Ship</span>
              </div>
              <h2 className="text-3xl lg:text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0a0a0a] max-w-2xl">
                Hand-picked electronics for <span className="italic font-serif text-[#003933] font-medium">business buyers</span>.
              </h2>
              <p className="text-[14px] text-[#0a0a0a]/55 mt-3 max-w-md">Genuine, warranty-backed stock across computing, networking, power & peripherals.</p>
            </div>
            <Button asChild variant="outline" className="self-start sm:self-auto h-10 px-5 rounded-full text-xs font-semibold border border-[#003933]/25 bg-transparent text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933] transition-all">
              <Link href="/shop" className="flex items-center gap-1.5">View all products <ArrowUpRight className="w-3.5 h-3.5" /></Link>
            </Button>
          </motion.div>

          {/* Tabs */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.08 }} className="flex flex-wrap gap-2 mb-10">
            {CATS.map((c, i) => (
              <button key={c.name} onClick={() => setTab(i)} className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-semibold transition-all ${i === tab ? "bg-[#003933] text-[#fffef1] shadow-md shadow-[#003933]/20" : "bg-white border border-[#003933]/15 text-[#003933]/70 hover:border-[#003933] hover:text-[#003933]"}`}>
                <c.icon className="w-3.5 h-3.5" />{c.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse rounded-2xl bg-white p-3 border border-[#003933]/10"><div className="aspect-square bg-[#f9f8eb] rounded-xl mb-3" /><div className="h-3 bg-[#f9f8eb] rounded w-3/4 mb-2" /><div className="h-3 bg-[#f9f8eb] rounded w-1/2" /></div>)}
            </div>
          ) : items.length > 0 ? (
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.12 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {items.slice(0, 4).map((p, i) => (
                <div key={p._id} className="group bg-white rounded-2xl overflow-hidden border border-[#003933]/10 hover:border-[#003933]/40 hover:shadow-xl hover:shadow-[#003933]/10 hover:-translate-y-1 transition-all duration-300">
                  <Link href={`/product/${p._id}`}>
                    <div className="relative aspect-square bg-[#fffef1] m-2 rounded-xl overflow-hidden">
                      {i === 0 && <span className="absolute top-2 left-2 z-10 bg-[#003933] text-[#fffef1] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Top Pick</span>}
                      <Image src={p.images?.[0] || "/placeholder.jpg"} alt={p.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" unoptimized />
                    </div>
                  </Link>
                  <div className="px-3.5 pb-3.5 pt-1.5">
                    <span className="inline-flex text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1.5 bg-[#003933]/8 text-[#003933]">{p.wilkyart_category}</span>
                    <Link href={`/product/${p._id}`}><h3 className="text-[13px] font-semibold text-[#0a0a0a] line-clamp-2 leading-snug mb-2.5 group-hover:text-[#003933] transition-colors">{p.title}</h3></Link>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#003933]">{formatPrice(p.price)}</span>
                      <button onClick={() => add(p)} aria-label="Add to cart" className="w-8 h-8 rounded-lg bg-[#003933] hover:bg-black flex items-center justify-center transition-colors"><ShoppingCart className="w-3.5 h-3.5 text-[#fffef1]" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-sm text-[#003933]/50">No products found in this category.</div>
          )}

          <div className="text-center mt-8">
            <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#003933] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-colors">See all {cat.label} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></Link>
          </div>
        </div>
      </section>

      {/* ═══ Value Strip ═══ */}
      <section className="relative bg-black text-[#fffef1] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-50 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-14 lg:py-16">
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {VALUES.map((v, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003933]/25 border border-[#fffef1]/10 flex items-center justify-center flex-shrink-0"><v.icon className="w-4 h-4 text-[#0A7060]" /></div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#fffef1] mb-1">{v.t}</h4>
                  <p className="text-[11px] text-[#fffef1]/50 leading-relaxed">{v.d}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-[#fffef1]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[380px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-[0.1] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <motion.div {...fadeUp} className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003933]">
                <div className="w-6 h-px bg-[#003933]" /><span>Bulk Orders · Wholesale Pricing</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#0a0a0a] mb-4">
                Planning a project? Request <span className="italic font-serif text-[#003933] font-medium">volume pricing</span>.
              </h2>
              <p className="text-[14px] text-[#0a0a0a]/60 mb-7 max-w-md leading-relaxed">
                Share your BOM — laptops, servers, networking, displays. We respond with a tri-currency quote within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] h-11 px-6 rounded-full text-[13px] font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all">
                  <Link href="/contact" className="flex items-center gap-2">Request a Quote <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" /></Link>
                </Button>
                <Button asChild variant="outline" className="h-11 px-6 rounded-full text-[13px] font-semibold border border-[#003933]/25 bg-transparent text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933] transition-all">
                  <Link href="/shop">Browse Catalog</Link>
                </Button>
              </div>
            </div>

            <a href="mailto:Exencolimited@gmail.com" className="lg:col-span-2 group flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#003933]/15 hover:border-[#003933]/40 hover:shadow-xl hover:shadow-[#003933]/10 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003933] to-black flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-[#fffef1]" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#003933]/55">Direct Email</div>
                <div className="text-[14px] font-bold text-[#0a0a0a] truncate">Exencolimited@gmail.com</div>
                <div className="text-[11px] text-[#0a0a0a]/50 mt-0.5">Response within 24 hours</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#003933] group-hover:rotate-45 transition-transform duration-300 flex-shrink-0" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
