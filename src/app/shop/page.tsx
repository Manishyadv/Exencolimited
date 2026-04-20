"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList, Loader2, ShoppingCart, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const CATEGORY_GROUPS: Record<string, string[]> = {
  'Computing': ['Laptop', 'Desktop', 'Monitor', 'Video Card'],
  'Networking': ['Router', 'Network Switch', 'Access Point', 'Cable'],
  'Infrastructure': ['Server', 'UPS', 'Webcam'],
};

const TOP_CATEGORIES = ['Laptop', 'Monitor', 'Desktop', 'Video Card', 'Server', 'Router', 'Network Switch', 'Access Point', 'UPS', 'Webcam', 'Cable'];

const CATEGORY_DESCRIPTIONS: Record<string, { title: string; accent: string; desc: string }> = {
  'Server': { title: "Servers", accent: "for data centers", desc: "Enterprise rack & tower servers, blades, and infrastructure for modern business computing." },
  'Monitor': { title: "Monitors", accent: "for professionals", desc: "Professional displays for workstations, design studios, control rooms & office setups." },
  'Laptop': { title: "Laptops", accent: "for business", desc: "Business laptops, ultrabooks & mobile workstations for professionals on the move." },
  'Desktop': { title: "Desktops", accent: "built to last", desc: "Workstations, towers & mini PCs for office and enterprise computing workloads." },
  'Video Card': { title: "Video Cards", accent: "engineered for workloads", desc: "Professional GPUs for rendering, AI, visualization and high-performance computing." },
  'Router': { title: "Routers", accent: "for secure networking", desc: "Enterprise routers & gateways for resilient, scalable business connectivity." },
  'Network Switch': { title: "Network Switches", accent: "at scale", desc: "Managed & unmanaged switches for enterprise connectivity and structured deployments." },
  'Cable': { title: "Cabling", accent: "structured & tested", desc: "Network cables, patch panels & structured cabling solutions for any environment." },
  'Webcam': { title: "Webcams", accent: "crisp & reliable", desc: "HD & 4K webcams for conferencing, streaming, security and professional use." },
  'UPS': { title: "UPS Systems", accent: "for uptime", desc: "Uninterruptible power supplies & surge protection for critical IT infrastructure." },
  'Access Point': { title: "Access Points", accent: "indoor & outdoor", desc: "Wireless access points for enterprise WiFi coverage — deployment ready." },
};

const SORTS = [{ value: 'newest', label: 'Newest' }, { value: 'price_asc', label: 'Price · Low → High' }, { value: 'price_desc', label: 'Price · High → Low' }, { value: 'title_asc', label: 'Name · A–Z' }];

interface Product { _id: string; title: string; price: number; description: string; images: string[]; wilkyart_category: string; features?: string[]; }

