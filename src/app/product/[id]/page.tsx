"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, Shield, RotateCcw, Loader2, Package, Mail, ArrowUpRight, Share2, Lock, Sparkles, Globe } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Product { _id: string; title: string; price: number; description: string; images: string[]; features?: string[]; wilkyart_category: string; main_category?: string; }

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<"desc" | "feat">("desc");

  useEffect(() => {
    setProduct(null); setRelated([]); setImg(0); setQty(1); setAdded(false); setTab("desc");
    const load = async () => {
      setLoading(true);
      try { const res = await fetch(`/api/products/${id}`, { cache: "no-store" }); const d = await res.json(); setProduct(d.product); setRelated(d.relatedProducts || []); }
      catch (e) { console.error("Failed:", e); } finally { setLoading(false); }
    };
    if (id) load();
  }, [id]);

  const add = () => {
    if (!product) return;
    addToCart({ id: product._id, title: product.title, price: product.price, thumbnail: product.images?.[0] || "/placeholder.jpg", images: product.images });
    setAdded(true); setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fffef1]"><Loader2 className="w-6 h-6 text-[#003933] animate-spin" /></div>;

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#fffef1] px-5">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border border-[#003933]/15" />
        <div className="absolute inset-2 rounded-full border border-dashed border-[#003933]/20" />
        <div className="absolute inset-0 flex items-center justify-center"><Package className="w-8 h-8 text-[#003933]/35" /></div>
      </div>
      <div className="text-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-2">§ 404 · Missing Entry</div>
        <p className="text-2xl font-semibold text-[#0a0a0a] tracking-tight">Product not <span className="italic font-serif text-[#003933] font-medium">found</span>.</p>
      </div>
      <Button asChild className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] rounded-full text-[12px] h-11 px-6 font-semibold shadow-lg shadow-[#003933]/25"><Link href="/shop" className="flex items-center gap-2"><ChevronLeft className="w-3.5 h-3.5" />Back to Catalog</Link></Button>
    </div>
  );

  const imgs = product.images || ["/placeholder.jpg"];
  const hasFeat = product.features && product.features.length > 0;

  return (
    <div className="min-h-screen bg-[#fffef1]">
      <style dangerouslySetInnerHTML={{ __html: `.no-sb::-webkit-scrollbar{display:none}.no-sb{-ms-overflow-style:none;scrollbar-width:none}` }} />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden border-b border-[#003933]/10">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-8 lg:pt-12 pb-12 lg:pb-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-[11px] font-semibold">
            <Link href="/shop" className="text-[#003933]/55 hover:text-[#003933] transition-colors">Catalog</Link>
            <ChevronRight className="w-3 h-3 text-[#003933]/30" />
            <Link href={`/shop?category=${encodeURIComponent(product.wilkyart_category)}`} className="text-[#003933] hover:text-[#0A7060] transition-colors">{product.wilkyart_category}</Link>
            <ChevronRight className="w-3 h-3 text-[#003933]/30" />
            <span className="text-[#003933]/45 line-clamp-1">{product.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">

            {/* ── Gallery ── */}
            <div className="space-y-3">
              <div className="relative bg-white rounded-3xl overflow-hidden group border border-[#003933]/10 shadow-sm">
                <div className="aspect-square relative">
                  <Image src={imgs[img] || "/placeholder.jpg"} alt={product.title} fill className="object-contain p-10 lg:p-14" unoptimized />
                </div>
                {imgs.length > 1 && <>
                  <button onClick={() => setImg(p => (p - 1 + imgs.length) % imgs.length)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#fffef1] border border-[#003933]/15 rounded-full shadow-md flex items-center justify-center text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] opacity-0 group-hover:opacity-100 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => setImg(p => (p + 1) % imgs.length)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#fffef1] border border-[#003933]/15 rounded-full shadow-md flex items-center justify-center text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] opacity-0 group-hover:opacity-100 transition-all"><ChevronRight className="w-4 h-4" /></button>
                </>}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button aria-label="Favorite" className="w-9 h-9 bg-[#fffef1]/95 backdrop-blur-sm border border-[#003933]/15 rounded-full flex items-center justify-center text-[#003933]/55 hover:text-[#003933] shadow-sm transition-colors"><Heart className="h-4 w-4" /></button>
                  <button aria-label="Share" className="w-9 h-9 bg-[#fffef1]/95 backdrop-blur-sm border border-[#003933]/15 rounded-full flex items-center justify-center text-[#003933]/55 hover:text-[#003933] shadow-sm transition-colors"><Share2 className="h-4 w-4" /></button>
                </div>
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#fffef1] bg-[#003933] px-2.5 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-[#0A7060] animate-pulse" />In Stock</span>
              </div>

              {imgs.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-sb">
                  {imgs.map((im, i) => (
                    <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden transition-all ${img === i ? "ring-2 ring-[#003933] ring-offset-2 ring-offset-[#fffef1]" : "opacity-50 hover:opacity-90 border border-[#003933]/10"}`}>
                      <Image src={im} alt="" fill className="object-contain p-1.5 bg-white !relative" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info ── */}
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-3">§ {product.wilkyart_category}</div>
              <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold text-[#0a0a0a] leading-[1.1] tracking-[-0.02em] mb-5">{product.title}</h1>

              {/* Price block */}
              <div className="relative bg-black text-[#fffef1] rounded-2xl px-6 py-5 mb-5 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,#003933_0%,transparent_70%)] opacity-70 blur-2xl" />
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#0A7060] mb-1">Wholesale price</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[32px] font-bold tracking-tight leading-none">{formatPrice(product.price)}</span>
                    </div>
                    <div className="text-[10px] text-[#fffef1]/50 mt-1 font-medium">excl. VAT · VND · EUR · USD available</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A7060] to-[#003933] flex items-center justify-center"><Package className="w-5 h-5 text-[#fffef1]" /></div>
                </div>
              </div>

              {/* Qty + Add */}
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex items-center h-12 bg-[#003933] rounded-full flex-shrink-0">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease" className="w-11 h-12 flex items-center justify-center text-[#fffef1]/60 hover:text-[#fffef1] transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="w-7 text-center text-[14px] font-bold text-[#fffef1]">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} aria-label="Increase" className="w-11 h-12 flex items-center justify-center text-[#fffef1]/60 hover:text-[#fffef1] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <Button onClick={add} className={`group flex-1 h-12 rounded-full text-[13px] font-semibold transition-all duration-300 ${added ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25" : "bg-gradient-to-br from-[#003933] to-black text-[#fffef1] shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/45 hover:-translate-y-0.5"}`}>
                  {added ? <span className="flex items-center gap-2"><Check className="w-4 h-4" />Added to cart</span> : <span className="flex items-center gap-2"><ShoppingCart className="w-4 h-4" />Add · {formatPrice(product.price * qty)}</span>}
                </Button>
              </div>

              {/* Trust grid */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  { icon: Truck, label: "Worldwide Shipping", sub: "Vietnam → EU → Global" },
                  { icon: Shield, label: "Manufacturer Warranty", sub: "Genuine factory stock" },
                  { icon: Globe, label: "Multi-Currency", sub: "VND · EUR · USD" },
                  { icon: Lock, label: "Secure Checkout", sub: "Encrypted end-to-end" },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-[#003933]/10">
                    <div className="w-7 h-7 rounded-lg bg-[#003933]/8 flex items-center justify-center flex-shrink-0"><t.icon className="w-3.5 h-3.5 text-[#003933]" /></div>
                    <div className="min-w-0"><p className="text-[11px] font-semibold text-[#0a0a0a] leading-none">{t.label}</p><p className="text-[9.5px] text-[#003933]/55 mt-1">{t.sub}</p></div>
                  </div>
                ))}
              </div>

              {/* Bulk quote CTA */}
              <a href="mailto:Exencolimited@gmail.com" className="group flex items-center gap-3 bg-gradient-to-br from-[#003933] to-black rounded-2xl p-4 hover:shadow-xl hover:shadow-[#003933]/35 hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#fffef1]/10 border border-[#fffef1]/15 flex items-center justify-center flex-shrink-0"><Mail className="w-4 h-4 text-[#0A7060]" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#fffef1]/55">Bulk / Wholesale</p>
                  <p className="text-[13px] font-semibold text-[#fffef1]">Need volume pricing? Email us</p>
                  <p className="text-[10px] text-[#fffef1]/45 mt-0.5">Exencolimited@gmail.com · 24h reply</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#fffef1]/60 group-hover:text-[#fffef1] group-hover:rotate-45 transition-all duration-300 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Description / Features ══ */}
      <section className="relative border-b border-[#003933]/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 lg:py-16">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-3">§ Product Details</div>
          <h2 className="text-2xl lg:text-[32px] font-semibold text-[#0a0a0a] tracking-tight mb-6">About this <span className="italic font-serif text-[#003933] font-medium">item</span></h2>

          <div className="inline-flex items-center gap-1 bg-[#003933]/8 rounded-full p-1 mb-7">
            <button onClick={() => setTab("desc")} className={`px-5 py-2 rounded-full text-[11.5px] font-semibold transition-all ${tab === "desc" ? "bg-[#003933] text-[#fffef1]" : "text-[#003933]/65 hover:text-[#003933]"}`}>Description</button>
            {hasFeat && <button onClick={() => setTab("feat")} className={`px-5 py-2 rounded-full text-[11.5px] font-semibold transition-all flex items-center gap-1.5 ${tab === "feat" ? "bg-[#003933] text-[#fffef1]" : "text-[#003933]/65 hover:text-[#003933]"}`}>Features <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${tab === "feat" ? "bg-[#fffef1]/15 text-[#fffef1]" : "bg-[#003933]/10 text-[#003933]"}`}>{product.features?.length}</span></button>}
          </div>

          {tab === "desc" && <p className="text-[14px] lg:text-[15px] text-[#0a0a0a]/70 leading-[1.8] max-w-3xl">{product.description}</p>}

          {tab === "feat" && hasFeat && (
            <div className="grid sm:grid-cols-2 gap-2.5 max-w-3xl">
              {product.features?.map((f, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-[#003933]/10 rounded-xl px-4 py-3">
                  <div className="w-5 h-5 rounded-full bg-[#003933] flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-2.5 h-2.5 text-[#fffef1]" /></div>
                  <span className="text-[12.5px] text-[#0a0a0a]/75 leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ Related ══ */}
      {related.length > 0 && (
        <section className="relative">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 lg:py-16">
            <div className="flex items-end justify-between mb-8 pb-5 border-b border-[#003933]/15">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-2">§ Related Stock</div>
                <h2 className="text-2xl lg:text-[30px] font-semibold text-[#0a0a0a] tracking-tight">You might also <span className="italic font-serif text-[#003933] font-medium">need</span></h2>
              </div>
              <Link href={`/shop?category=${encodeURIComponent(product.wilkyart_category)}`} className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#003933] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-colors">View all {product.wilkyart_category}s <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" /></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.slice(0, 4).map(item => (
                <Link key={item._id} href={`/product/${item._id}`} className="group bg-white rounded-2xl border border-[#003933]/10 overflow-hidden hover:border-[#003933]/35 hover:shadow-xl hover:shadow-[#003933]/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-square bg-[#fffef1] m-2 rounded-xl overflow-hidden">
                    <Image src={item.images?.[0] || "/placeholder.jpg"} alt={item.title} fill className="object-contain p-5 group-hover:scale-105 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="px-3.5 pb-3.5">
                    <span className="inline-flex text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1.5 bg-[#003933]/8 text-[#003933]">{item.wilkyart_category}</span>
                    <h3 className="text-[12px] font-semibold text-[#0a0a0a] line-clamp-2 leading-snug group-hover:text-[#003933] transition-colors mb-2">{item.title}</h3>
                    <span className="text-[13px] font-bold text-[#003933]">{formatPrice(item.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Mobile sticky bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black text-[#fffef1] px-4 py-3 border-t border-[#003933]/30 safe-area-pb shadow-2xl shadow-[#003933]/30">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[9.5px] text-[#fffef1]/50 truncate uppercase tracking-wider font-semibold">{product.wilkyart_category}</p>
            <p className="text-[18px] font-bold tracking-tight leading-none mt-0.5">{formatPrice(product.price * qty)}</p>
          </div>
          <Button onClick={add} className={`h-11 px-6 rounded-full text-[12px] font-semibold flex-shrink-0 transition-all ${added ? "bg-emerald-600" : "bg-gradient-to-br from-[#0A7060] to-[#003933] text-[#fffef1] shadow-lg shadow-[#003933]/40"}`}>
            {added ? <Check className="w-4 h-4" /> : <><ShoppingCart className="w-4 h-4 mr-1.5" />Add</>}
          </Button>
        </div>
      </div>
      <div className="lg:hidden h-16" />
    </div>
  );
}
