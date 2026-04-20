"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ArrowUpRight, Package, X, Truck, ShieldCheck, Globe, Mail, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { formatPrice } = useCurrency();
  const total = getTotalPrice();
  const count = cartItems.reduce((t, i) => t + i.quantity, 0);
  const qty = (id: string | number, q: number) => { if (q > 0) updateQuantity(id, q); };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[420px] flex flex-col bg-[#fffef1] p-0 border-l border-[#003933]/15 gap-0 shadow-2xl shadow-[#003933]/25">

        {/* ── Header — teal band ── */}
        <div className="relative bg-[#003933] text-[#fffef1] px-5 pt-5 pb-4 overflow-hidden">
          <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,#0A7060_0%,transparent_65%)] opacity-60 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#fffef1]/55 mb-1.5">§ Your Order</div>
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-[20px] font-bold tracking-tight">Cart</h2>
                {count > 0 && <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-[10px] font-bold rounded-full bg-[#fffef1] text-[#003933]">{count}</span>}
              </div>
              <p className="text-[10.5px] text-[#fffef1]/60 mt-1 font-medium">Exen Co Limited · B2B Wholesale</p>
            </div>
            <button onClick={onClose} aria-label="Close" className="w-8 h-8 bg-[#fffef1]/10 hover:bg-[#fffef1]/20 rounded-full flex items-center justify-center transition-colors"><X className="h-4 w-4 text-[#fffef1]" /></button>
          </div>
          {/* Trust strip */}
          <div className="relative flex items-center gap-4 mt-4 pt-3 border-t border-[#fffef1]/15">
            {[{ icon: Truck, l: "Worldwide" }, { icon: ShieldCheck, l: "Warranty" }, { icon: Globe, l: "VND · EUR · USD" }].map(t => (
              <div key={t.l} className="flex items-center gap-1.5 text-[#fffef1]/60"><t.icon className="w-3 h-3 text-[#0A7060]" /><span className="text-[8.5px] font-bold uppercase tracking-wider">{t.l}</span></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 min-h-0">
          {cartItems.length === 0 ? (
            /* ── Empty state ── */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="relative mx-auto mb-6 w-24 h-24">
                  <div className="absolute inset-0 rounded-full border border-[#003933]/15" />
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#003933]/20" />
                  <div className="absolute inset-5 rounded-full bg-[#003933]/5" />
                  <div className="absolute inset-0 flex items-center justify-center"><Package className="h-8 w-8 text-[#003933]/35" /></div>
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-2">Empty Cart</div>
                <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-2 tracking-tight">Nothing selected <span className="italic font-serif text-[#003933] font-medium">yet</span>.</h3>
                <p className="text-[12px] text-[#0a0a0a]/55 leading-relaxed mb-7 max-w-[240px] mx-auto">Browse our electronics catalog to add products for your business.</p>
                <Button asChild onClick={onClose} className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] h-11 px-7 rounded-full text-[12px] font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all">
                  <Link href="/shop" className="flex items-center gap-2">Browse Catalog <ArrowUpRight className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform duration-300" /></Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* ── Items ── */}
              <div className="flex-1 overflow-auto">
                {cartItems.map((item, idx) => (
                  <div key={item.id} className={`px-5 py-4 ${idx < cartItems.length - 1 ? "border-b border-[#003933]/10" : ""}`}>
                    <div className="flex gap-3.5">
                      <Link href={`/product/${item.id}`} onClick={onClose} className="w-[76px] h-[76px] bg-white rounded-2xl overflow-hidden flex-shrink-0 border border-[#003933]/10 hover:border-[#003933]/30 transition-colors">
                        <Image src={item.thumbnail || "/placeholder.jpg"} alt={item.title || "Product"} width={76} height={76} className="w-full h-full object-contain p-2" unoptimized />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <Link href={`/product/${item.id}`} onClick={onClose} className="flex-1 min-w-0">
                            <h4 className="text-[12.5px] font-semibold text-[#0a0a0a] line-clamp-2 leading-snug hover:text-[#003933] transition-colors">{item.title}</h4>
                          </Link>
                          <button onClick={() => removeFromCart(item.id)} aria-label="Remove" className="text-[#003933]/35 hover:text-red-600 p-1 rounded-lg transition-colors flex-shrink-0 -mt-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[15px] font-bold text-[#003933]">{formatPrice(item.price * item.quantity)}</span>
                          <div className="flex items-center h-8 bg-[#003933] rounded-full">
                            <button onClick={() => qty(item.id, item.quantity - 1)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center text-[#fffef1]/60 hover:text-[#fffef1] transition-colors"><Minus className="h-3 w-3" /></button>
                            <span className="w-5 text-center text-[11px] font-bold text-[#fffef1]">{item.quantity}</span>
                            <button onClick={() => qty(item.id, item.quantity + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center text-[#fffef1]/60 hover:text-[#fffef1] transition-colors"><Plus className="h-3 w-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Footer — teal summary panel ── */}
              <div className="relative bg-black text-[#fffef1] rounded-t-3xl overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-[radial-gradient(ellipse,#003933_0%,transparent_70%)] opacity-60 blur-3xl" />
                </div>
                <div className="relative p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]"><span className="text-[#fffef1]/45">Subtotal · {count} item{count !== 1 ? "s" : ""}</span><span className="font-semibold text-[#fffef1]/75">{formatPrice(total)}</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-[#fffef1]/45">Shipping & VAT</span><span className="text-[#fffef1]/45 italic text-[10px]">Calculated at checkout</span></div>
                    <div className="border-t border-[#fffef1]/15 pt-3 flex justify-between items-baseline">
                      <span className="text-[9.5px] font-bold text-[#fffef1]/55 uppercase tracking-[0.22em]">Estimated Total</span>
                      <span className="text-[26px] font-bold text-[#fffef1] tracking-tight leading-none">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button asChild className="group w-full bg-gradient-to-br from-[#0A7060] to-[#003933] h-12 rounded-full font-semibold text-[13px] shadow-xl shadow-[#003933]/40 hover:shadow-[#003933]/60 hover:-translate-y-0.5 transition-all">
                    <Link href="/checkout" onClick={onClose} className="flex items-center justify-center gap-2 text-[#fffef1]">Proceed to Checkout <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" /></Link>
                  </Button>
                  <div className="flex items-center justify-between">
                    <button onClick={onClose} className="text-[11px] font-semibold text-[#fffef1]/45 hover:text-[#fffef1]/80 transition-colors">← Continue shopping</button>
                    <a href="mailto:Exencolimited@gmail.com" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A7060] hover:text-[#fffef1] transition-colors"><Mail className="w-3 h-3" /> Bulk quote</a>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 pt-1 text-[#fffef1]/35 text-[9px] font-bold uppercase tracking-[0.22em]"><Sparkles className="w-3 h-3 text-[#0A7060]" /><span>Multi-Currency · VND · EUR · USD</span></div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
