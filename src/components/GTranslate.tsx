"use client";
import { useEffect, useRef } from 'react';

export default function GTranslate() {
  const init = useRef(false);
  useEffect(() => {
    if (init.current || typeof window === 'undefined') return;
    (window as unknown as { gtranslateSettings: Record<string, unknown> }).gtranslateSettings = {
      default_language: "vi",
      native_language_names: true,
      languages: ["vi", "en"],
      wrapper_selector: ".gtranslate_wrapper",
      switcher_horizontal_position: "right",
      switcher_text_color: "#fffef1",
      switcher_arrow_color: "#0A7060",
      switcher_border_color: "#0A7060",
      switcher_background_color: "#003933",
      switcher_background_shadow_color: "#000000",
      switcher_background_hover_color: "#0A7060",
      dropdown_text_color: "#0a0a0a",
      dropdown_hover_color: "#003933",
      dropdown_background_color: "#fffef1",
    };
    const s = document.createElement('script');
    s.src = 'https://cdn.gtranslate.net/widgets/latest/dwf.js';
    s.defer = true;
    document.head.appendChild(s);
    init.current = true;
    return () => { document.querySelector('script[src*="gtranslate"]')?.remove(); };
  }, []);

  return <div className="flex items-center"><div className="gtranslate_wrapper" /></div>;
}
