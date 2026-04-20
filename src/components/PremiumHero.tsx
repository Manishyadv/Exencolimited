'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Mail, MapPin, Laptop, Monitor, Server, Router, Network, Cpu, HardDrive, Webcam, Wifi, Cable, Tv, Keyboard, Shield, Truck, Globe, Package, Sparkles, ChevronRight } from 'lucide-react';

const CATS = [
  { icon: Laptop, name: 'Laptops' }, { icon: Monitor, name: 'Monitors' }, { icon: Cpu, name: 'Video Cards' },
  { icon: HardDrive, name: 'Desktops' }, { icon: Router, name: 'Routers' }, { icon: Network, name: 'Switches' },
  { icon: Server, name: 'Servers' }, { icon: Keyboard, name: 'Keyboards' }, { icon: Webcam, name: 'Webcams' },
  { icon: Wifi, name: 'Access Points' }, { icon: Cable, name: 'Cables' }, { icon: Tv, name: 'Displays' },
];

const INDEX = [
  { n: '01', title: 'Computing', sub: 'Laptops · Desktops · Workstations · GPUs · Keyboards', icon: Laptop },
  { n: '02', title: 'Networking', sub: 'Routers · Managed Switches · Access Points · Cabling', icon: Network },
  { n: '03', title: 'Servers & Power', sub: 'Rack · Tower · Blade · UPS · Infrastructure', icon: Server },
  { n: '04', title: 'Display & Peripherals', sub: 'Monitors · TVs · Projectors · Webcams · VoIP', icon: Monitor },
];

const CURRENCIES = [{ c: 'VND', s: '₫' }, { c: 'EUR', s: '€' }, { c: 'USD', s: '$' }];
const TRUST = [{ icon: Truck, l: 'Worldwide Shipping' }, { icon: Shield, l: 'Manufacturer Warranty' }, { icon: Globe, l: 'Vietnam · EU · Worldwide' }, { icon: Package, l: 'B2B Wholesale' }, { icon: Sparkles, l: 'Multi-Currency Trade' }];
const ORB_ICONS = [Laptop, Server, Router, Monitor, Network];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };

