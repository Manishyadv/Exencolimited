"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ShoppingCart, Mail, MapPin, User, Building2, Truck, Lock, Loader2, ArrowUpRight, ShieldCheck, FileText, Check, Globe, Minus, Plus, X, Receipt, Sparkles, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import toast from "react-hot-toast";

const COUNTRIES = ["Vietnam", "Spain", "Germany", "France", "Italy", "Netherlands", "Belgium", "Portugal", "Austria", "Poland", "Ireland", "Sweden", "Denmark", "Finland", "Czech Republic", "United Kingdom", "United States", "Japan", "Singapore", "South Korea", "Thailand", "Indonesia", "Malaysia", "Australia", "United Arab Emirates"];

const STEPS = [
  { key: 1, label: "Cart", icon: ShoppingCart },
  { key: 2, label: "Details", icon: User },
  { key: 3, label: "Shipping", icon: Truck },
  { key: 4, label: "Confirm", icon: Check },
];

const TOAST_STYLE = { background: "#003933", color: "#fffef1", fontWeight: "600", borderRadius: "12px" };
const TOAST_ERR = { background: "#0a0a0a", color: "#fffef1", fontWeight: "600", borderRadius: "12px" };

function Inp({ label, req, ...p }: { label: string; name: string; value: string; placeholder?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; req?: boolean }) {
  return (
    <div>
      <Label className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.18em] mb-1.5 block">{label} {req && <span className="text-[#003933]">*</span>}</Label>
      <Input {...p} required={req} className="h-11 border border-[#003933]/20 rounded-xl text-[13px] placeholder:text-[#003933]/35 bg-white focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 transition-all" />
    </div>
  );
}

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("Vietnam");
  const [fd, setFd] = useState({ firstName: "", lastName: "", email: "", company: "", address: "", city: "", postalCode: "", region: "", businessType: "", vatNumber: "" });
  const total = getTotalPrice();
  const count = cartItems.reduce((t, i) => t + i.quantity, 0);
  const up = (e: React.ChangeEvent<HTMLInputElement>) => setFd({ ...fd, [e.target.name]: e.target.value });

  const ok = () => {
    if (step === 2) {
      if (!fd.firstName.trim() || !fd.lastName.trim() || !fd.email.trim()) { toast.error("Fill in all contact fields", { style: TOAST_ERR }); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) { toast.error("Enter a valid email", { style: TOAST_ERR }); return false; }
      if (!fd.company.trim()) { toast.error("Company name required for B2B", { style: TOAST_ERR }); return false; }
    }
    if (step === 3 && (!fd.address.trim() || !fd.city.trim() || !fd.postalCode.trim())) { toast.error("Fill in all address fields", { style: TOAST_ERR }); return false; }
    return true;
  };
  const next = () => { if (ok()) setStep(s => Math.min(s + 1, 4)); };
  const submit = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false); clearCart();
      toast.success("Order submitted successfully", { style: TOAST_STYLE });
      toast.success("Pro-forma invoice sent to your email within 24h.", { duration: 6000, style: { ...TOAST_STYLE, background: "#0a0a0a" } });
      router.push("/");
    }, 2000);
  };

  if (cartItems.length === 0) return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fffef1]">
      <div className="max-w-sm w-full text-center">
        <div className="relative mx-auto mb-6 w-24 h-24">
          <div className="absolute inset-0 rounded-full border border-[#003933]/15" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#003933]/20" />
          <div className="absolute inset-0 flex items-center justify-center"><ShoppingCart className="h-8 w-8 text-[#003933]/35" /></div>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-2">§ Empty Cart</div>
        <h1 className="text-2xl font-semibold text-[#0a0a0a] mb-2 tracking-tight">Nothing to check out <span className="italic font-serif text-[#003933] font-medium">yet</span>.</h1>
        <p className="text-[12.5px] text-[#0a0a0a]/55 mb-6">Add products to your cart before continuing.</p>
        <Button onClick={() => router.push("/shop")} className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] h-11 px-8 rounded-full text-[13px] font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/40 hover:-translate-y-0.5 transition-all w-full">
          <span className="flex items-center justify-center gap-2">Browse Catalog <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" /></span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffef1]">

      {/* ═══ Sticky step progress ═══ */}
      <div className="sticky top-0 z-40 bg-black text-[#fffef1]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center h-16 gap-4">
          <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} aria-label="Back" className="text-[#fffef1]/55 hover:text-[#fffef1] transition-colors flex-shrink-0 w-8 h-8 rounded-full hover:bg-[#fffef1]/10 flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>

          <div className="flex-1 flex items-center gap-1.5">
            {STEPS.map((s) => {
              const done = step > s.key;
              const active = step === s.key;
              return (
                <button key={s.key} onClick={() => s.key < step && setStep(s.key)} className="flex-1 group text-left">
                  <div className={`h-1 rounded-full transition-all duration-500 ${done ? "bg-[#0A7060]" : active ? "bg-[#fffef1]" : "bg-[#fffef1]/10"}`} />
                  <div className="flex items-center gap-1.5 mt-2">
                    <s.icon className={`w-3 h-3 transition-colors ${active ? "text-[#fffef1]" : done ? "text-[#0A7060]" : "text-[#fffef1]/25"}`} />
                    <span className={`text-[9.5px] font-bold uppercase tracking-[0.18em] hidden sm:inline transition-colors ${active ? "text-[#fffef1]" : done ? "text-[#fffef1]/70" : "text-[#fffef1]/25"}`}>{s.key < 10 ? `0${s.key}` : s.key} · {s.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[#fffef1]/60 flex-shrink-0"><Lock className="w-3 h-3 text-[#0A7060]" /><span className="text-[9.5px] font-bold uppercase tracking-wider hidden sm:inline">Secure Checkout</span></div>
        </div>
      </div>

      {/* ═══ Editorial header ═══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 lg:pt-12 pb-6 border-b border-[#003933]/10">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-3">§ Checkout · Step {step} of 4</div>
        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#0a0a0a] tracking-[-0.02em] leading-[1.05]">
          {step === 1 && <>Review your <span className="italic font-serif text-[#003933] font-medium">cart</span>.</>}
          {step === 2 && <>Your <span className="italic font-serif text-[#003933] font-medium">details</span>.</>}
          {step === 3 && <>Shipping <span className="italic font-serif text-[#003933] font-medium">address</span>.</>}
          {step === 4 && <>Confirm your <span className="italic font-serif text-[#003933] font-medium">order</span>.</>}
        </h1>
        <p className="text-[13px] text-[#0a0a0a]/55 mt-3 max-w-xl leading-relaxed">
          {step === 1 && "Verify items and quantities before continuing. You can adjust or remove anything below."}
          {step === 2 && "Contact & business information for invoicing and account setup."}
          {step === 3 && "Where should we deliver your order? We ship to Vietnam, EU & worldwide."}
          {step === 4 && "Review everything, then submit your wholesale order. You'll receive a pro-forma invoice by email."}
        </p>
      </div>

      {/* ═══ Main grid ═══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 lg:py-10">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* ══ Summary · LEFT ══ */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-[84px] space-y-4">
              <div className="relative bg-black text-[#fffef1] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,#003933_0%,transparent_70%)] opacity-70 blur-2xl" />
                  <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
                </div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#fffef1]/55">§ Order Summary</div>
                    <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-[10px] font-bold rounded-full bg-[#0A7060] text-[#fffef1]">{count}</span>
                  </div>

                  <div className="space-y-3 mb-5 max-h-48 overflow-y-auto pr-1">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-[#fffef1]/5 rounded-lg overflow-hidden flex-shrink-0 border border-[#fffef1]/10">
                          <Image src={item.thumbnail || "/placeholder.jpg"} alt="" width={44} height={44} className="w-full h-full object-contain p-1.5" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-[#fffef1]/85 line-clamp-1">{item.title}</p>
                          <p className="text-[9.5px] text-[#fffef1]/40 font-medium">Qty × {item.quantity}</p>
                        </div>
                        <span className="text-[11.5px] font-bold text-[#fffef1] flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#fffef1]/15 pt-4 space-y-2">
                    <div className="flex justify-between text-[11px]"><span className="text-[#fffef1]/45">Subtotal · {count} item{count !== 1 ? "s" : ""}</span><span className="font-semibold text-[#fffef1]/70">{formatPrice(total)}</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-[#fffef1]/45">Shipping & VAT</span><span className="text-[#fffef1]/45 italic text-[10px]">On invoice</span></div>
                  </div>
                  <div className="border-t border-[#fffef1]/15 mt-3 pt-3 flex justify-between items-baseline">
                    <span className="text-[9.5px] font-bold text-[#fffef1]/55 uppercase tracking-[0.22em]">Estimated Total</span>
                    <span className="text-[26px] font-bold text-[#fffef1] tracking-tight leading-none">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="relative px-6 py-3 border-t border-[#fffef1]/10 flex items-center justify-between">
                  {[{ icon: ShieldCheck, l: "Protected" }, { icon: Lock, l: "Encrypted" }, { icon: Globe, l: "VND · EUR · USD" }].map(t => (
                    <div key={t.l} className="flex items-center gap-1 text-[#fffef1]/55"><t.icon className="w-3 h-3 text-[#0A7060]" /><span className="text-[8.5px] font-bold uppercase tracking-wider">{t.l}</span></div>
                  ))}
                </div>
              </div>

              {/* Help card */}
              <div className="bg-white rounded-2xl border border-[#003933]/12 p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55 mb-1.5">§ Need Help?</div>
                <h4 className="text-[14px] font-semibold text-[#0a0a0a] mb-1 tracking-tight">Talk to our <span className="italic font-serif text-[#003933] font-medium">desk</span></h4>
                <p className="text-[11px] text-[#0a0a0a]/55 mb-3 leading-relaxed">We respond within 24 hours — custom quotes, bulk pricing, shipping questions.</p>
                <a href="mailto:Exencolimited@gmail.com" className="group flex items-center gap-2.5 bg-[#fffef1] border border-[#003933]/15 hover:border-[#003933]/40 hover:bg-[#003933]/5 rounded-xl px-3.5 py-2.5 transition-all">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#003933] to-black flex items-center justify-center flex-shrink-0"><Mail className="w-3 h-3 text-[#fffef1]" /></div>
                  <span className="text-[11px] font-semibold text-[#003933] group-hover:text-[#003933] transition-colors truncate">Exencolimited@gmail.com</span>
                  <ArrowUpRight className="w-3 h-3 text-[#003933]/45 group-hover:rotate-45 transition-transform duration-300 ml-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* ══ Form · RIGHT ══ */}
          <div className="lg:col-span-8 order-1 lg:order-2">

            {/* ── STEP 1: Cart ── */}
            {step === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[10px] font-bold text-[#003933]/55 uppercase tracking-[0.22em]">§ {count} Item{count !== 1 ? "s" : ""} in Cart</h3>
                  <Link href="/shop" className="text-[11px] font-semibold text-[#003933] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-all">+ Add more</Link>
                </div>
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4 border border-[#003933]/10 hover:border-[#003933]/25 transition-colors">
                    <Link href={`/product/${item.id}`} className="w-20 h-20 bg-[#fffef1] rounded-xl overflow-hidden flex-shrink-0 border border-[#003933]/10">
                      <Image src={item.thumbnail || "/placeholder.jpg"} alt={item.title || ""} width={80} height={80} className="w-full h-full object-contain p-2" unoptimized />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/product/${item.id}`}><h4 className="text-[12.5px] font-semibold text-[#0a0a0a] line-clamp-2 leading-snug hover:text-[#003933] transition-colors">{item.title}</h4></Link>
                        <button onClick={() => removeFromCart(item.id)} aria-label="Remove" className="text-[#003933]/35 hover:text-red-600 p-1 transition-colors flex-shrink-0"><X className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center h-8 bg-[#003933] rounded-full">
                          <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center text-[#fffef1]/60 hover:text-[#fffef1] transition-colors">{item.quantity === 1 ? <X className="w-3 h-3" /> : <Minus className="w-3 h-3" />}</button>
                          <span className="w-5 text-center text-[11px] font-bold text-[#fffef1]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center text-[#fffef1]/60 hover:text-[#fffef1] transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-[15px] font-bold text-[#003933]">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── STEP 2: Contact + Business ── */}
            {step === 2 && (
              <div className="bg-white rounded-3xl border border-[#003933]/12 overflow-hidden">
                <div className="p-6 lg:p-7">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[#003933]/10 flex items-center justify-center"><User className="w-4 h-4 text-[#003933]" /></div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55">§ 01</div>
                      <h3 className="text-[15px] font-semibold text-[#0a0a0a] tracking-tight leading-tight">Contact Information</h3>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Inp label="First Name" name="firstName" value={fd.firstName} onChange={up} placeholder="Nguyen" req />
                    <Inp label="Last Name" name="lastName" value={fd.lastName} onChange={up} placeholder="Minh" req />
                    <div className="sm:col-span-2">
                      <Inp label="Email" name="email" type="email" value={fd.email} onChange={up} placeholder="you@company.com" req />
                      <p className="text-[10px] text-[#003933]/55 mt-1.5 flex items-center gap-1 font-medium"><Mail className="w-2.5 h-2.5" />Invoice and order updates will be sent here</p>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-[#003933]/10 mx-6 lg:mx-7" />
                <div className="p-6 lg:p-7">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center"><Building2 className="w-4 h-4 text-[#fffef1]" /></div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55">§ 02</div>
                      <h3 className="text-[15px] font-semibold text-[#0a0a0a] tracking-tight leading-tight">Business Details</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Inp label="Company Name" name="company" value={fd.company} onChange={up} placeholder="Your Company Ltd." req />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Inp label="Business Type" name="businessType" value={fd.businessType} onChange={up} placeholder="e.g., IT Reseller" />
                      <Inp label="Tax / VAT Number" name="vatNumber" value={fd.vatNumber} onChange={up} placeholder="e.g., ESB12345678" />
                    </div>
                    <div className="bg-[#003933]/5 border border-[#003933]/12 rounded-xl p-3.5 flex items-start gap-2.5">
                      <FileText className="w-3.5 h-3.5 text-[#003933] flex-shrink-0 mt-0.5" />
                      <p className="text-[10.5px] text-[#0a0a0a]/65 leading-relaxed">Tax-registered businesses may qualify for VAT exemption on cross-border orders. Settle in <span className="font-semibold text-[#003933]">VND · EUR · USD</span>.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Shipping ── */}
            {step === 3 && (
              <div className="bg-white rounded-3xl border border-[#003933]/12 p-6 lg:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#003933]/10 flex items-center justify-center"><Truck className="w-4 h-4 text-[#003933]" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#003933]/55">§ Delivery</div>
                    <h3 className="text-[15px] font-semibold text-[#0a0a0a] tracking-tight leading-tight">Shipping Address</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.18em] mb-1.5 block">Country <span className="text-[#003933]">*</span></Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="h-11 border border-[#003933]/20 rounded-xl text-[13px] focus:border-[#003933] focus:ring-2 focus:ring-[#003933]/10 bg-white"><SelectValue /></SelectTrigger>
                      <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Inp label="Street Address" name="address" value={fd.address} onChange={up} placeholder="Building, street & floor" req />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Inp label="City" name="city" value={fd.city} onChange={up} placeholder="Hanoi" req />
                    <Inp label="Postal Code" name="postalCode" value={fd.postalCode} onChange={up} placeholder="100000" req />
                    <div className="col-span-2 sm:col-span-1">
                      <Inp label="Region / Province" name="region" value={fd.region} onChange={up} placeholder="Optional" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-[10.5px] text-[#003933]/65 font-semibold"><Globe className="w-3 h-3 text-[#0A7060]" />Worldwide delivery · Vietnam · EU · International routes</div>
                </div>
              </div>
            )}

            {/* ── STEP 4: Review ── */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { icon: User, label: "Contact", lines: [`${fd.firstName} ${fd.lastName}`, fd.email], s: 2 },
                    { icon: Building2, label: "Company", lines: [fd.company || "—", fd.vatNumber || "No VAT"], s: 2 },
                    { icon: MapPin, label: "Ship to", lines: [fd.address, `${fd.postalCode} ${fd.city}`, country], s: 3 },
                  ].map(c => (
                    <div key={c.label} className="flex-1 bg-white rounded-2xl border border-[#003933]/12 p-4">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-1.5"><c.icon className="w-3.5 h-3.5 text-[#003933]" /><span className="text-[9.5px] font-bold text-[#003933]/60 uppercase tracking-[0.22em]">{c.label}</span></div>
                        <button onClick={() => setStep(c.s)} className="text-[10px] font-semibold text-[#003933] border-b border-[#003933]/30 hover:border-[#003933] pb-0.5 transition-all">Edit</button>
                      </div>
                      {c.lines.map((l, i) => <p key={i} className={`text-[11px] leading-relaxed ${i === 0 ? "font-semibold text-[#0a0a0a]" : "text-[#0a0a0a]/55"}`}>{l}</p>)}
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border border-[#003933]/12 overflow-hidden">
                  <div className="px-5 py-3 border-b border-[#003933]/10 flex items-center justify-between">
                    <h3 className="text-[10px] font-bold text-[#003933]/60 uppercase tracking-[0.22em]">§ Order Items</h3>
                    <span className="text-[10px] font-bold text-[#003933]/55">{count} item{count !== 1 ? "s" : ""}</span>
                  </div>
                  {cartItems.map((item, idx) => (
                    <div key={item.id} className={`flex items-center gap-3 px-5 py-3 ${idx < cartItems.length - 1 ? "border-b border-[#003933]/8" : ""}`}>
                      <div className="w-11 h-11 bg-[#fffef1] rounded-lg overflow-hidden border border-[#003933]/10 flex-shrink-0"><Image src={item.thumbnail || "/placeholder.jpg"} alt="" width={44} height={44} className="w-full h-full object-contain p-1.5" unoptimized /></div>
                      <div className="flex-1 min-w-0"><h4 className="text-[11.5px] font-semibold text-[#0a0a0a] line-clamp-1">{item.title}</h4><span className="text-[9.5px] text-[#003933]/55 font-medium">Qty × {item.quantity}</span></div>
                      <span className="text-[12px] font-bold text-[#003933] flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Payment banner */}
                <div className="relative bg-gradient-to-br from-[#003933] to-black text-[#fffef1] rounded-2xl p-5 overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[radial-gradient(circle,#0A7060_0%,transparent_70%)] opacity-60 blur-2xl" />
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle,#fffef1 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
                  </div>
                  <div className="relative flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#fffef1]/10 border border-[#fffef1]/15 flex items-center justify-center flex-shrink-0"><Receipt className="w-4 h-4 text-[#0A7060]" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#0A7060] mb-1">§ Payment Method</div>
                      <h4 className="text-[14px] font-semibold tracking-tight mb-1">Bank transfer · <span className="italic font-serif text-[#0A7060] font-medium">tri-currency</span></h4>
                      <p className="text-[11px] text-[#fffef1]/65 leading-relaxed">A pro-forma invoice will be sent to your email in VND, EUR, or USD. Reach us at <a href="mailto:Exencolimited@gmail.com" className="text-[#fffef1] font-semibold border-b border-[#fffef1]/30 hover:border-[#fffef1] pb-0.5 transition-all">Exencolimited@gmail.com</a> for settlement details.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10.5px] text-[#003933]/65 font-semibold"><Sparkles className="w-3 h-3 text-[#0A7060]" /><span>By submitting you agree to our terms & accept manufacturer warranty terms.</span></div>
              </div>
            )}

            {/* ── Action bar ── */}
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#003933]/10">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="text-[12px] font-semibold text-[#003933]/70 hover:text-[#003933] transition-colors flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" />Back</button>
              ) : <div />}
              {step < 4 ? (
                <Button onClick={next} className="group bg-black hover:bg-[#003933] text-[#fffef1] h-11 px-7 rounded-full text-[12.5px] font-semibold transition-all duration-300 shadow-md shadow-[#003933]/20 hover:shadow-lg hover:shadow-[#003933]/30 hover:-translate-y-0.5">
                  Continue <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 group-hover:rotate-45 transition-transform duration-300" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={busy} className="group bg-gradient-to-br from-[#003933] to-black text-[#fffef1] h-12 px-10 rounded-full text-[13px] font-semibold shadow-lg shadow-[#003933]/25 hover:shadow-[#003933]/45 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0">
                  {busy ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Processing…</> : <>Submit Order <ArrowUpRight className="w-4 h-4 ml-2 group-hover:rotate-45 transition-transform duration-300" /></>}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-6 lg:h-10" />
    </div>
  );
}
