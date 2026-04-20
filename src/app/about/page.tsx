import { Button } from "@/components/ui/button";
import { Package, Mail, MapPin, ArrowUpRight, CheckCircle, Target, Shield, Zap, Monitor, Server, Laptop, Network, Globe, ChevronRight, HardDrive, Cable, Router, Wifi, Truck, Cpu, Webcam, Sparkles, Clock, Scale } from "lucide-react";
import Link from "next/link";

const CATS = [
  { icon: Laptop, label: "Laptops", sub: "Business & Workstations" },
  { icon: Monitor, label: "Monitors", sub: "Professional Displays" },
  { icon: HardDrive, label: "Desktops", sub: "Towers & Mini PCs" },
  { icon: Cpu, label: "Video Cards", sub: "Pro GPUs & Rendering" },
  { icon: Server, label: "Servers", sub: "Rack · Tower · Blade" },
  { icon: Router, label: "Routers", sub: "Enterprise Networking" },
  { icon: Network, label: "Switches", sub: "Managed & Unmanaged" },
  { icon: Wifi, label: "Access Points", sub: "Indoor · Outdoor WiFi" },
  { icon: Cable, label: "Cabling", sub: "Cat6/7 · Patch Panels" },
  { icon: Webcam, label: "Webcams", sub: "HD & 4K · Conference" },
];

