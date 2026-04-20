"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send, Clock, CheckCircle, Truck, Shield, ArrowUpRight, Globe, ChevronRight, Lock, Sparkles, Laptop, Monitor, Server, Router, Network, Cpu } from "lucide-react";
import toast from "react-hot-toast";

const INQUIRY_TYPES = [
  { value: "", label: "Select a category" },
  { value: "computing", label: "Laptops · Desktops · Monitors" },
  { value: "networking", label: "Routers · Switches · Access Points · Cabling" },
  { value: "servers", label: "Servers · Storage · UPS" },
  { value: "gpus", label: "Video Cards · Workstation GPUs" },
  { value: "peripherals", label: "Webcams · Keyboards · Peripherals" },
  { value: "bulk", label: "Bulk / Full IT Setup" },
  { value: "currency", label: "Multi-Currency Payment" },
  { value: "other", label: "Other" },
];

const BROWSE = [
  { icon: Laptop, label: "Laptops", href: "/shop?category=Laptop" },
  { icon: Monitor, label: "Monitors", href: "/shop?category=Monitor" },
  { icon: Server, label: "Servers", href: "/shop?category=Server" },
  { icon: Router, label: "Routers", href: "/shop?category=Router" },
  { icon: Cpu, label: "GPUs", href: "/shop?category=Video%20Card" },
  { icon: Network, label: "Switches", href: "/shop?category=Network%20Switch" },
];

