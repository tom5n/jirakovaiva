import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Brain, Briefcase, Users, Target } from "lucide-react";

const Courses = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [openIndexLeft, setOpenIndexLeft] = useState<number | null>(null);
  const [openIndexRight, setOpenIndexRight] = useState<number | null>(null);

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

  const coachingTypes = [
    {
      icon: <Brain className="w-8 h-8 text-[#21435F]" />,
      title: "Osobnostní koučink",
      description: "Zaměřuje se na osobní růst, rovnováhu v životě, sebevědomí. Řešení např. životních rozhodnutí, změny návyků, sebedůvěry, zvládání stresu. Časté zaměření: lidé ve změně, osobní rozvoj."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#21435F]" />,
      title: "Kariérní koučink",
      description: "Pomáhá lidem s kariérními rozhodnutími, změnou práce, návratem po mateřské, rozvojem dovedností. Vhodné i pro studenty, maminky, manažery hledající nový směr, lidé, kteří chtějí změnit zaměstnání."
    },
    {
      icon: <Users className="w-8 h-8 text-[#21435F]" />,
      title: "Business koučink",
      description: "Zaměřen na rozvoj podnikání, strategie, motivaci podnikatelů. Může být individuální (např. freelancerky) nebo týmový (malé firmy, MLM systémy). Vhodné pro někoho s vlastní podnikatelskou zkušeností."
    }
  ];

  const accordionItems = [
    {
      icon: <Brain size={20} color="#21435F" />,
      title: "Osobnostní koučink",
      content: "Zaměřuje se na osobní růst, rovnováhu v životě, sebevědomí. Řešení např. životních rozhodnutí, změny návyků, sebedůvěry, zvládání stresu. Časté zaměření: lidé ve změně, osobní rozvoj."
    },
    {
      icon: <Briefcase size={20} color="#21435F" />,
      title: "Kariérní koučink",
      content: "Pomáhá lidem s kariérními rozhodnutími, změnou práce, návratem po mateřské, rozvojem dovedností. Vhodné i pro studenty, maminky, manažery hledající nový směr, lidé, kteří chtějí změnit zaměstnání."
    },
    {
      icon: <Users size={20} color="#21435F" />,
      title: "Business koučink",
      content: "Zaměřen na rozvoj podnikání, strategie, motivaci podnikatelů. Může být individuální (např. freelancerky) nebo týmový (malé firmy, MLM systémy). Vhodné pro někoho s vlastní podnikatelskou zkušeností."
    },
    {
      icon: <Target size={20} color="#21435F" />,
      title: "Výkonnostní koučink",
      content: "Zaměřuje se na zvyšování výkonu, koncentrace, disciplíny a efektivity v práci. Pomáhá manažerům, lídrům i specialistům zvládat tlak, nastavovat priority a dosahovat cílů."
    }
  ];

  const handleAccordionClick = (index: number) => {
    if (openIndexLeft === index) {
      const newIndex = index === 0 ? accordionItems.length - 1 : index - 1;
      setOpenIndexLeft(newIndex);
    } else {
      setOpenIndexLeft(index);
    }
  };

  return (
    <section id="courses" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 reveal">
            <h2 className="section-title text-[#21435F]">
              Koučink a mentoring
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

            {/* Nadpis nad akordeonové karty */}
            <h3 className="text-2xl font-medium text-[#21435F] mb-6 font-['Montserrat']">Možnosti koučinku</h3>
            {/* Akordeonové karty ve dvou nezávislých sloupcích */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {/* Levý sloupec */}
              <div className="flex flex-col divide-y divide-[#21435F]/20 bg-transparent">
                {accordionItems.slice(0, 2).map((item, idx) => (
                  <div key={idx}>
                    <button
                      className="flex items-center w-full text-left group px-0 py-3 bg-transparent transition-colors border-none rounded-none shadow-none"
                      style={{outline: 'none'}}
                      onClick={() => setOpenIndexLeft(openIndexLeft === idx ? null : idx)}
                      aria-expanded={openIndexLeft === idx}
                      aria-controls={`accordion-detail-left-${idx}`}
                    >
                      <span className="bg-[#21435F]/10 rounded-full p-1 mr-2 flex-shrink-0 flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="text-[#21435F] font-medium text-sm flex-1">{item.title}</span>
                      <svg
                        className={`ml-2 transition-transform duration-200 ${openIndexLeft === idx ? 'rotate-180' : 'rotate-0'}`}
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: '#21435F' }}
                      >
                        <path d="M5 12l5-5 5 5" stroke="#21435F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openIndexLeft === idx && (
                      <div
                        id={`accordion-detail-left-${idx}`}
                        className="text-gray-600 text-xs mt-1 animate-fade-in min-h-[2.5em] px-2"
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Pravý sloupec */}
              <div className="flex flex-col divide-y divide-[#21435F]/20 bg-transparent">
                {accordionItems.slice(2, 4).map((item, idx) => (
                  <div key={idx}>
                    <button
                      className="flex items-center w-full text-left group px-0 py-3 bg-transparent transition-colors border-none rounded-none shadow-none"
                      style={{outline: 'none'}}
                      onClick={() => setOpenIndexRight(openIndexRight === idx ? null : idx)}
                      aria-expanded={openIndexRight === idx}
                      aria-controls={`accordion-detail-right-${idx}`}
                    >
                      <span className="bg-[#21435F]/10 rounded-full p-1 mr-2 flex-shrink-0 flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="text-[#21435F] font-medium text-sm flex-1">{item.title}</span>
                      <svg
                        className={`ml-2 transition-transform duration-200 ${openIndexRight === idx ? 'rotate-180' : 'rotate-0'}`}
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: '#21435F' }}
                      >
                        <path d="M5 12l5-5 5 5" stroke="#21435F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openIndexRight === idx && (
                      <div
                        id={`accordion-detail-right-${idx}`}
                        className="text-gray-600 text-xs mt-1 animate-fade-in min-h-[2.5em] px-2"
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <a 
              href="/rezervace" 
              className="inline-flex items-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full group mt-8"
            >
              Rezervovat schůzku
              <Calendar size={18} className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
            </a>
          </div>

          {/* SPOLEČNÝ BOX: slideshow + akordeon */}
          <div className="reveal reveal-delay-200 max-w-[650px] w-full mx-auto flex flex-col items-center">
            {/* Slideshow */}
            <div className="w-full mb-6">
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
                        <div className="relative w-full aspect-square">
                          <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
                      className={`w-2 h-2 rounded-full border-2 border-white transition-all duration-300 ${
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