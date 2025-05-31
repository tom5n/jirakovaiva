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
        className="bg-[#F3E8E2] w-full px-4 py-10 md:px-0 md:py-0 md:min-h-[100dvh] md:flex md:items-center md:justify-center"
      >
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-xl mx-auto md:mx-0">
            <h2 className="reveal reveal-delay-200 text-3xl md:text-4xl lg:text-5xl text-[#21435F] font-['Montserrat'] font-light mb-6">
              Proměňte svou vášeň<br />
              v <strong className="font-medium">úspěšné podnikání.</strong><br />
            </h2>
            <p className="reveal reveal-delay-400 text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
              Pomáhám ženám vydělávat online odkudkoliv. Vybudujte si kariéru z pohodlí domova.
            </p>
            <div className="reveal reveal-delay-600 flex flex-col gap-4 w-full md:flex-row md:gap-4">
              <a href="#collaboration" className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center px-8 py-4 text-lg rounded-full group w-full md:w-auto">
                Chci vědět víc
                <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <a href="#contact" className="bg-[#FFD1C1] text-gray-800 hover:bg-[#FFD1C1]/90 transition-colors duration-300 flex items-center justify-center px-8 py-4 text-lg rounded-full w-full md:w-auto">
                Kontaktujte mě
              </a>
            </div>
          </div>
          <div className="flex justify-center mt-10 md:mt-0">
            <div className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[500px] lg:h-[500px] reveal group">
              <div className="hidden sm:block absolute -top-4 -left-4 w-[270px] h-[270px] md:w-[320px] md:h-[320px] lg:w-[530px] lg:h-[530px] rounded-full border-4 border-[#21435F]/20"></div>
              <div className="hidden sm:block absolute -top-8 -left-8 w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[560px] lg:h-[560px] rounded-full border-4 border-[#FFD1C1]/30"></div>
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