const TOAST_STYLE = { background: "#003933", color: "#fffef1", fontWeight: "600", borderRadius: "12px" };

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); toast.success("Message sent — we'll respond within 24 hours.", { style: TOAST_STYLE }); setForm({ name: "", email: "", company: "", type: "", message: "" }); setTimeout(() => setSent(false), 3000); }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fffef1]">

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden border-b border-[#003933]/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-20 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#003933 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-10 lg:pt-14 pb-10">

          <div className="flex items-center gap-2 mb-8 text-[11px] font-semibold">
            <Link href="/" className="text-[#003933]/55 hover:text-[#003933] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#003933]/30" />
            <span className="text-[#003933]">Contact</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-end">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933] mb-5">
                <Sparkles className="h-3 w-3" /><span>§ Get in Touch · Exen Co Limited</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-semibold text-[#0a0a0a] leading-[1.02] tracking-[-0.025em] mb-5">
                Let&apos;s equip your <span className="italic font-serif text-[#003933] font-medium">business</span>.
              </h1>
              <p className="text-[14px] text-[#0a0a0a]/60 leading-relaxed max-w-lg">
                Wholesale laptops, servers, networking & enterprise electronics. Custom quotes in <span className="font-semibold text-[#003933]">VND · EUR · USD</span>, delivered within 24 hours.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 gap-2.5">
              {[
                { icon: Clock, label: "24h Response", sub: "Mon–Fri · ICT (UTC+7)" },
                { icon: Globe, label: "Vietnam · EU · Worldwide", sub: "International shipping" },
                { icon: Shield, label: "Warranty Backed", sub: "Genuine manufacturer stock" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3 bg-white border border-[#003933]/12 rounded-xl px-4 py-3">
                  <div className="w-9 h-9 rounded-xl bg-[#003933]/8 flex items-center justify-center flex-shrink-0"><s.icon className="w-4 h-4 text-[#003933]" /></div>
                  <div><p className="text-[12px] font-semibold text-[#0a0a0a] leading-none">{s.label}</p><p className="text-[10px] text-[#003933]/55 mt-1 font-medium">{s.sub}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Form + Info ═══ */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-8">

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-[#003933]/12 p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#003933] opacity-70" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#003933]" /></span>
                  <span className="text-[10px] font-bold text-[#003933] uppercase tracking-[0.22em]">§ Request a Quote</span>
                </div>
                <h2 className="text-[24px] font-semibold text-[#0a0a0a] mb-2 tracking-tight">Tell us what you <span className="italic font-serif text-[#003933] font-medium">need</span>.</h2>
                <p className="text-[12.5px] text-[#0a0a0a]/55 mb-7 leading-relaxed">We&apos;ll prepare a wholesale quote with tri-currency settlement options within 24 hours.</p>

                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.18em] mb-1.5 block">Name <span className="text-[#003933]">*</span></Label>
                      <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" required className="h-11 text-[13px] border border-[#003933]/20 bg-white focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl placeholder:text-[#003933]/35" />
                    </div>
                    <div>
                      <Label className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.18em] mb-1.5 block">Email <span className="text-[#003933]">*</span></Label>
                      <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@company.com" required className="h-11 text-[13px] border border-[#003933]/20 bg-white focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl placeholder:text-[#003933]/35" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.18em] mb-1.5 block">Company</Label>
                      <Input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Company name" className="h-11 text-[13px] border border-[#003933]/20 bg-white focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl placeholder:text-[#003933]/35" />
                    </div>
                    <div>
                      <Label className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.18em] mb-1.5 block">Inquiry Type</Label>
                      <select value={form.type} onChange={e => set("type", e.target.value)} className="w-full h-11 text-[13px] border border-[#003933]/20 bg-white focus:border-[#003933] rounded-xl px-3 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#003933]/10">
                        {INQUIRY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.18em] mb-1.5 block">Message <span className="text-[#003933]">*</span></Label>
                    <Textarea value={form.message} onChange={e => set("message", e.target.value)} placeholder="Products, quantities, delivery timeline, settlement currency…" required rows={5} className="text-[13px] border border-[#003933]/20 bg-white focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl resize-none placeholder:text-[#003933]/35" />
                  </div>
                  <Button type="submit" disabled={loading} className={`group w-full h-12 rounded-full text-[13px] font-semibold transition-all ${sent ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25" : "bg-gradient-to-br from-[#003933] to-black text-[#fffef1] shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/45 hover:-translate-y-0.5"}`}>
                    {loading ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#fffef1]/30 border-t-[#fffef1] rounded-full animate-spin" />Sending…</div>
                      : sent ? <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Message Sent</div>
                      : <div className="flex items-center gap-2"><Send className="h-4 w-4" />Send Request<ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" /></div>}
                  </Button>
                  <div className="flex items-center justify-center gap-5 pt-1">
                    {["Free consultation", "24h reply", "No commitment"].map(t => <div key={t} className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-[#0A7060]" /><span className="text-[10px] text-[#003933]/60 font-semibold">{t}</span></div>)}
                  </div>
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 space-y-4">
              {/* Email card */}
              <a href="mailto:Exencolimited@gmail.com" className="group block relative bg-gradient-to-br from-[#003933] to-black text-[#fffef1] rounded-3xl p-6 hover:shadow-xl hover:shadow-[#003933]/35 hover:-translate-y-0.5 transition-all overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[radial-gradient(circle,#0A7060_0%,transparent_70%)] opacity-60 blur-2xl" />
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <Mail className="w-6 h-6 text-[#fffef1]/85" />
                    <div className="w-9 h-9 rounded-full bg-[#fffef1]/10 border border-[#fffef1]/15 group-hover:bg-[#fffef1]/20 flex items-center justify-center transition-colors"><ArrowUpRight className="w-4 h-4 text-[#fffef1] group-hover:rotate-45 transition-transform duration-300" /></div>
                  </div>
                  <p className="text-[9.5px] text-[#fffef1]/50 uppercase tracking-[0.22em] font-bold mb-2">§ Email us directly</p>
                  <p className="text-[18px] font-semibold tracking-tight">Exencolimited@gmail.com</p>
                  <p className="text-[11px] text-[#fffef1]/55 mt-1 font-medium">Response within 24 hours</p>
                </div>
              </a>

              {/* Location + Hours */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-[#003933]/12 rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-xl bg-[#003933]/8 flex items-center justify-center mb-3"><MapPin className="w-4 h-4 text-[#003933]" /></div>
                  <p className="text-[13px] font-semibold text-[#0a0a0a]">Hanoi, Vietnam</p>
                  <p className="text-[10.5px] text-[#003933]/55 mt-0.5 font-medium">Serving Worldwide</p>
                </div>
                <div className="bg-white border border-[#003933]/12 rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-xl bg-[#003933]/8 flex items-center justify-center mb-3"><Clock className="w-4 h-4 text-[#003933]" /></div>
                  <p className="text-[13px] font-semibold text-[#0a0a0a]">Mon–Fri · 9–18</p>
                  <p className="text-[10.5px] text-[#003933]/55 mt-0.5 font-medium">ICT (UTC+7)</p>
                </div>
              </div>

              {/* Why */}
              <div className="bg-[#f9f8eb] border border-[#003933]/12 rounded-2xl p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-4">§ Why Exen Co Limited</div>
                <div className="space-y-2.5">
                  {[
                    "Genuine electronics from trusted manufacturers",
                    "B2B wholesale-only pricing",
                    "Worldwide shipping · Vietnam · EU · International",
                    "Tri-currency settlement · VND · EUR · USD",
                    "Manufacturer-backed warranty",
                    "Dedicated account management",
                  ].map(t => (
                    <div key={t} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#003933] flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle className="w-2.5 h-2.5 text-[#fffef1]" /></div>
                      <span className="text-[11.5px] text-[#0a0a0a]/70 leading-relaxed">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browse */}
              <div className="bg-white border border-[#003933]/12 rounded-2xl p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-3">§ Browse Categories</div>
                <div className="grid grid-cols-3 gap-2">
                  {BROWSE.map(b => (
                    <Link key={b.label} href={b.href} className="group flex flex-col items-center gap-1.5 bg-[#fffef1] hover:bg-[#003933] border border-[#003933]/10 hover:border-[#003933] rounded-xl py-3 px-2 transition-all">
                      <b.icon className="w-4 h-4 text-[#003933]/70 group-hover:text-[#fffef1] transition-colors" />
                      <span className="text-[10px] font-semibold text-[#003933]/70 group-hover:text-[#fffef1] transition-colors">{b.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Trust strip ═══ */}
      <section className="border-t border-[#003933]/10 bg-[#f9f8eb]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {[{ icon: Truck, l: "Worldwide Shipping" }, { icon: Shield, l: "Manufacturer Warranty" }, { icon: Globe, l: "VND · EUR · USD" }, { icon: Lock, l: "Secure Checkout" }].map(s => (
              <div key={s.l} className="flex items-center gap-1.5 text-[#003933]/70"><s.icon className="w-3.5 h-3.5" /><span className="text-[11px] font-bold uppercase tracking-wider">{s.l}</span></div>
            ))}
          </div>
          <Link href="/shop" className="group text-[11px] font-bold text-[#003933] uppercase tracking-wider inline-flex items-center gap-1.5 hover:gap-2 transition-all">Browse Catalog <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" /></Link>
        </div>
      </section>
    </div>
  );
}
