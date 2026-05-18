import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Circle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoHead from '../components/SeoHead';

const KoucinkFiremni = () => {
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
    "vyšší výkonnosti a efektivity",
    "jistoty v roli lídra",
    "lepší komunikace a práce s týmem",
    "stabilnější firemní kultury",
    "lepší výsledky firmy i zaměstnanců",
  ];

  const whatIsIncluded = [
    "Koučink pro manažery (1:1)",
    "Mentoring leadership dovedností",
    "Podporu při řízení lidí, delegování, motivaci a komunikaci",
    "Analýzu firemních situací",
    "Doporučení pro efektivní vedení týmů",
  ];

  return (
    <>
      <SeoHead
        title="Leadership koučink a firemní mentoring | Ivana Jiráková"
        description="Práce s lídry, manažery a týmy na zvyšování výkonu, sebevědomí, komunikace a firemní kultury."
        url="https://www.jirakovaiva.cz/koucink/firemni"
      />
      <div className="min-h-screen bg-[#F3E8E2]">
        <Navbar />
        {/* Hero sekce */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 flex items-center relative bg-[#F3E8E2]">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1 md:order-1">
               <h2 className="reveal reveal-delay-200 text-4xl md:text-5xl lg:text-6xl text-[#21435F] font-['Montserrat'] font-light mb-6">
                 Leadership koučink & <strong className="font-medium">firemní mentoring</strong>
               </h2>
              <p className="reveal reveal-delay-400 text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
                Profesní růst pro lídry, manažery a týmy, kteří chtějí vést efektivněji a sebevědoměji.
              </p>
              <div className="reveal reveal-delay-600 mb-8">
                <span className="text-3xl font-bold text-[#21435F] font-['Montserrat']">
                  od 4 500 Kč / hod
                </span>
              </div>
              <div className="reveal reveal-delay-600">
                <button
                  onClick={() => navigate('/rezervace', { state: { program: 'Leadership koučink a firemní mentoring' } })}
                  className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-10 py-5 text-xl rounded-full font-medium font-['Montserrat'] group"
                >
                  Rezervovat
                  <ArrowRight size={22} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </div>
            </div>
            <div className="order-2 md:order-2">
              <div className="bg-[#FFD1C1] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[#21435F] reveal transition-all duration-300 hover:shadow-xl">
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
        </section>
        <div className="w-full">
          <img src="/images/dividers/1.svg" alt="Separator" className="w-full h-auto" />
        </div>

        {/* Sekce se 2 containery */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
             <div className="grid md:grid-cols-2 gap-8 items-start">
               {/* Co tím klient dosáhne */}
               <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-[#21435F] reveal transition-all duration-300 hover:shadow-xl z-10 flex flex-col self-start">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                 <div className="p-8 flex flex-col">
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
               </div>

              {/* Jak to funguje */}
              <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-[#21435F] reveal reveal-delay-200 transition-all duration-300 hover:shadow-xl z-10 flex flex-col self-start">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="p-8 flex flex-col">
                  <h2 className="text-2xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">
                    Jak to funguje
                  </h2>
                <p className="text-lg text-gray-700 font-['Montserrat'] leading-relaxed mb-6">
                  Koučink probíhá individuálně nebo ve firmě, podle potřeb vedení. Pracujeme s reálnými situacemi a hledáme praktická řešení.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-base text-gray-700 font-['Montserrat']">- 1 hodina: 4 500 Kč</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">- 3 hodiny: 10 900 Kč</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">- 5 hodin: 17 900 Kč</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">- Dlouhodobá spolupráce (měsíční program): od 29 000 Kč</p>
                </div>
                 </div>
               </div>
             </div>
          </div>
        </section>
        <div className="w-full">
          <img src="/images/dividers/koucink/3.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default KoucinkFiremni;

