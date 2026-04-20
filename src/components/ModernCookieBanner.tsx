"use client";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Shield, X, Lock, Sparkles } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openModal } = useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-5 md:bottom-5 md:max-w-[400px] z-50"
        >
          <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl shadow-[#003933]/50 ring-1 ring-[#fffef1]/10">
            {/* Ambient shader */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,#003933_0%,transparent_70%)] opacity-80 blur-2xl" />
              <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full bg-[radial-gradient(circle,#0A7060_0%,transparent_70%)] opacity-30 blur-2xl" />
              <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
            </div>

            {/* Top accent rule */}
            <div className="relative h-[2px] bg-gradient-to-r from-transparent via-[#0A7060] to-transparent" />

            {/* Header */}
            <div className="relative px-5 pt-5 pb-1 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#003933] to-[#0A7060] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#003933]/40"><Cookie className="h-4 w-4 text-[#fffef1]" /></div>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#0A7060] mb-0.5">§ Privacy Notice</div>
                  <h3 className="text-[14px] font-semibold text-[#fffef1] tracking-tight leading-tight">Cookies & <span className="italic font-serif text-[#0A7060] font-medium">preferences</span></h3>
                </div>
              </div>
              <button onClick={rejectAll} aria-label="Essential only" className="w-7 h-7 rounded-full bg-[#fffef1]/8 hover:bg-[#fffef1]/15 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5">
                <X className="h-3 w-3 text-[#fffef1]/60" />
              </button>
            </div>

            {/* Body */}
            <div className="relative px-5 pt-3 pb-5 space-y-4">
              <p className="text-[11.5px] text-[#fffef1]/60 leading-relaxed">
                Exen Co Limited uses cookies to enhance your browsing and deliver relevant product recommendations across our wholesale catalog.
              </p>

              {/* Trust row */}
              <div className="flex items-center gap-4 py-2 border-y border-[#fffef1]/10">
                {[{ icon: Shield, label: "GDPR Compliant" }, { icon: Lock, label: "Data Protected" }, { icon: Sparkles, label: "B2B Only" }].map(t => (
                  <div key={t.label} className="flex items-center gap-1.5 text-[#fffef1]/55">
                    <t.icon className="h-3 w-3 text-[#0A7060]" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{t.label}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <Button onClick={acceptAll} className="group w-full bg-gradient-to-br from-[#fffef1] to-[#f9f8eb] hover:from-[#fffef1] hover:to-[#fffef1] text-[#003933] h-11 rounded-full text-[12px] font-semibold transition-all shadow-lg shadow-[#003933]/30 hover:-translate-y-0.5">Accept All Cookies</Button>
                <div className="flex gap-2">
                  <Button onClick={rejectAll} variant="outline" className="flex-1 border border-[#fffef1]/15 bg-[#fffef1]/5 hover:bg-[#fffef1]/10 text-[#fffef1]/75 hover:text-[#fffef1] h-9 rounded-full text-[11px] font-semibold transition-all">Essential Only</Button>
                  <button onClick={openModal} className="h-9 px-4 flex items-center gap-1.5 bg-[#fffef1]/5 hover:bg-[#fffef1]/10 border border-[#fffef1]/15 rounded-full text-[11px] font-semibold text-[#fffef1]/75 hover:text-[#fffef1] transition-all">
                    <Settings className="h-3 w-3" /><span className="hidden sm:inline">Customize</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
