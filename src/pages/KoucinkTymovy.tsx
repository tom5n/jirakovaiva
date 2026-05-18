import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ArrowLeft, Circle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoHead from '../components/SeoHead';

const KoucinkTymovy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize reveal animations
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

  const features = [
    "lepší atmosféry v rodině",
    "porozumění dětským emocím",
    "snížení napětí a hádek",
    "jistoty v roli rodiče",
    "harmonického fungování celé rodiny",
  ];

  const whatIsIncluded = [
    "Rozhovory s rodičem/rodiči (dle potřeby)",
    "Analýzu rodinné situace a konkrétních scénářů",
    "Praktické techniky komunikace",
    "Doporučení pro domácí aplikaci",
    "Podporu při práci s emocemi u dětí i rodičů",
  ];

  return (
    <>
      <SeoHead
        title="Koučink pro rodiny a rodiče s dětmi | Ivana Jiráková"
        description="Koučink pro malé týmy a skupiny zaměřený na budování silného týmu. Společné cíle a týmová dynamika."
        url="https://www.jirakovaiva.cz/koucink/rodiny"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        {/* Hero sekce */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 flex items-center relative bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1 md:order-1">
               <h2 className="reveal reveal-delay-200 text-4xl md:text-5xl lg:text-6xl text-[#21435F] font-['Montserrat'] font-light mb-6">
                 Koučink pro <strong className="font-medium">rodiny</strong> a rodiče s dětmi
               </h2>
              <p className="reveal reveal-delay-400 text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
                Podpora rodičů při komunikaci s dětmi, řešení napětí a budování zdravých rodinných vztahů.
              </p>
              <div className="reveal reveal-delay-600 mb-8">
                <span className="text-3xl font-bold text-[#21435F] font-['Montserrat']">
                  od 2 900 Kč / hod
                </span>
              </div>
              <div className="reveal reveal-delay-600">
                <button
                  onClick={() => navigate('/rezervace', { state: { program: 'Koučink pro rodiny a rodiče s dětmi' } })}
                  className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-10 py-5 text-xl rounded-full font-medium font-['Montserrat'] group"
                >
                  Rezervovat
                  <ArrowRight size={22} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </div>
            </div>
            <div className="order-2 md:order-2">
              <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-[#21435F] reveal transition-all duration-300 hover:shadow-xl z-10 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="p-8 flex flex-col">
                  <h3 className="text-2xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">
                    Co balíček obsahuje
                  </h3>
                  <ul className="space-y-3">
                    {whatIsIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Circle
                          size={8}
                          className="text-[#21435F] flex-shrink-0 mt-2 fill-[#21435F]"
                        />
                        <span className="text-gray-700 text-lg font-['Montserrat']">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full">
          <img src="/images/dividers/5.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
        </div>

        {/* Sekce se 2 containery */}
        <section className="section-padding bg-[#F3E8E2]">
          <div className="container mx-auto">
             <div className="grid md:grid-cols-2 gap-8 items-start">
               {/* Co tím klient dosáhne */}
               <div className="bg-[#FFD1C1] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[#21435F] reveal transition-all duration-300 hover:shadow-xl self-start">
                 <h2 className="text-2xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">
                   Co tím získáte?
                 </h2>
                 <ul className="space-y-3">
                   {features.map((feature, index) => (
                     <li key={index} className="flex items-start gap-3">
                       <Check
                         size={18}
                         className="text-[#21435F] flex-shrink-0 mt-0.5"
                       />
                       <span className="text-gray-700 text-base font-['Montserrat']">
                         {feature}
                       </span>
                     </li>
                   ))}
                 </ul>
               </div>

              {/* Jak to funguje */}
              <div className="bg-[#FFD1C1] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[#21435F] reveal reveal-delay-200 transition-all duration-300 hover:shadow-xl self-start">
                <h2 className="text-2xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">
                  Jak to funguje
                </h2>
                <p className="text-lg text-gray-700 font-['Montserrat'] leading-relaxed mb-6">
                  Společně popíšeme problémové situace a hledáme nové způsoby, jak je zvládat. Rodiče dostávají konkrétní nástroje, které mohou ihned používat doma.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-base text-gray-700 font-['Montserrat']">- Úvodní konzultace: 500 Kč</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">- 1 hodina: 2 900 Kč / 75 min</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">- 3 hodiny: 6 900 Kč</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">- 5 hodin: 10 900 Kč</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">- Dlouhodobá spolupráce (4 sezení): 10 400 Kč</p>
                </div>
              </div>
             </div>
          </div>
        </section>
        <div className="w-full">
          <img src="/images/dividers/6.svg" alt="Separator" className="w-full h-auto" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default KoucinkTymovy;

