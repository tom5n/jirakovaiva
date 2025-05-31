import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const Courses = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  // Automatické promítání slidů
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000); // Změna každých 5 sekund

    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const slides = [
    {
      image: "/images/course1.webp",
      alt: "Kurz líčení a podnikání"
    },
    {
      image: "/images/course2.webp",
      alt: "Skupinové školení"
    },
    {
      image: "/images/course3.webp",
      alt: "Individuální mentoring"
    }
  ];

  return (
    <section id="courses" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 reveal">
            <h2 className="section-title text-[#21435F]">
              Kurzy a školení
            </h2>
            <p className="text-lg text-gray-700">
              Už od roku 2019 pořádám kurzy, školení i individuální mentoring zaměřený na rozvoj podnikatelského myšlení, osobní růst a praktické školení pro ženy (ale i muže), kteří chtějí začít podnikat, vydělávat online a stát se nezávislými.
            </p>
            <p className="text-lg text-gray-700">
              V rámci lektorské činnosti nabízím školení pro jednotlivce i skupiny – od prvních kroků v podnikání, přes time management, až po konkrétní strategie v přímém prodeji a online světě. Zároveň pořádám tematické kurzy líčení, kde propojuji krásu, sebevědomí a podnikání do jednoho celku.
            </p>
            <p className="text-lg text-gray-700">
              Pokud hledáš zkušenou mentorku, která tě podpoří na tvé cestě, předá ti praktické know-how a pomůže ti rozvíjet vlastní potenciál, neváhej mě oslovit. Ráda s tebou proberu možnosti spolupráce, ať už individuálně nebo v rámci skupinových kurzů.
            </p>
            <a 
              href="/rezervace" 
              className="inline-flex items-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full group"
            >
              Rezervovat schůzku
              <Calendar size={18} className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-0 reveal reveal-delay-200 border border-[#21435F] transition-all duration-300 hover:shadow-xl">
            <div className="relative">
              <div 
                className="overflow-hidden rounded-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div 
                  className="transition-all duration-700 ease-in-out flex"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {slides.map((slide, index) => (
                    <div 
                      key={index}
                      className="w-full flex-shrink-0"
                    >
                      <div className="relative w-full aspect-square h-full">
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Overlay navigace */}
                <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md text-[#21435F] transition-all"
                    aria-label="Předchozí"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md text-[#21435F] transition-all"
                    aria-label="Další"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-[#21435F]' 
                          : 'bg-white/60'
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses; 