function ShopContent() {
  const sp = useSearchParams();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState<{ _id: string; count: number }[]>([]);
  const [pg, setPg] = useState({ page: 1, total: 0, totalPages: 1, hasMore: false });
  const [q, setQ] = useState(sp.get('search') || '');
  const [cat, setCat] = useState(sp.get('category') || 'Laptop');
  const [sort, setSort] = useState(sp.get('sort') || 'newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(Object.keys(CATEGORY_GROUPS));

  const fetch_ = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const p = new URLSearchParams(); p.set('page', page.toString()); p.set('limit', '12');
      if (cat) p.set('category', cat); if (q.trim()) p.set('search', q.trim()); if (sort) p.set('sort', sort);
      const res = await fetch(`/api/products?${p}`); const d = await res.json();
      setProducts(d.products || []); setPg(d.pagination || { page: 1, total: 0, totalPages: 1, hasMore: false }); setCats(d.categories || []);
    } catch (e) { console.error('Fetch failed:', e); } finally { setLoading(false); }
  }, [cat, q, sort]);

  useEffect(() => { fetch_(1); }, [fetch_]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); fetch_(1); };
  const selCat = (c: string) => setCat(c === cat ? '' : c);
  const toggleGrp = (g: string) => setExpanded(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g]);
  const getCount = (c: string) => cats.find(x => x._id === c)?.count || 0;
  const clear = () => { setQ(''); setCat(''); setSort('newest'); };
  const addItem = (p: Product) => addToCart({ id: p._id, title: p.title, price: p.price, thumbnail: p.images?.[0] || '/placeholder.jpg', images: p.images });

  const info = cat ? CATEGORY_DESCRIPTIONS[cat] : null;

  const Sidebar = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#003933]/15">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]">§ Catalog Filters</div>
        {cat && <button onClick={() => setCat('')} className="text-[10px] font-bold text-[#003933] uppercase tracking-wider hover:text-[#0A7060] transition-colors">Clear</button>}
      </div>
      {Object.entries(CATEGORY_GROUPS).map(([group, cs]) => (
        <div key={group} className="pb-4 border-b border-[#003933]/10 last:border-0">
          <button onClick={() => toggleGrp(group)} className="flex items-center justify-between w-full py-1 text-left group">
            <span className="text-[11px] font-bold text-[#003933]/75 uppercase tracking-[0.18em] group-hover:text-[#003933]">{group}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#003933]/50 transition-transform ${expanded.includes(group) ? 'rotate-180' : ''}`} />
          </button>
          {expanded.includes(group) && (
            <div className="mt-2 space-y-0.5">
              {cs.filter(c => getCount(c) > 0).map(c => (
                <button key={c} onClick={() => selCat(c)} className={`flex items-center justify-between w-full py-2 px-3 rounded-lg text-[12px] transition-all ${cat === c ? 'bg-[#003933] text-[#fffef1] font-semibold' : 'text-[#003933]/75 hover:bg-[#003933]/8 hover:text-[#003933]'}`}>
                  <span>{c}</span><span className={`text-[10px] ${cat === c ? 'text-[#fffef1]/70' : 'text-[#003933]/40'}`}>{getCount(c)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffef1]">
      {/* ── Header meta strip ── */}
      <div className="relative overflow-hidden bg-[#fffef1] border-b border-[#003933]/10">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-10 lg:pt-14 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#003933]/15">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]">
              <Sparkles className="w-3 h-3" /><span>Live Catalog · Exen Co Limited · Vietnam → Worldwide</span>
            </div>
            <div className="text-[11px] font-semibold text-[#003933]/60">{loading ? '…' : `${pg.total.toLocaleString()} products across ${cats.length} categories`}</div>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              {info ? (
                <>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-2">§ {cat}</div>
                  <h1 className="text-3xl lg:text-[52px] font-semibold leading-[1.02] tracking-[-0.025em] text-[#0a0a0a]">
                    {info.title} <span className="italic font-serif text-[#003933] font-medium">{info.accent}</span>.
                  </h1>
                  <p className="text-[13px] lg:text-[14px] text-[#0a0a0a]/55 leading-relaxed max-w-xl mt-3">{info.desc}</p>
                </>
              ) : (
                <>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-2">§ All Products</div>
                  <h1 className="text-3xl lg:text-[52px] font-semibold leading-[1.02] tracking-[-0.025em] text-[#0a0a0a]">
                    The complete <span className="italic font-serif text-[#003933] font-medium">catalog</span>.
                  </h1>
                  <p className="text-[13px] lg:text-[14px] text-[#0a0a0a]/55 leading-relaxed max-w-xl mt-3">Computing, networking, servers, power & peripherals — genuine, warranty-backed stock.</p>
                </>
              )}
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003933]/50" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the catalog…" className="w-full h-11 pl-11 pr-4 text-[13px] bg-white border border-[#003933]/20 rounded-full placeholder-[#003933]/40 focus:outline-none focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 transition-all" />
              </form>
              <a href="mailto:Exencolimited@gmail.com" className="group inline-flex items-center justify-center gap-2 text-[11px] font-semibold text-[#003933] border border-[#003933]/20 rounded-full h-9 px-4 hover:bg-[#003933] hover:text-[#fffef1] transition-all">Bulk quote <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky filter toolbar ── */}
      <div className="sticky top-[68px] z-40 bg-[#fffef1]/90 backdrop-blur-md border-b border-[#003933]/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-3">
            <button onClick={() => setCat('')} className={`flex-shrink-0 px-4 h-8 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${!cat ? 'bg-black text-[#fffef1]' : 'text-[#003933]/65 hover:text-[#003933] hover:bg-[#003933]/8'}`}>All</button>
            {TOP_CATEGORIES.filter(c => getCount(c) > 0 || loading).map(c => (
              <button key={c} onClick={() => selCat(c)} className={`flex-shrink-0 px-4 h-8 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${cat === c ? 'bg-[#003933] text-[#fffef1]' : 'text-[#003933]/65 hover:text-[#003933] hover:bg-[#003933]/8'}`}>{c}</button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between py-3 border-t border-[#003933]/10">
            <div className="flex items-center gap-2 flex-wrap">
              {(cat || q) && (
                <>
                  {cat && <span className="inline-flex items-center gap-1 bg-[#003933]/8 text-[#003933] text-[11px] font-semibold px-2.5 py-1 rounded-full">{cat}<button onClick={() => setCat('')} aria-label="Clear category"><X className="w-3 h-3" /></button></span>}
                  {q && <span className="inline-flex items-center gap-1 bg-[#003933]/8 text-[#003933] text-[11px] font-semibold px-2.5 py-1 rounded-full">&ldquo;{q}&rdquo;<button onClick={() => { setQ(''); fetch_(1); }} aria-label="Clear search"><X className="w-3 h-3" /></button></span>}
                  <button onClick={clear} className="text-[11px] font-bold text-[#003933] uppercase tracking-wider hover:text-[#0A7060] transition-colors">Clear</button>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-8 px-3 bg-white border border-[#003933]/20 rounded-full text-[11px] font-semibold text-[#003933] focus:outline-none focus:border-[#003933] transition-all">
                {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="hidden sm:flex items-center bg-white border border-[#003933]/20 rounded-full p-0.5">
                <button onClick={() => setView('grid')} aria-label="Grid" className={`p-1.5 rounded-full transition-all ${view === 'grid' ? 'bg-[#003933] text-[#fffef1]' : 'text-[#003933]/50'}`}><Grid3X3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => setView('list')} aria-label="List" className={`p-1.5 rounded-full transition-all ${view === 'list' ? 'bg-[#003933] text-[#fffef1]' : 'text-[#003933]/50'}`}><LayoutList className="w-3.5 h-3.5" /></button>
              </div>
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild><button className="lg:hidden h-8 px-3 bg-white border border-[#003933]/20 rounded-full text-[11px] font-semibold text-[#003933] flex items-center gap-1.5"><SlidersHorizontal className="w-3.5 h-3.5" />Filter</button></SheetTrigger>
                <SheetContent side="left" className="w-72 p-5 bg-[#fffef1]"><Sidebar /></SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 lg:py-10">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0"><div className="sticky top-[220px]"><Sidebar /></div></aside>
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-[#003933] animate-spin" /></div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative mx-auto mb-5 w-20 h-20">
                  <div className="absolute inset-0 rounded-full border border-[#003933]/15" />
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#003933]/20" />
                  <div className="absolute inset-0 flex items-center justify-center"><Package className="w-7 h-7 text-[#003933]/35" /></div>
                </div>
                <p className="text-[14px] font-semibold text-[#0a0a0a]/70 mb-1">No products matched your filters</p>
                <p className="text-[12px] text-[#0a0a0a]/45 mb-5">Try clearing the search or pick another category.</p>
                <Button onClick={clear} variant="outline" className="rounded-full text-[11px] h-9 px-5 font-semibold border border-[#003933]/25 text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933]">Clear Filters</Button>
              </div>
            ) : (
              <>
                <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-3'}>
                  {products.map((p) => view === 'grid' ? (
                    <div key={p._id} className="group bg-white rounded-2xl overflow-hidden border border-[#003933]/10 hover:border-[#003933]/40 hover:shadow-xl hover:shadow-[#003933]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                      <Link href={`/product/${p._id}`} className="block">
                        <div className="relative aspect-square bg-[#fffef1] m-2 rounded-xl overflow-hidden">
                          <Image src={p.images?.[0] || '/placeholder.jpg'} alt={p.title} fill className="object-contain p-5 group-hover:scale-105 transition-transform duration-500" unoptimized />
                        </div>
                      </Link>
                      <div className="px-3.5 pb-3.5 pt-1 flex flex-col flex-1">
                        <span className="inline-flex self-start text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 bg-[#003933]/8 text-[#003933]">{p.wilkyart_category}</span>
                        <Link href={`/product/${p._id}`}><h3 className="text-[12.5px] font-semibold text-[#0a0a0a] line-clamp-2 leading-snug group-hover:text-[#003933] transition-colors mb-3 flex-1">{p.title}</h3></Link>
                        <div className="flex items-center justify-between">
                          <div><span className="text-[13.5px] font-bold text-[#003933]">{formatPrice(p.price)}</span><span className="block text-[9px] text-[#003933]/45">excl. VAT</span></div>
                          <button onClick={() => addItem(p)} aria-label="Add to cart" className="w-9 h-9 rounded-full bg-[#003933] hover:bg-black flex items-center justify-center transition-colors"><ShoppingCart className="w-3.5 h-3.5 text-[#fffef1]" /></button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={p._id} className="group flex gap-4 p-4 bg-white rounded-2xl border border-[#003933]/10 hover:border-[#003933]/35 hover:shadow-md transition-all">
                      <Link href={`/product/${p._id}`} className="w-28 h-28 flex-shrink-0"><div className="relative h-full bg-[#fffef1] rounded-xl overflow-hidden border border-[#003933]/8"><Image src={p.images?.[0] || '/placeholder.jpg'} alt={p.title} fill className="object-contain p-3 group-hover:scale-105 transition-transform" unoptimized /></div></Link>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <span className="text-[9.5px] font-bold text-[#003933] uppercase tracking-wider">{p.wilkyart_category}</span>
                          <Link href={`/product/${p._id}`}><h3 className="text-[13px] font-semibold text-[#0a0a0a] line-clamp-2 mt-0.5 group-hover:text-[#003933] transition-colors">{p.title}</h3></Link>
                          <p className="text-[11.5px] text-[#0a0a0a]/55 line-clamp-2 mt-1.5 leading-relaxed">{p.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[14px] font-bold text-[#003933]">{formatPrice(p.price)}</span>
                          <button onClick={() => addItem(p)} className="h-8 px-4 rounded-full bg-gradient-to-br from-[#003933] to-black hover:shadow-md hover:shadow-[#003933]/30 text-[#fffef1] text-[11px] font-semibold flex items-center gap-1.5 transition-all"><ShoppingCart className="w-3 h-3" />Add</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {pg.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-12 pb-2">
                    <button onClick={() => fetch_(pg.page - 1)} disabled={pg.page === 1} className="w-9 h-9 rounded-full border border-[#003933]/20 flex items-center justify-center text-[#003933]/55 hover:border-[#003933] hover:text-[#003933] hover:bg-[#003933]/5 disabled:opacity-30 disabled:hover:border-[#003933]/20 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                    {Array.from({ length: Math.min(5, pg.totalPages) }, (_, i) => {
                      let n = i + 1; if (pg.totalPages > 5) { if (pg.page > 3) n = pg.page - 2 + i; if (pg.page > pg.totalPages - 2) n = pg.totalPages - 4 + i; }
                      return <button key={n} onClick={() => fetch_(n)} className={`w-9 h-9 rounded-full text-[12px] font-bold transition-all ${n === pg.page ? 'bg-[#003933] text-[#fffef1]' : 'text-[#003933]/65 hover:bg-[#003933]/8 hover:text-[#003933]'}`}>{n}</button>;
                    })}
                    <button onClick={() => fetch_(pg.page + 1)} disabled={pg.page === pg.totalPages} className="w-9 h-9 rounded-full border border-[#003933]/20 flex items-center justify-center text-[#003933]/55 hover:border-[#003933] hover:text-[#003933] hover:bg-[#003933]/5 disabled:opacity-30 disabled:hover:border-[#003933]/20 transition-all"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fffef1]"><Loader2 className="w-6 h-6 text-[#003933] animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  );
}
