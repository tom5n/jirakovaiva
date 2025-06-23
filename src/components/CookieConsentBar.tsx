import React, { useEffect, useState } from "react";
import { ShieldCheck, BarChart2, Megaphone, SlidersHorizontal, Cookie, Check } from "lucide-react";

// @ts-ignore
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

const COOKIE_KEY = "cookie_consent_v2";

type CookieSettings = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const defaultSettings: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

// Switch komponenta (slider)
const Switch = ({ checked, onChange, disabled = false }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) => (
  <button
    type="button"
    className={`relative inline-flex h-6 w-12 items-center rounded-full border-2 transition-colors duration-200 focus:outline-none ${checked ? 'bg-[#21435F] border-[#21435F]' : 'bg-gray-200 border-gray-300'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    onClick={() => !disabled && onChange(!checked)}
    aria-checked={checked}
    role="switch"
    disabled={disabled}
    style={{ minWidth: 48 }}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const CookieConsentBar = () => {
  const [showBar, setShowBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({
          necessary: true,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
          preferences: !!parsed.preferences,
        });
        if (parsed.analytics) enableAnalytics();
        if (parsed.marketing) enableMarketing();
        setShowBar(false);
      } catch {
        setShowBar(true);
      }
    } else {
      setShowBar(true);
    }
    setInitialized(true);
    // Listener pro otevření nastavení cookies odkudkoliv
    const openSettings = () => setShowModal(true);
    window.addEventListener('openCookieSettings', openSettings);
    return () => window.removeEventListener('openCookieSettings', openSettings);
  }, []);

  const handleAcceptAll = () => {
    const newSettings: CookieSettings = { necessary: true, analytics: true, marketing: true, preferences: true };
    setSettings(newSettings);
    localStorage.setItem(COOKIE_KEY, JSON.stringify(newSettings));
    setShowBar(false);
    enableAnalytics();
    enableMarketing();
  };

  const handleOnlyNecessary = () => {
    const newSettings: CookieSettings = { necessary: true, analytics: false, marketing: false, preferences: false };
    setSettings(newSettings);
    localStorage.setItem(COOKIE_KEY, JSON.stringify(newSettings));
    setShowBar(false);
  };

  const handleSaveSettings = () => {
    const saveSettings: CookieSettings = {
      necessary: true,
      analytics: settings.analytics,
      marketing: settings.marketing,
      preferences: settings.preferences,
    };
    setSettings(saveSettings);
    localStorage.setItem(COOKIE_KEY, JSON.stringify(saveSettings));
    setShowBar(false);
    setShowModal(false);
    if (settings.analytics) enableAnalytics();
    if (settings.marketing) enableMarketing();
  };

  function enableAnalytics() {
    if (!window.gtag) {
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = "https://www.googletagmanager.com/gtag/js?id=G-H85PH5XKQ0";
      document.head.appendChild(script1);
      const script2 = document.createElement("script");
      script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-H85PH5XKQ0');`;
      document.head.appendChild(script2);
    }
  }
  function enableMarketing() {
    if (!window.fbq) {
      const script = document.createElement("script");
      script.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1537688336748642');fbq('track', 'PageView');`;
      document.head.appendChild(script);
    }
  }

  if (!initialized) return null;

  return (
    <>
      {/* Cookie lišta */}
      {showBar && (
        <div className="fixed bottom-0 left-0 w-full z-[9999] flex justify-center px-2 pb-4 animate-fade-in">
          <div className="container mx-auto max-w-7xl bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-[#FFD1C1]">
            <div className="flex-1 text-sm text-gray-800">
              <div className="flex items-center gap-2 font-bold text-base mb-1"><Cookie className="w-5 h-5 text-[#21435F]" />Používáme cookies</div>
              <div className="mb-1">Tento web používá cookies pro analýzu návštěvnosti a marketingové účely. Svůj výběr můžete kdykoli upravit v nastavení.<br/>Pro více informací si přečtěte celé <a href="/cookies" className="text-[#21435F] underline hover:text-[#18324a] transition-colors">zásady používání cookies</a>.</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-2 min-w-[320px] md:justify-end">
              <button onClick={handleAcceptAll} className="bg-[#21435F] text-white px-5 py-2 rounded-full font-medium transition-colors duration-300 hover:bg-[#21435F]/90 group">Přijmout vše</button>
              <button onClick={handleOnlyNecessary} className="bg-[#F3E8E2] text-[#21435F] border border-[#21435F] px-5 py-2 rounded-full font-medium hover:bg-[#FFD1C1] transition">Pouze nezbytné</button>
              <button onClick={() => setShowModal(true)} className="border border-[#21435F] text-[#21435F] bg-white px-5 py-2 rounded-full font-medium hover:bg-[#F3E8E2] transition">Nastavení</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pro nastavení cookies */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-[#21435F] text-2xl md:text-xl font-bold p-2 leading-none">×</button>
            <h2 className="text-2xl font-semibold text-[#21435F] mb-6 flex items-center gap-2"><Cookie className="w-7 h-7 text-[#21435F]" />Nastavení cookies</h2>
            <div className="space-y-6">
              {/* Nezbytné cookies */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <b>Nezbytné cookies</b>
                  <div className="text-gray-600 text-sm">Tyto cookies jsou nezbytné pro fungování webu a nemohou být vypnuty.</div>
                </div>
                <Switch checked disabled onChange={() => {}} />
              </div>
              {/* Analytické cookies */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <b>Analytické cookies</b>
                  <div className="text-gray-600 text-sm">Pomáhají nám pochopit, jak návštěvníci používají web.</div>
                </div>
                <Switch checked={settings.analytics} onChange={v => setSettings(s => ({ ...s, analytics: v }))} />
              </div>
              {/* Marketingové cookies */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <b>Marketingové cookies</b>
                  <div className="text-gray-600 text-sm">Používají se ke sledování návštěvníků napříč webovými stránkami.</div>
                </div>
                <Switch checked={settings.marketing} onChange={v => setSettings(s => ({ ...s, marketing: v }))} />
              </div>
              {/* Preferenční cookies */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <b>Preferenční cookies</b>
                  <div className="text-gray-600 text-sm">Umožňují webu zapamatovat si vaše předvolby a preference.</div>
                </div>
                <Switch checked={settings.preferences} onChange={v => setSettings(s => ({ ...s, preferences: v }))} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-8">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition">Zrušit</button>
              <button onClick={handleSaveSettings} className="px-5 py-2 rounded-lg bg-[#21435F] text-white font-medium hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center gap-2"><Check className="w-5 h-5 text-white" />Uložit nastavení</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBar; 