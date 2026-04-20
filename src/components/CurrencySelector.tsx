"use client";
import { useState } from "react";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";
import { Check } from "lucide-react";

export default function CurrencySelector() {
  const { currentCurrency, setCurrentCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger — compact inline chip rail */}
      <button onClick={() => setOpen(p => !p)} className="flex items-center gap-0.5 h-8 rounded-full bg-[#003933]/8 border border-[#003933]/15 hover:border-[#003933]/35 px-1 transition-all">
        {currencies.slice(0, 3).map(c => {
          const active = c.code === currentCurrency.code;
          return (
            <div key={c.code} onClick={(e) => { e.stopPropagation(); setCurrentCurrency(c); setOpen(false); }} className={`h-6 px-2 rounded-full flex items-center gap-1 text-[10px] font-bold cursor-pointer transition-all duration-200 ${active ? "bg-[#003933] text-[#fffef1] shadow-sm" : "text-[#003933]/60 hover:text-[#003933]"}`}>
              <span className="text-[10px] leading-none">{c.flag}</span>
              <span>{c.code}</span>
            </div>
          );
        })}
        {currencies.length > 3 && (
          <div className="h-6 px-1.5 rounded-full flex items-center text-[9px] font-bold text-[#003933]/55 cursor-pointer hover:text-[#003933]">+{currencies.length - 3}</div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-[220px] bg-[#fffef1] border border-[#003933]/15 rounded-2xl shadow-2xl shadow-[#003933]/20 p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 px-3 py-2">§ Settle in</div>
            {currencies.map(c => {
              const active = c.code === currentCurrency.code;
              return (
                <button key={c.code} onClick={() => { setCurrentCurrency(c); setOpen(false); }} className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-left transition-all ${active ? "bg-gradient-to-br from-[#003933] to-black" : "hover:bg-[#003933]/8"}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[14px] leading-none">{c.flag}</span>
                    <div>
                      <span className={`text-[11.5px] font-semibold block leading-none ${active ? "text-[#fffef1]" : "text-[#0a0a0a]"}`}>{c.code}</span>
                      <span className={`text-[9.5px] font-medium ${active ? "text-[#fffef1]/55" : "text-[#003933]/55"}`}>{c.symbol} · {c.name || c.code}</span>
                    </div>
                  </div>
                  {active && <div className="w-5 h-5 rounded-full bg-[#0A7060] flex items-center justify-center"><Check className="w-3 h-3 text-[#fffef1]" /></div>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
