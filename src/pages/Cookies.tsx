import React, { useEffect } from "react";
import NewsNavbar from "../components/NewsNavbar";
import { FooterNews } from "../components/Footer";
import { Settings } from "lucide-react";

const Cookies = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NewsNavbar />
      <main className="pt-6 md:pt2">
        <section className="section-padding bg-white relative z-10">
          <div className="container mx-auto">
            <div className="mb-12 w-full flex flex-col gap-2">
              <div className="w-full flex items-center justify-between">
                <h2 className="section-title reveal inline-block text-[#21435F] mb-0 text-left">
                  Informace o cookies
                </h2>
                <button
                  type="button"
                  className="ml-4 px-5 py-3 rounded-full bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 shadow group flex items-center justify-center gap-2 text-base font-medium"
                  onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
                  aria-label="Nastavení cookies"
                >
                  <Settings className="w-7 h-7" />
                  Nastavení cookies
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-left">
                Poslední aktualizace: {new Date().toLocaleDateString('cs-CZ')}
              </p>
              <hr className="mt-6 mb-8 border-gray-200" />
            </div>

            <div className="relative z-10 space-y-8">
              {/* Co jsou cookies */}
              <div className="reveal reveal-delay-200">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Co jsou cookies?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cookies jsou malé textové soubory, které se ukládají do vašeho zařízení při návštěvě webových stránek. Díky nim si stránky pamatují vaše nastavení, přihlašovací údaje nebo například obsah košíku. Některé cookies jsou nezbytné pro správné fungování webu, jiné slouží k analýze návštěvnosti nebo marketingovým účelům.
                </p>
              </div>

              {/* Typy cookies */}
              <div className="reveal reveal-delay-300">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Jaké cookies používáme?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><b>Nezbytné cookies</b> – zajišťují základní funkce webu (např. přihlášení do administrace, bezpečnost, správné zobrazení stránek). Bez těchto cookies by web nefungoval správně. Tyto cookies nelze odmítnout.</li>
                  <li><b>Analytické cookies</b> – pomáhají nám sledovat návštěvnost a chování uživatelů na webu pomocí nástrojů jako Google Analytics. Díky nim můžeme web vylepšovat. Tyto cookies ukládáme pouze s vaším souhlasem.</li>
                  <li><b>Marketingové cookies</b> – slouží k personalizaci reklamy a měření její účinnosti (např. Facebook Pixel). Tyto cookies ukládáme pouze s vaším souhlasem.</li>
                </ul>
              </div>

              {/* Správa cookies */}
              <div className="reveal reveal-delay-400">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Jak můžete cookies spravovat?</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Při první návštěvě webu se vám zobrazí lišta s možností přijmout nebo odmítnout analytické a marketingové cookies. Svůj souhlas můžete kdykoliv změnit v nastavení prohlížeče nebo smazáním cookies z vašeho zařízení.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Většina prohlížečů umožňuje cookies spravovat, blokovat nebo mazat. Podrobné informace najdete v nápovědě vašeho prohlížeče.
                </p>
              </div>

              {/* Konkrétní cookies */}
              <div className="reveal reveal-delay-500">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Konkrétní cookies, které používáme</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><b>Google Analytics</b> – analytické cookies pro sledování návštěvnosti a chování uživatelů</li>
                  <li><b>Facebook Pixel</b> – marketingové cookies pro měření a personalizaci reklamy</li>
                  <li><b>Vlastní cookies</b> – pro zajištění funkčnosti webu (např. přihlášení do administrace)</li>
                </ul>
              </div>

              {/* Kontakt */}
              <div className="reveal reveal-delay-600">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Kontakt pro dotazy</h3>
                <p className="text-gray-700 leading-relaxed">
                  Pokud máte jakékoliv dotazy ohledně používání cookies na tomto webu, kontaktujte nás na e-mailu <b>info@jirakovaiva.cz</b>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterNews />
    </div>
  );
};

export default Cookies; 