export default function PremiumHero() {
  const [fx, setFx] = useState(0);
  const [cur, setCur] = useState(0);
  useEffect(() => { const i = setInterval(() => setFx(p => (p + 1) % ORB_ICONS.length), 2400); return () => clearInterval(i); }, []);

  return (
    <div className="relative bg-[#fffef1] text-[#0a0a0a] overflow-hidden">
      {/* ═════════════ HERO ═════════════ */}
      <section className="relative overflow-hidden">
        {/* Ambient shader field */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="exen-blob-a absolute top-0 -right-40 w-[720px] h-[720px] rounded-full opacity-40 blur-3xl" />
          <div className="exen-blob-b absolute bottom-0 -left-40 w-[560px] h-[560px] rounded-full opacity-30 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute inset-0 opacity-[0.025] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-8 lg:pt-20 pb-6 lg:pb-10">
          {/* ── Top meta strip ── */}
          <motion.div {...fadeUp} className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-5 border-b border-[#003933]/15">
            <div className="inline-flex items-center gap-3">
              <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-[#003933] animate-ping opacity-70" /><span className="relative rounded-full w-2 h-2 bg-[#003933]" /></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]">Exen Co Limited · Vietnam · ICT (UTC+7)</span>
            </div>
            <div className="inline-flex items-center gap-1 bg-[#003933] rounded-full p-1">
              {CURRENCIES.map((cu, i) => (
                <button key={cu.c} onClick={() => setCur(i)} className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full transition-colors ${cur === i ? 'bg-[#fffef1] text-[#003933]' : 'text-[#fffef1]/60 hover:text-[#fffef1]'}`}>{cu.s} {cu.c}</button>
              ))}
            </div>
          </motion.div>

          {/* ── Main editorial split ── */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left column */}
            <div className="lg:col-span-7 min-w-0">
              <motion.div {...fadeUp} className="inline-flex items-center gap-2 mb-4 sm:mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003933]">
                <Sparkles className="w-3 h-3" /><span>B2B Electronics · Wholesale · Vietnam</span>
              </motion.div>

              <motion.h1 {...fadeUp} transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }} className="text-[26px] sm:text-5xl lg:text-[62px] font-semibold leading-[1.02] sm:leading-[1] tracking-[-0.025em] mb-4 sm:mb-6">
                <span className="block">Wholesale electronics,</span>
                <span className="block">sourced from <span className="relative inline-block align-baseline">
                  <span className="relative z-10 italic font-serif text-[#003933] font-medium">Vietnam</span>
                  <span className="absolute bottom-0.5 sm:bottom-1 left-0 right-0 h-2.5 sm:h-3 bg-[#003933]/10 -z-0 rounded-sm" />
                </span>.</span>
                <span className="block text-[#003933]/30">Delivered worldwide.</span>
              </motion.h1>

              <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.12 }} className="max-w-lg text-[13.5px] sm:text-[15px] text-[#0a0a0a]/65 leading-relaxed mb-5 sm:mb-7">
                B2B supplier of laptops, servers, networking & enterprise electronics — serving <span className="text-[#003933] font-semibold">Vietnam, the EU & international markets</span>. Tri-currency, manufacturer-backed, bulk-ready.
              </motion.p>

              <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-10">
                <Button asChild className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] h-11 px-6 rounded-full text-[13px] font-semibold shadow-lg shadow-[#003933]/20 hover:shadow-[#003933]/35 hover:-translate-y-0.5 transition-all">
                  <Link href="/contact" className="flex items-center gap-2">Request a Quote <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" /></Link>
                </Button>
                <Button asChild variant="outline" className="h-11 px-6 rounded-full text-[13px] font-semibold border border-[#003933]/25 bg-transparent text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933] transition-all">
                  <Link href="/shop" className="flex items-center gap-2">Browse Catalog <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <a href="mailto:Exencolimited@gmail.com" className="group hidden md:inline-flex items-center gap-2 text-xs font-semibold text-[#003933] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-colors ml-1"><Mail className="w-3.5 h-3.5" /> Exencolimited@gmail.com</a>
              </motion.div>

              {/* Heritage rule + marquee */}
              <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.28 }} className="border-t border-[#003933]/15 pt-4 sm:pt-5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55">Live Stock · Shop by Category</span>
                  <Link href="/shop" className="group text-[10px] font-bold uppercase tracking-wider text-[#003933] inline-flex items-center gap-1 hover:gap-2 transition-all">View all <ChevronRight className="w-3 h-3" /></Link>
                </div>
                <div className="exen-marquee relative overflow-hidden">
                  <div className="flex gap-2 exen-marquee-track">
                    {[...CATS, ...CATS].map((c, i) => (
                      <Link key={i} href={`/shop?category=${encodeURIComponent(c.name)}`} className="group shrink-0 inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-[#003933]/15 hover:border-[#003933] hover:bg-[#003933] rounded-full pl-2 pr-4 py-1.5 transition-all">
                        <div className="w-7 h-7 rounded-full bg-[#fffef1] group-hover:bg-[#fffef1]/15 flex items-center justify-center transition-colors"><c.icon className="w-3.5 h-3.5 text-[#003933] group-hover:text-[#fffef1] transition-colors" /></div>
                        <span className="text-[11px] font-bold text-[#003933] group-hover:text-[#fffef1] whitespace-nowrap transition-colors">{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column — catalog orb */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5 w-full min-w-0">
              <div className="relative">
                <div className="relative aspect-square sm:aspect-[5/6] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#003933] via-[#005C4F] to-black shadow-2xl shadow-[#003933]/35">
                  <div className="exen-mesh absolute inset-0 opacity-60" />
                  <div className="exen-halo-a absolute -top-1/3 -right-1/4 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full opacity-70 blur-2xl" />
                  <div className="absolute -bottom-1/4 -left-1/4 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full opacity-[0.07] blur-3xl bg-[radial-gradient(circle,#fffef1_0%,transparent_70%)]" />
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="absolute inset-0 opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E\")" }} />

                  <div className="relative h-full flex flex-col justify-between p-5 sm:p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#fffef1]/50 mb-1">Live Inventory</div>
                        <div className="text-[#fffef1] text-[11px] sm:text-xs font-semibold">Updated · Q2 2026</div>
                      </div>
                      <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#fffef1]/25 flex items-center justify-center">
                        <div className="absolute inset-1 rounded-full border border-[#fffef1]/15" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#fffef1] animate-pulse" />
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center py-3 sm:py-4">
                      <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-[#fffef1]/10 animate-[exen-spin_38s_linear_infinite]" />
                      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-[#fffef1]/15 animate-[exen-spin_28s_linear_infinite_reverse]" />
                      <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-dashed border-[#fffef1]/15" />
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#fffef1]/8 backdrop-blur-xl border border-[#fffef1]/25 flex items-center justify-center shadow-2xl">
                        {ORB_ICONS.map((I, i) => (
                          <I key={i} className={`absolute w-10 h-10 sm:w-11 sm:h-11 text-[#fffef1] transition-all duration-700 ${fx === i ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-2.5">
                      {[{ v: '12+', l: 'Categories' }, { v: '3', l: 'VND · EUR · USD' }, { v: '24h', l: 'Quote Response' }].map((s, i) => (
                        <div key={i} className={`flex items-baseline justify-between ${i < 2 ? 'border-b border-[#fffef1]/15 pb-1.5 sm:pb-2' : ''}`}>
                          <span className="text-[#fffef1] font-serif italic text-xl sm:text-2xl leading-none">{s.v}</span>
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#fffef1]/55 font-semibold">{s.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <a href="mailto:Exencolimited@gmail.com" className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-[#fffef1] border border-[#003933]/20 rounded-2xl p-2.5 sm:p-3.5 shadow-xl shadow-[#003933]/15 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 sm:gap-3 max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#003933] to-black flex items-center justify-center shrink-0"><Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fffef1]" /></div>
                  <div className="min-w-0">
                    <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#003933]/55">Inquiries</div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#003933] truncate">Exencolimited@gmail.com</div>
                  </div>
                </a>
                <div className="absolute -top-3 sm:-top-4 -right-2 sm:-right-5 bg-black text-[#fffef1] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl flex items-center gap-2 sm:gap-2.5">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A7060]" />
                  <div>
                    <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#fffef1]/50">Hanoi · HQ</div>
                    <div className="text-[11px] sm:text-xs font-bold">Serving Worldwide</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Trust ticker ── */}
        <div className="relative border-t border-[#003933]/15 bg-[#f9f8eb]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {TRUST.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-[#003933]/75"><t.icon className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider">{t.l}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ CATALOG INDEX ═════════════ */}
      <section className="relative bg-black text-[#fffef1] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="exen-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[960px] h-[440px] rounded-full opacity-55 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-6 mb-10 pb-5 border-b border-[#fffef1]/15">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0A7060] mb-3">Product Range · Shop by Category</div>
              <h2 className="text-3xl lg:text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] max-w-2xl">
                A complete <span className="italic font-serif text-[#0A7060]">technology</span> supply chain — shipped worldwide.
              </h2>
            </div>
            <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-bold border-b-2 border-[#fffef1]/30 hover:border-[#fffef1] pb-1 transition-colors">Open full catalog <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" /></Link>
          </motion.div>

          <div className="grid md:grid-cols-2 border-t border-[#fffef1]/10">
            {INDEX.map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} className={`border-b border-[#fffef1]/10 ${i % 2 === 0 ? 'md:border-r md:border-[#fffef1]/10' : ''}`}>
                <Link href="/shop" className="group relative flex items-start gap-5 p-7 lg:p-8 hover:bg-[#003933]/25 transition-colors">
                  <span className="font-serif italic text-[#0A7060] text-xl w-9 shrink-0 mt-1">{f.n}</span>
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-semibold mb-1.5 tracking-tight">{f.title}</h3>
                    <p className="text-[13px] text-[#fffef1]/55 leading-relaxed">{f.sub}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#fffef1]/20 flex items-center justify-center group-hover:bg-[#fffef1] group-hover:border-[#fffef1] group-hover:rotate-[360deg] transition-all duration-500 shrink-0"><f.icon className="w-4 h-4 text-[#fffef1] group-hover:text-[#003933] transition-colors" /></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ CTA ═════════════ */}
      <section className="relative bg-[#fffef1] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="exen-blob-a absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] rounded-full opacity-[0.14] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <motion.div {...fadeUp} className="relative max-w-4xl mx-auto px-5 md:px-8 py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-3 mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#003933]">
            <div className="w-8 h-px bg-[#003933]" /><span>Request a Quote</span><div className="w-8 h-px bg-[#003933]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.025em] mb-6">
            Ready to source your next shipment?<br /><span className="italic font-serif text-[#003933] font-medium">We price in VND, EUR & USD.</span>
          </h2>
          <p className="max-w-xl mx-auto text-[15px] text-[#0a0a0a]/60 leading-relaxed mb-10">
            Volume pricing, manufacturer warranty, and worldwide logistics. Share your requirement — we respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] h-12 px-8 rounded-full text-sm font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all">
              <Link href="/contact" className="flex items-center gap-2">Request a Quote <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" /></Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 rounded-full text-sm font-semibold border border-[#003933]/25 bg-transparent text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933] transition-all">
              <Link href="/shop">Browse Catalog</Link>
            </Button>
          </div>
          <a href="mailto:Exencolimited@gmail.com" className="inline-flex items-center gap-2 text-xs font-semibold text-[#003933] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-colors"><Mail className="w-3.5 h-3.5" /> Or email Exencolimited@gmail.com directly</a>
        </motion.div>
      </section>

      {/* ── Keyframes & shader defs ── */}
      <style>{`
        @keyframes exen-spin { to { transform: rotate(360deg); } }
        @keyframes exen-drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.12); } }
        @keyframes exen-drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,20px) scale(1.15); } }
        @keyframes exen-mesh { 0%,100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.25); } }
        @keyframes exen-halo { 0%,100% { transform: translate(0,0) scale(1); opacity: 0.7; } 50% { transform: translate(-40px,30px) scale(1.1); opacity: 0.5; } }
        @keyframes exen-glow { 0%,100% { opacity: 0.45; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 0.65; transform: translate(-50%,-50%) scale(1.1); } }
        @keyframes exen-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .exen-blob-a { background: conic-gradient(from 0deg,#003933,#005C4F,#0A7060,#003933); animation: exen-drift-a 22s ease-in-out infinite; }
        .exen-blob-b { background: radial-gradient(circle,#003933 0%,transparent 70%); animation: exen-drift-b 26s ease-in-out infinite; }
        .exen-mesh { background: conic-gradient(from 90deg at 30% 40%,transparent,#0A7060,transparent,#003933,transparent,#005C4F,transparent); animation: exen-mesh 20s ease-in-out infinite; }
        .exen-halo-a { background: radial-gradient(circle,#0A7060 0%,transparent 60%); animation: exen-halo 18s ease-in-out infinite; }
        .exen-glow { background: radial-gradient(ellipse,#003933 0%,transparent 70%); animation: exen-glow 14s ease-in-out infinite; }
        .exen-marquee { mask-image: linear-gradient(to right,transparent,#000 8%,#000 92%,transparent); -webkit-mask-image: linear-gradient(to right,transparent,#000 8%,#000 92%,transparent); }
        .exen-marquee-track { animation: exen-marquee 48s linear infinite; width: max-content; }
        .exen-marquee:hover .exen-marquee-track { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
