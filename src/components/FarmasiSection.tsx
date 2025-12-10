import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FarmasiSection = () => {
  const navigate = useNavigate();

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
    <section id="farmasi" className="section-padding bg-[#F3E8E2]">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden reveal group">
                <img
                  src="/images/farmasi-section.webp"
                  alt="Podnikej s FARMASI"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    // Fallback na jiný obrázek, pokud farmasi-section.webp neexistuje
                    (e.target as HTMLImageElement).src = "/images/course1.webp";
                  }}
                />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Dancing_Script'] mb-8 text-[#21435F] reveal">
              Podnikej s FARMASI
            </h2>
            <p className="text-lg text-gray-700 mb-6 reveal reveal-delay-200">
              FARMASI je mezinárodní kosmetická společnost s více než 30letou tradicí, která nabízí širokou škálu prémiových kosmetických produktů. Jako TOP 1. ředitelka pro Centrální Evropu vám mohu pomoci začít podnikat s FARMASI a vybudovat si vlastní úspěšné podnikání.
            </p>
            <p className="text-lg text-gray-700 mb-6 reveal reveal-delay-400">
              Společně můžeme vytvořit plán, jak začít, jak budovat svůj tým a jak dosáhnout finanční nezávislosti. Nabízím kompletní podporu, školení a mentoring pro všechny, kteří chtějí začít podnikat s FARMASI.
            </p>
            <div className="reveal reveal-delay-600">
              <button
                onClick={() => {
                  navigate('/farmasi');
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }}
                className="inline-flex items-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full group"
              >
                Zjistit více
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmasiSection;

