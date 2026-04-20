"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Settings, BarChart3, Target, X, Lock, Fingerprint, Check, Cookie } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import toast from "react-hot-toast";

const CATS = [
  { id: "necessary", name: "Essential", desc: "Security, sessions & cart. Always active.", icon: Lock, required: true },
  { id: "functional", name: "Preferences", desc: "Language, currency & saved filters.", icon: Settings, required: false },
  { id: "analytics", name: "Analytics", desc: "Helps us improve site performance.", icon: BarChart3, required: false },
  { id: "marketing", name: "Marketing", desc: "Relevant product recommendations.", icon: Target, required: false },
];

const TOAST_STYLE = { background: "#003933", color: "#fffef1", fontWeight: "600", borderRadius: "12px" };

export default function CookieModal() {
  const { showModal, closeModal, preferences, savePreferences, acceptAll, rejectAll } = useCookieConsent();
  const [local, setLocal] = useState(preferences);
  const toggle = (id: string) => { if (id !== "necessary") setLocal(p => ({ ...p, [id]: !p[id as keyof typeof p] })); };
  const on = (id: string) => local[id as keyof typeof local];
  const count = Object.values(local).filter(Boolean).length;

  const save = () => { savePreferences(local); toast.success("Preferences saved", { style: TOAST_STYLE }); closeModal(); };
  const all = () => { acceptAll(); toast.success("All cookies accepted", { style: TOAST_STYLE }); closeModal(); };
  const rej = () => { rejectAll(); toast.success("Optional cookies rejected", { style: { ...TOAST_STYLE, background: "#0a0a0a" } }); closeModal(); };

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="max-w-[500px] w-full mx-4 max-h-[92vh] overflow-hidden p-0 bg-[#fffef1] rounded-3xl border border-[#003933]/15 shadow-2xl shadow-[#003933]/30 gap-0">

        {/* ── Top gradient strip ── */}
        <div className="h-1.5 bg-gradient-to-r from-[#003933] via-[#0A7060] to-black" />

        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-5 bg-[#fffef1] border-b border-[#003933]/10 relative overflow-hidden">
          <div className="absolute -top-16 -right-12 w-48 h-48 rounded-full bg-[radial-gradient(circle,#003933_0%,transparent_70%)] opacity-[0.06] blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#003933]/55 mb-2">§ Exen Co Limited · Privacy</div>
              <DialogHeader className="p-0 space-y-0">
                <DialogTitle className="text-[22px] font-semibold text-[#0a0a0a] tracking-tight flex items-center gap-2.5 leading-none">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#003933] to-black flex items-center justify-center"><Cookie className="h-4 w-4 text-[#fffef1]" /></div>
                  Privacy <span className="italic font-serif text-[#003933] font-medium">Center</span>
                </DialogTitle>
              </DialogHeader>
              <p className="text-[11.5px] text-[#0a0a0a]/55 mt-2 max-w-sm leading-relaxed">Choose what data you allow. You can update these preferences any time.</p>
            </div>
            <button onClick={closeModal} aria-label="Close" className="w-8 h-8 rounded-full bg-[#003933]/8 hover:bg-[#003933]/15 flex items-center justify-center transition-colors flex-shrink-0"><X className="h-3.5 w-3.5 text-[#003933]" /></button>
          </div>
          {/* Progress segments */}
          <div className="flex items-center gap-1.5 mt-5">
            {CATS.map(c => (
              <div key={c.id} className={`h-1 flex-1 rounded-full transition-all duration-300 ${on(c.id) ? "bg-[#003933]" : "bg-[#003933]/15"}`} />
            ))}
            <span className="text-[9.5px] font-bold text-[#003933]/70 ml-2 flex-shrink-0 tracking-wider">{count}/{CATS.length}</span>
          </div>
        </div>

        {/* ── Categories 2×2 ── */}
        <div className="px-5 py-4 grid grid-cols-2 gap-2.5 max-h-[48vh] overflow-y-auto bg-[#f9f8eb]/40">
          {CATS.map(cat => {
            const Icon = cat.icon;
            const active = on(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                disabled={cat.required}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-300 ${active ? "border-[#003933] bg-white shadow-md shadow-[#003933]/10" : "border-[#003933]/15 bg-white hover:border-[#003933]/35"} ${cat.required ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all ${active ? "bg-[#003933]" : "bg-[#003933]/10"}`}>
                  <Check className={`h-3 w-3 transition-colors ${active ? "text-[#fffef1]" : "text-[#003933]/30"}`} />
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all ${active ? "bg-gradient-to-br from-[#003933] to-black" : "bg-[#003933]/8"}`}>
                  <Icon className={`h-4 w-4 transition-colors ${active ? "text-[#fffef1]" : "text-[#003933]/40"}`} />
                </div>
                <h4 className={`text-[12.5px] font-semibold mb-1 transition-colors ${active ? "text-[#0a0a0a]" : "text-[#003933]/55"}`}>{cat.name}</h4>
                <p className="text-[10px] text-[#0a0a0a]/50 leading-relaxed">{cat.desc}</p>
                {cat.required && <span className="inline-block mt-2 text-[8px] font-bold bg-[#003933]/10 text-[#003933] px-2 py-0.5 rounded-full uppercase tracking-widest">Required</span>}
              </button>
            );
          })}
        </div>

        {/* ── Actions ── */}
        <div className="px-5 pt-4 pb-4 space-y-2 bg-[#fffef1] border-t border-[#003933]/10">
          <div className="flex gap-2">
            <Button onClick={rej} variant="outline" className="flex-1 border border-[#003933]/25 bg-transparent text-[#003933]/75 hover:text-[#003933] hover:border-[#003933] hover:bg-[#003933]/5 h-10 rounded-full text-[11px] font-semibold transition-all">Reject Optional</Button>
            <Button onClick={save} className="flex-1 bg-black hover:bg-[#0a0a0a] text-[#fffef1] h-10 rounded-full text-[11px] font-semibold transition-all">Save · {count}/{CATS.length}</Button>
          </div>
          <Button onClick={all} className="group w-full bg-gradient-to-br from-[#003933] to-black text-[#fffef1] h-11 rounded-full text-[12.5px] font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all">Accept All Cookies</Button>
        </div>

        {/* ── Trust footer ── */}
        <div className="px-5 py-3 border-t border-[#003933]/10 bg-[#f9f8eb] flex items-center justify-between rounded-b-3xl">
          <div className="flex items-center gap-1.5"><Shield className="h-3 w-3 text-[#003933]" /><span className="text-[9.5px] text-[#003933]/65 font-semibold uppercase tracking-wider">GDPR Compliant</span></div>
          <div className="flex items-center gap-2 text-[#003933]/40"><Lock className="h-3 w-3" /><Fingerprint className="h-3 w-3 text-[#0A7060]" /><span className="text-[9px] font-bold">EXEN CO</span></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
