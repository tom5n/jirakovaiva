import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ArrowLeft, Circle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeoHead from '../components/SeoHead';

const KoucinkOsobni = () => {
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
    "Individuální přístup přizpůsobený Vašim potřebám",
    "Flexibilní termíny schůzek",
    "Osobní podpora a vedení",
    "Pomoc s definováním a dosažením cílů",
    "Techniky osobního rozvoje",
    "Pravidelné konzultace a zpětná vazba",
  ];

  const whatIsIncluded = [
    "Úvodní konzultace a analýza potřeb",
    "Individuální koučovací sezení",
    "Akční plány a strategie",
    "Materiály a zdroje pro osobní rozvoj",
    "Emailová podpora mezi sezeními",
    "Pravidelné hodnotící schůzky",
  ];

  return (
    <>
      <SeoHead
        title="Osobní koučink | Ivana Jiráková"
        description="Individuální koučink zaměřený na Váš osobní růst a dosažení Vašich cílů. Flexibilní termíny a osobní přístup."
        url="https://www.jirakovaiva.cz/koucink/osobni"
      />
      <div className="min-h-screen bg-[#F3E8E2]">
        <Navbar />
        {/* Hero sekce */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 flex items-center relative bg-[#F3E8E2]">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1 md:order-1">
               <h2 className="reveal reveal-delay-200 text-4xl md:text-5xl lg:text-6xl text-[#21435F] font-['Montserrat'] font-light mb-6">
                 <strong className="font-medium">Osobní</strong> koučink
               </h2>
              <p className="reveal reveal-delay-400 text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
                Individuální koučink zaměřený na Váš osobní růst a dosažení Vašich cílů
              </p>
              <div className="reveal reveal-delay-600 mb-8">
                <span className="text-3xl font-bold text-[#21435F] font-['Montserrat']">
                  od 2 500 Kč
                </span>
              </div>
              <div className="reveal reveal-delay-600">
                <button
                  onClick={() => navigate('/rezervace', { state: { program: 'Osobní koučink' } })}
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
               {/* Co nabízíme */}
               <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-[#21435F] reveal transition-all duration-300 hover:shadow-xl z-10 flex flex-col self-start">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                 <div className="p-8 flex flex-col">
                   <h2 className="text-2xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">
                     Co Vám nabízím
                   </h2>
                   <p className="text-lg text-gray-700 mb-6 font-['Montserrat'] leading-relaxed">
                     Osobní koučink je individuální proces, který Vám pomůže najít Vaši cestu, překonat překážky a dosáhnout Vašich cílů. 
                     Společně projdeme každým krokem Vašeho rozvoje a vytvoříme strategii, která Vám bude vyhovovat.
                   </p>
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
               <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-[#21435F] reveal reveal-delay-200 transition-all duration-300 hover:shadow-xl z-10 flex flex-col h-full">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                 <div className="p-8 flex flex-col flex-1">
                   <h2 className="text-2xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">
                     Jak to funguje
                   </h2>
                   <div className="space-y-6">
                     <div className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 bg-[#21435F] text-white rounded-full flex items-center justify-center font-bold font-['Montserrat'] text-base">
                         1
                       </div>
                       <div>
                         <h3 className="text-lg font-medium text-[#21435F] mb-2 font-['Montserrat']">
                           Úvodní konzultace
                         </h3>
                         <p className="text-base text-gray-700 font-['Montserrat'] leading-relaxed">
                           Společně probereme Vaše cíle, očekávání a aktuální situaci. Tato konzultace nám pomůže vytvořit individuální plán.
                         </p>
                       </div>
                     </div>
                     <div className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 bg-[#21435F] text-white rounded-full flex items-center justify-center font-bold font-['Montserrat'] text-base">
                         2
                       </div>
                       <div>
                         <h3 className="text-lg font-medium text-[#21435F] mb-2 font-['Montserrat']">
                           Individuální sezení
                         </h3>
                         <p className="text-base text-gray-700 font-['Montserrat'] leading-relaxed">
                           Pravidelná koučovací sezení zaměřená na Vaše konkrétní potřeby a cíle. Každé sezení je přizpůsobeno Vašemu tempu.
                         </p>
                       </div>
                     </div>
                     <div className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 bg-[#21435F] text-white rounded-full flex items-center justify-center font-bold font-['Montserrat'] text-base">
                         3
                       </div>
                       <div>
                         <h3 className="text-lg font-medium text-[#21435F] mb-2 font-['Montserrat']">
                           Průběžná podpora
                         </h3>
                         <p className="text-base text-gray-700 font-['Montserrat'] leading-relaxed">
                           Mezi sezeními Vám poskytnu podporu a materiály, které Vám pomohou pokračovat v práci na Vašich cílech.
                         </p>
                       </div>
                     </div>
                     <div className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 bg-[#21435F] text-white rounded-full flex items-center justify-center font-bold font-['Montserrat'] text-base">
                         4
                       </div>
                       <div>
                         <h3 className="text-lg font-medium text-[#21435F] mb-2 font-['Montserrat']">
                           Hodnocení a úpravy
                         </h3>
                         <p className="text-base text-gray-700 font-['Montserrat'] leading-relaxed">
                           Pravidelně hodnotíme pokrok a upravujeme strategii podle Vašich potřeb a výsledků.
                         </p>
                       </div>
                     </div>
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

export default KoucinkOsobni;

