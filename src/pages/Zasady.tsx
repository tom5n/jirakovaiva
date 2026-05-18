import React, { useEffect } from "react";
import NewsNavbar from "../components/NewsNavbar";
import { FooterNews } from "../components/Footer";

const Zasady = () => {
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
            <div className="text-center mb-12">
              <h2 className="section-title reveal inline-block text-[#21435F]">
                Zásady zpracování osobních údajů
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto reveal reveal-delay-200">
                Ochrana vašich osobních údajů je pro nás prioritou. Zde najdete informace o tom, jaké údaje zpracováváme, proč, jak dlouho a jaká máte práva.
              </p>
            </div>

            <div className="relative z-10 space-y-8">
              {/* Rozsah zpracovávaných údajů */}
              <div className="reveal reveal-delay-200">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Jaké osobní údaje zpracováváme?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Jméno a příjmení (pokud je uvedeno ve formuláři)</li>
                  <li>E-mailová adresa</li>
                  <li>Telefonní číslo (pouze pokud je poskytnuto)</li>
                  <li>Adresa (ulice, město, PSČ) – pouze pokud ji vyplníte při registraci do programu Beautybox (není povinná)</li>
                  <li>Údaje zadané při registraci do programu Beautybox</li>
                  <li>Obsah zprávy nebo dotazu</li>
                  <li>Datum a čas odeslání formuláře</li>
                  <li>Technické údaje (IP adresa, cookies – pouze pro základní funkčnost webu)</li>
                </ul>
              </div>

              {/* Účel zpracování */}
              <div className="reveal reveal-delay-300">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Proč vaše údaje zpracováváme?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Odpověď na váš dotaz nebo poptávku zaslanou přes kontaktní formulář</li>
                  <li>Vyřízení rezervace služeb</li>
                  <li>Vyřízení registrace do programu Beautybox a související komunikace</li>
                  <li>Zasílání newsletterů a informací o novinkách, akcích a kurzech (pouze na základě vašeho souhlasu)</li>
                  <li>Marketingové účely (pouze na základě vašeho souhlasu)</li>
                </ul>
              </div>

              {/* Právní důvod zpracování */}
              <div className="reveal reveal-delay-400">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Právní důvod zpracování</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Souhlas se zpracováním osobních údajů (např. pro zasílání newsletteru)</li>
                  <li>Oprávněný zájem správce (např. odpověď na dotaz, evidence rezervace)</li>
                  <li>Plnění smlouvy (např. pokud si objednáte službu)</li>
                </ul>
              </div>

              {/* Doba uchovávání údajů */}
              <div className="reveal reveal-delay-500">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Jak dlouho vaše údaje uchováváme?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Po dobu trvání vašeho souhlasu (např. do odhlášení z newsletteru)</li>
                  <li>Maximálně 3 roky od poslední interakce (pokud zákon nevyžaduje delší dobu)</li>
                  <li>Údaje z rezervací a komunikace uchováváme po dobu nezbytně nutnou k vyřízení služby a případné obrany právních nároků</li>
                </ul>
              </div>

              {/* Konkrétní zpracovatelé */}
              <div className="reveal reveal-delay-600">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Kdo vaše údaje zpracovává?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><b>Správce údajů:</b> Ivana Jiráková, IČ: 08715807, e-mail: info@jirakovaiva.cz</li>
                  <li><b>Zpracovatelé:</b>
                    <ul className="list-disc list-inside ml-6">
                      <li>Ecomail.cz (rozesílka newsletterů)</li>
                      <li>Supabase (hosting a databáze webu)</li>
                      <li>Resend (e-mailové služby)</li>
                      <li>Vercel (hosting webové aplikace)</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Práva subjektu údajů */}
              <div className="reveal reveal-delay-700">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Jaká máte práva?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Právo na přístup k osobním údajům</li>
                  <li>Právo na opravu nepřesných údajů</li>
                  <li>Právo na výmaz údajů (právo být zapomenut)</li>
                  <li>Právo na omezení zpracování</li>
                  <li>Právo na přenositelnost údajů</li>
                  <li>Právo vznést námitku proti zpracování</li>
                  <li>Právo kdykoliv odvolat souhlas se zpracováním údajů</li>
                  <li>Právo podat stížnost u Úřadu pro ochranu osobních údajů</li>
                </ul>
              </div>

              {/* Odhlášení a kontakt */}
              <div className="reveal reveal-delay-800">
                <h3 className="text-xl font-semibold text-[#21435F] mb-3">Odhlášení a kontakt</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Z odběru newsletteru se můžete kdykoliv odhlásit kliknutím na odkaz "Odhlásit se" v každém e-mailu nebo nás kontaktujte na e-mailu <b>info@jirakovaiva.cz</b>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Pokud máte jakékoliv dotazy ohledně zpracování osobních údajů, kontaktujte nás na e-mailu <b>info@jirakovaiva.cz</b>.
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

export default Zasady; 