const VALUES = [
  { icon: Shield, title: "Manufacturer Warranty", desc: "Every product ships with full manufacturer coverage and verified authenticity." },
  { icon: Truck, title: "Worldwide Logistics", desc: "Delivery infrastructure spanning Vietnam, the EU, and international markets." },
  { icon: Scale, title: "Multi-Currency Trade", desc: "Settle invoices in VND, EUR, or USD — international wire transfer supported." },
  { icon: Zap, title: "Fast Fulfillment", desc: "Orders processed within 24h. Bulk orders receive priority handling." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fffef1]">
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden border-b border-[#003933]/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-20 w-[640px] h-[500px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-[0.18] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-12 lg:pt-16 pb-12 lg:pb-16">

          <div className="flex items-center gap-2 mb-8 text-[11px] font-semibold">
            <Link href="/" className="text-[#003933]/55 hover:text-[#003933] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#003933]/30" />
            <span className="text-[#003933]">About</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 space-y-5">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]">
                <Sparkles className="h-3 w-3" /><span>§ B2B Wholesale · Vietnam → Worldwide</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[58px] font-semibold text-[#0a0a0a] leading-[1] tracking-[-0.025em]">
                Electronics,<br />sourced with <span className="italic font-serif text-[#003933] font-medium">care</span>.<br />Delivered <span className="italic font-serif text-[#003933] font-medium">worldwide</span>.
              </h1>
              <p className="text-[14px] text-[#0a0a0a]/60 leading-relaxed max-w-lg">
                Exen Co Limited is a Vietnam-based B2B wholesale distributor of electronics, computers & IT infrastructure — serving business buyers across Southeast Asia, Europe & international markets.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Computing", "Networking", "Servers & Power", "Peripherals", "Display"].map((c) => <span key={c} className="text-[10px] font-semibold text-[#003933]/75 bg-[#003933]/8 border border-[#003933]/12 px-3 py-1 rounded-full">{c}</span>)}
              </div>
              <div className="flex flex-wrap gap-3 pt-3">
                <Button asChild className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] text-[12.5px] h-11 px-6 rounded-full font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all">
                  <Link href="/contact" className="flex items-center gap-2">Request a Quote <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" /></Link>
                </Button>
                <Button asChild variant="outline" className="text-[12.5px] h-11 px-6 rounded-full font-semibold border border-[#003933]/25 bg-transparent text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933]">
                  <Link href="/shop">Browse Catalog</Link>
                </Button>
              </div>
            </div>

            {/* Editorial stats orb */}
            <div className="lg:col-span-2 relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#003933] via-[#005C4F] to-black text-[#fffef1] shadow-2xl shadow-[#003933]/30 p-7">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,#0A7060_0%,transparent_70%)] opacity-60 blur-2xl" />
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#fffef1]/55 mb-1.5">§ At a Glance</div>
                    <div className="text-[#fffef1] text-xs font-semibold">Exen Co Limited</div>
                  </div>
                  <div className="space-y-2.5">
                    {[{ v: "12+", l: "Product Categories" }, { v: "3", l: "Currencies · VND EUR USD" }, { v: "24h", l: "Quote Response" }, { v: "∞", l: "Destinations" }].map((s, i) => (
                      <div key={i} className={`flex items-baseline justify-between ${i < 3 ? "border-b border-[#fffef1]/15 pb-2" : ""}`}>
                        <span className="text-[#fffef1] font-serif italic text-2xl leading-none">{s.v}</span>
                        <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#fffef1]/55 font-bold">{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#fffef1] rounded-2xl shadow-xl shadow-[#003933]/15 border border-[#003933]/15 px-4 py-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#003933] to-black flex items-center justify-center"><Package className="h-4 w-4 text-[#fffef1]" /></div>
                <div><p className="text-[11.5px] font-bold text-[#0a0a0a] leading-none">B2B Wholesale</p><p className="text-[10px] text-[#003933]/60 mt-0.5 font-semibold">Vietnam · EU · Worldwide</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Story ═══ */}
      <section className="relative border-b border-[#003933]/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center gap-2 text-[#003933] text-[10px] font-bold uppercase tracking-[0.22em]"><Target className="h-3 w-3" /><span>§ Our Story</span></div>
              <h2 className="text-[28px] lg:text-[40px] font-semibold text-[#0a0a0a] leading-[1.1] tracking-[-0.02em]">Powering <span className="italic font-serif text-[#003933] font-medium">business technology</span> across borders.</h2>
              <div className="space-y-4 text-[14px] text-[#0a0a0a]/65 leading-[1.75]">
                <p>Exen Co Limited was established in Vietnam to meet the growing global demand for reliable, competitively-priced IT hardware. We specialise in sourcing enterprise-grade laptops, servers, networking equipment, and professional electronics from trusted manufacturers worldwide.</p>
                <p>Whether you&apos;re equipping a new office in <span className="font-semibold text-[#003933]">Hanoi</span>, upgrading workstations in <span className="font-semibold text-[#003933]">Hamburg</span>, or deploying network infrastructure across <span className="font-semibold text-[#003933]">Southeast Asia</span> — we provide the equipment, pricing, and logistics support to make it happen.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 pt-3">
                <div className="bg-white rounded-2xl p-5 border border-[#003933]/12">
                  <div className="w-9 h-9 rounded-xl bg-[#003933]/10 flex items-center justify-center mb-3"><Target className="h-4 w-4 text-[#003933]" /></div>
                  <div className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-1">§ Mission</div>
                  <h3 className="text-[13px] font-semibold text-[#0a0a0a] mb-1.5">Accessible enterprise IT</h3>
                  <p className="text-[11.5px] text-[#0a0a0a]/60 leading-relaxed">Make enterprise electronics accessible to businesses of every size — with transparent wholesale pricing and dependable service.</p>
                </div>
                <div className="bg-black text-[#fffef1] rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-[radial-gradient(circle,#003933_0%,transparent_70%)] opacity-70 blur-2xl" />
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-[#0A7060]/20 border border-[#fffef1]/10 flex items-center justify-center mb-3"><CheckCircle className="h-4 w-4 text-[#0A7060]" /></div>
                    <div className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#0A7060] mb-1">§ Promise</div>
                    <h3 className="text-[13px] font-semibold mb-1.5">Genuine. Warranted. Ready.</h3>
                    <p className="text-[11.5px] text-[#fffef1]/60 leading-relaxed">Genuine products, manufacturer warranties, tri-currency settlement & support from people who understand the hardware.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#f9f8eb] rounded-2xl border border-[#003933]/12 p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-4">§ Why Exen Co</div>
                <div className="space-y-3">
                  {["Specialised in electronics & computing", "B2B wholesale-only pricing model", "Worldwide shipping · Vietnam · EU · International", "Tri-currency settlement · VND · EUR · USD", "Manufacturer-backed warranty coverage", "Dedicated account management"].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#003933] mt-2 shrink-0" />
                      <span className="text-[12px] text-[#0a0a0a]/70 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#003933]/12 p-5 space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55">§ Contact the Desk</div>
                <a href="mailto:Exencolimited@gmail.com" className="group flex items-center gap-2.5 bg-[#fffef1] border border-[#003933]/15 hover:border-[#003933]/40 rounded-xl px-3 py-2.5 transition-all">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#003933] to-black flex items-center justify-center flex-shrink-0"><Mail className="w-3 h-3 text-[#fffef1]" /></div>
                  <span className="text-[11.5px] font-semibold text-[#003933] truncate">Exencolimited@gmail.com</span>
                </a>
                <div className="flex items-center gap-2.5 px-3 py-2"><MapPin className="w-3.5 h-3.5 text-[#0A7060] flex-shrink-0" /><span className="text-[11.5px] text-[#0a0a0a]/70"><span className="font-semibold text-[#0a0a0a]">Hanoi</span> · Serving Worldwide</span></div>
                <div className="flex items-center gap-2.5 px-3 py-2"><Clock className="w-3.5 h-3.5 text-[#0A7060] flex-shrink-0" /><span className="text-[11.5px] text-[#0a0a0a]/70"><span className="font-semibold text-[#0a0a0a]">Mon–Fri</span> · 9–18 ICT</span></div>
                <Button asChild className="w-full group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] text-[12px] h-10 rounded-full font-semibold mt-2 shadow-md shadow-[#003933]/25 hover:shadow-[#003933]/40 transition-all">
                  <Link href="/contact" className="flex items-center justify-center gap-2">Request a Quote <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Categories ═══ */}
      <section className="relative border-b border-[#003933]/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 lg:py-20">
          <div className="flex items-end justify-between mb-8 pb-5 border-b border-[#003933]/15">
            <div>
              <div className="flex items-center gap-2 text-[#003933] text-[10px] font-bold uppercase tracking-[0.22em] mb-3"><Package className="h-3 w-3" /><span>§ What We Supply</span></div>
              <h2 className="text-[26px] lg:text-[36px] font-semibold text-[#0a0a0a] tracking-tight">The full <span className="italic font-serif text-[#003933] font-medium">technology</span> stack.</h2>
            </div>
            <Link href="/shop" className="group hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#003933] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-all">View catalog <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATS.map(({ icon: Icon, label, sub }) => (
              <Link key={label} href={`/shop?category=${encodeURIComponent(label.split(" ")[0])}`} className="group bg-white hover:bg-[#003933] border border-[#003933]/10 hover:border-[#003933] rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#003933]/15">
                <div className="w-9 h-9 rounded-xl bg-[#003933]/8 group-hover:bg-[#fffef1]/15 flex items-center justify-center mb-3 transition-colors"><Icon className="h-4 w-4 text-[#003933] group-hover:text-[#fffef1] transition-colors" /></div>
                <h4 className="text-[12.5px] font-semibold text-[#0a0a0a] group-hover:text-[#fffef1] leading-tight mb-0.5 transition-colors">{label}</h4>
                <p className="text-[10px] text-[#003933]/55 group-hover:text-[#fffef1]/55 transition-colors">{sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Values ═══ */}
      <section className="relative bg-black text-[#fffef1] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-50 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0A7060]">
              <Zap className="h-3 w-3" /><span>§ What Sets Us Apart</span>
            </div>
            <h2 className="text-[28px] lg:text-[44px] font-semibold leading-[1.05] tracking-tight">Built for <span className="italic font-serif text-[#0A7060] font-medium">business</span>.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-[#fffef1]/[0.04] border border-[#fffef1]/10 rounded-2xl p-5 hover:bg-[#003933]/40 hover:border-[#0A7060]/40 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#003933]/30 border border-[#fffef1]/10 group-hover:bg-[#0A7060]/30 flex items-center justify-center mb-4 transition-colors"><Icon className="h-4 w-4 text-[#0A7060]" /></div>
                <h3 className="text-[14px] font-semibold mb-2 tracking-tight">{title}</h3>
                <p className="text-[11.5px] text-[#fffef1]/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Contact CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[380px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-[0.1] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 space-y-5">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]"><Sparkles className="h-3 w-3" /><span>§ Get in Touch</span></div>
              <h2 className="text-[28px] lg:text-[40px] font-semibold text-[#0a0a0a] leading-[1.05] tracking-[-0.02em]">Ready to equip your <span className="italic font-serif text-[#003933] font-medium">business</span>?</h2>
              <p className="text-[14px] text-[#0a0a0a]/60 max-w-lg leading-relaxed">Whether you need a single server or a full infrastructure rollout — our team is ready to provide expert guidance and competitive wholesale pricing.</p>
              <div className="space-y-2.5 max-w-md">
                {[
                  { icon: Mail, label: "Email", value: "Exencolimited@gmail.com" },
                  { icon: MapPin, label: "Based In", value: "Hanoi, Vietnam · Serving Worldwide" },
                  { icon: Globe, label: "Trade In", value: "VND · EUR · USD" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 bg-white rounded-xl border border-[#003933]/12 px-4 py-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#003933]/8 flex items-center justify-center flex-shrink-0"><Icon className="h-3.5 w-3.5 text-[#003933]" /></div>
                    <div><p className="text-[9.5px] text-[#003933]/55 uppercase tracking-[0.22em] font-bold">{label}</p><p className="text-[12px] font-semibold text-[#0a0a0a] mt-0.5">{value}</p></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] text-[12.5px] h-11 px-6 rounded-full font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all">
                  <Link href="/contact" className="flex items-center gap-2">Contact Us <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" /></Link>
                </Button>
                <Button asChild variant="outline" className="text-[12.5px] h-11 px-6 rounded-full font-semibold border border-[#003933]/25 bg-transparent text-[#003933] hover:bg-[#003933] hover:text-[#fffef1] hover:border-[#003933]">
                  <Link href="/shop">Shop Catalog</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#003933] via-[#005C4F] to-black p-7 flex flex-col justify-between text-[#fffef1] shadow-2xl shadow-[#003933]/30">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,#0A7060_0%,transparent_70%)] opacity-70 blur-2xl" />
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>
                <div className="relative">
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#fffef1]/55 mb-1.5">§ Heritage · Trust</div>
                  <div className="text-[13px] font-semibold">Exen Co Limited</div>
                </div>
                <div className="relative">
                  <div className="text-[26px] lg:text-[32px] font-serif italic text-[#fffef1] leading-[1.1] mb-3">&ldquo;Genuine stock, tri-currency trade, <span className="not-italic font-sans font-semibold">worldwide delivery</span>.&rdquo;</div>
                  <div className="h-px bg-[#fffef1]/20 my-4" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fffef1]/10 border border-[#fffef1]/15 flex items-center justify-center"><Package className="w-4 h-4 text-[#0A7060]" /></div>
                    <div>
                      <div className="text-[11px] font-semibold">Vietnam → Worldwide</div>
                      <div className="text-[10px] text-[#fffef1]/55">Wholesale · B2B · Multi-Currency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
