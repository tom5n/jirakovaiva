import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
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
    <>
      <section
        id="home"
        className="min-h-screen flex items-center relative bg-[#F3E8E2]"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-1 md:order-1 mt-16 md:mt-0">
            <h2 className="reveal reveal-delay-200 text-3xl md:text-4xl lg:text-5xl text-[#21435F] font-['Montserrat'] font-light mb-6">
              Proměňte svou vášeň<br />
              v <strong className="font-medium">úspěšné podnikání.</strong><br />
            </h2>
            <p className="reveal reveal-delay-400 text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
            Pomáhám ženám vydělávat online odkudkoliv. Vybudujte si kariéru z pohodlí domova.
            </p>
            <div className="reveal reveal-delay-600 flex flex-col sm:flex-row gap-4">
              <a href="#collaboration" className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center px-8 py-4 text-lg rounded-full group">
                Chci vědět víc
                <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <a href="#contact" className="bg-[#FFD1C1] text-gray-800 hover:bg-[#FFD1C1]/90 transition-colors duration-300 flex items-center justify-center px-8 py-4 text-lg rounded-full">
                Kontaktujte mě
              </a>
            </div>
          </div>
          <div className="order-2 md:order-2 flex justify-center">
            <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] lg:w-[500px] lg:h-[500px] reveal group">
              <div className="hidden sm:block absolute -top-4 -left-4 w-[270px] h-[270px] md:w-[290px] md:h-[290px] lg:w-[530px] lg:h-[530px] rounded-full border-4 border-[#21435F]/20"></div>
              <div className="hidden sm:block absolute -top-8 -left-8 w-[300px] h-[300px] md:w-[320px] md:h-[320px] lg:w-[560px] lg:h-[560px] rounded-full border-4 border-[#FFD1C1]/30"></div>
              
              <div className="absolute inset-0 rounded-full overflow-hidden transform transition-all duration-700 group-hover:scale-[1.02]">
                <img
                  src="/images/heroimg.webp"
                  alt="Ivana Jiráková"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full">
        <img src="/images/sepikis.svg" alt="Separator" className="w-full h-auto" />
      </div>
    </>
  );
};

export default Hero;
