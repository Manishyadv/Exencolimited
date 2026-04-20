"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Mail, Lock, Eye, EyeOff, User, ArrowUpRight, X, Shield, Truck, Package, Fingerprint, Building2, CheckCircle, Laptop, Monitor, Server, Router, Cpu, Sparkles, Globe } from "lucide-react";
import toast from "react-hot-toast";

const TOAST_STYLE = { background: "#003933", color: "#fffef1", fontWeight: "600", borderRadius: "12px" };

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const up = mode === "signup";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); toast.error("Something went wrong, please try again", { style: { ...TOAST_STYLE, background: "#0a0a0a" } }); }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[880px] p-0 overflow-hidden bg-[#fffef1] rounded-3xl border border-[#003933]/15 shadow-2xl shadow-[#003933]/30 gap-0">
        <div className="grid sm:grid-cols-5">

          {/* ═══ Left — Editorial Brand Panel ═══ */}
          <div className="sm:col-span-2 relative overflow-hidden hidden sm:flex flex-col justify-between min-h-[560px] bg-gradient-to-br from-[#003933] via-[#005C4F] to-black text-[#fffef1] p-7">
            {/* Shader layers */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,#0A7060_0%,transparent_65%)] opacity-70 blur-2xl" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,#fffef1_0%,transparent_70%)] opacity-[0.06] blur-3xl" />
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nl'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nl)'/%3E%3C/svg%3E\")" }} />
            </div>

            {/* Rotating rings decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-[#fffef1]/10 animate-[spin_38s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-dashed border-[#fffef1]/15 animate-[spin_28s_linear_infinite_reverse]" />
            </div>

            <div className="relative">
              {/* Brand */}
              <div className="flex items-center gap-2.5 mb-10">
                <div className="w-9 h-9 rounded-xl bg-[#fffef1] flex items-center justify-center shadow-lg"><span className="text-[#003933] text-sm font-black italic">E</span></div>
                <div className="leading-none">
                  <div className="flex items-baseline gap-1.5"><span className="text-[14px] font-bold tracking-tight">EXEN CO</span><span className="text-[10px] italic font-serif text-[#0A7060]">Limited</span></div>
                  <span className="block text-[9px] font-semibold text-[#fffef1]/55 uppercase tracking-[0.22em] mt-1">Vietnam · Worldwide</span>
                </div>
              </div>

              {/* Editorial headline */}
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A7060] mb-3">§ {up ? "New Account" : "Welcome Back"}</div>
              <h3 className="text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] mb-4">
                {up ? <>Join the <span className="italic font-serif text-[#0A7060] font-medium">trade</span> network.</> : <>Your wholesale <span className="italic font-serif text-[#0A7060] font-medium">desk</span> awaits.</>}
              </h3>
              <p className="text-[12px] text-[#fffef1]/55 leading-relaxed max-w-[220px]">
                {up ? "Create your B2B account to unlock volume pricing across laptops, servers, networking & more." : "Sign in to access your wholesale account, orders, and personalised quotes."}
              </p>
            </div>

            {/* Category chips */}
            <div className="relative mt-6">
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#fffef1]/45 mb-3">In stock</div>
              <div className="flex flex-wrap gap-2">
                {[Laptop, Monitor, Server, Router, Cpu].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-[#fffef1]/8 backdrop-blur-sm border border-[#fffef1]/15 flex items-center justify-center hover:bg-[#fffef1]/15 hover:border-[#0A7060]/40 transition-all">
                    <Icon className="w-4 h-4 text-[#fffef1]/75" />
                  </div>
                ))}
              </div>
            </div>

            {/* Trust line */}
            <div className="relative flex items-center gap-4 mt-6 pt-5 border-t border-[#fffef1]/15">
              {[{ icon: Package, l: "B2B" }, { icon: Truck, l: "Worldwide" }, { icon: Globe, l: "VND · EUR · USD" }].map(t => (
                <div key={t.l} className="flex items-center gap-1.5 text-[#fffef1]/60"><t.icon className="w-3 h-3 text-[#0A7060]" /><span className="text-[9px] font-bold uppercase tracking-wider">{t.l}</span></div>
              ))}
            </div>
          </div>

          {/* ═══ Right — Form Panel ═══ */}
          <div className="sm:col-span-3 p-6 sm:p-9 flex flex-col justify-center relative bg-[#fffef1]">
            {/* Close */}
            <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-8 h-8 bg-[#003933]/8 hover:bg-[#003933]/15 rounded-full flex items-center justify-center transition-colors z-10"><X className="h-3.5 w-3.5 text-[#003933]" /></button>

            {/* Mobile brand row */}
            <div className="sm:hidden flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#003933] to-black flex items-center justify-center"><span className="text-[#fffef1] text-sm font-black italic">E</span></div>
              <div className="leading-none">
                <div className="flex items-baseline gap-1.5"><span className="text-[14px] font-bold text-[#003933]">EXEN CO</span><span className="text-[11px] italic font-serif text-[#0A7060]">Limited</span></div>
                <span className="block text-[9px] font-semibold text-[#003933]/55 uppercase tracking-widest mt-0.5">Vietnam · Worldwide</span>
              </div>
            </div>

            {/* Mode toggle */}
            <div className="inline-flex items-center bg-[#003933]/8 rounded-full p-1 mb-6 self-start">
              <button onClick={() => setMode("login")} className={`px-5 py-2 rounded-full text-[11.5px] font-semibold transition-all ${!up ? "bg-[#003933] text-[#fffef1]" : "text-[#003933]/65 hover:text-[#003933]"}`}>Sign In</button>
              <button onClick={() => setMode("signup")} className={`px-5 py-2 rounded-full text-[11.5px] font-semibold transition-all ${up ? "bg-[#003933] text-[#fffef1]" : "text-[#003933]/65 hover:text-[#003933]"}`}>Register</button>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-2">§ {up ? "Create Account" : "Sign In"}</div>
            <h2 className="text-[26px] font-semibold text-[#0a0a0a] leading-tight tracking-tight mb-2">{up ? <>Create your <span className="italic font-serif text-[#003933] font-medium">account</span>.</> : <>Welcome <span className="italic font-serif text-[#003933] font-medium">back</span>.</>}</h2>
            <p className="text-[12px] text-[#0a0a0a]/55 mb-6 leading-relaxed">{up ? "Fill in your details to get B2B wholesale access." : "Enter your credentials to access your account."}</p>

            <form onSubmit={submit} className="space-y-3.5">
              {up && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#003933]/45" />
                    <Input type="text" placeholder="Full name" className="pl-10 h-11 text-[13px] bg-white border border-[#003933]/20 focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl placeholder:text-[#003933]/40" required />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#003933]/45" />
                    <Input type="text" placeholder="Company (optional)" className="pl-10 h-11 text-[13px] bg-white border border-[#003933]/20 focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl placeholder:text-[#003933]/40" />
                  </div>
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#003933]/45" />
                <Input type="email" placeholder="Email address" className="pl-10 h-11 text-[13px] bg-white border border-[#003933]/20 focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl placeholder:text-[#003933]/40" required />
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#003933]/45" />
                <Input type={showPw ? "text" : "password"} placeholder="Password" className="pl-10 pr-10 h-11 text-[13px] bg-white border border-[#003933]/20 focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 rounded-xl placeholder:text-[#003933]/40" required />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label="Toggle password" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003933]/45 hover:text-[#003933] transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {!up && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#003933]/30 text-[#003933] focus:ring-[#003933]/20" />
                    <span className="text-[11px] text-[#003933]/60 font-semibold group-hover:text-[#003933] transition-colors">Remember me</span>
                  </label>
                  <button type="button" className="text-[11px] text-[#003933] hover:text-[#0A7060] font-semibold border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-all">Forgot password?</button>
                </div>
              )}

              {up && (
                <div className="flex items-start gap-2.5 bg-[#003933]/5 border border-[#003933]/12 rounded-xl p-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#003933] flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle className="w-3 h-3 text-[#fffef1]" /></div>
                  <p className="text-[10.5px] text-[#0a0a0a]/60 leading-relaxed">By registering you agree to our terms and gain access to wholesale B2B pricing in <span className="font-semibold text-[#003933]">VND · EUR · USD</span>.</p>
                </div>
              )}

              <Button type="submit" className="group w-full h-12 bg-gradient-to-br from-[#003933] to-black hover:from-[#003933] hover:to-[#0a0a0a] text-[#fffef1] text-[13px] font-semibold rounded-full transition-all shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/45 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#fffef1]/30 border-t-[#fffef1] rounded-full animate-spin" />Processing…</div>
                ) : (
                  <span className="flex items-center justify-center gap-2">{up ? "Create Account" : "Sign In"}<ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" /></span>
                )}
              </Button>
            </form>

            {/* Alt action & trust row */}
            <div className="mt-6 pt-5 border-t border-[#003933]/10 space-y-4">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold">
                <span className="text-[#003933]/55">{up ? "Already registered?" : "New to Exen Co?"}</span>
                <button onClick={() => setMode(up ? "login" : "signup")} className="text-[#003933] hover:text-[#0A7060] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-all">{up ? "Sign in" : "Create account"}</button>
              </div>
              <div className="flex items-center justify-center gap-5">
                {[{ icon: Shield, l: "Encrypted" }, { icon: Fingerprint, l: "GDPR" }, { icon: Sparkles, l: "B2B Only" }].map(s => (
                  <div key={s.l} className="flex items-center gap-1.5"><s.icon className="h-3 w-3 text-[#0A7060]" /><span className="text-[9px] text-[#003933]/60 font-bold uppercase tracking-wider">{s.l}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
