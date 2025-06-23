import React, { useEffect, useState } from "react";
import { ArrowRight, Check, Handshake, GraduationCap, BookOpen, Clock, Users, Wallet, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const Collaboration = () => {
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

  const benefits = [
    "Osobní mentoring a podpora na každém kroku",
    "Přístup k exkluzivním školením a materiálům",
    "Flexibilní pracovní doba podle vašich možností",
    "Členství v komunitě úspěšných a inspirativních žen",
    "Finanční nezávislost a atraktivní bonusový systém",
    "Pravidelné workshopy a setkání",
  ];

  const testimonials = [
    {
      text: "Díky Ivaně jsem našla odvahu začít podnikat. Její podpora a rady jsou k nezaplacení.",
      author: "Markéta K.",
    },
    {
      text: "Spolupráce s Ivanou mi ukázala, že i při péči o dvě děti můžu mít úspěšné podnikání.",
      author: "Lenka P.",
    },
    {
      text: "Ivanin přístup je profesionální a zároveň osobní. Vždy je připravena poradit a pomoci.",
      author: "Tereza M.",
    },
    {
      text: "S Ivanou jsem se naučila, jak efektivně komunikovat s klienty a budovat svou značku.",
      author: "Jana S.",
    },
    {
      text: "Díky Ivaně jsem našla rovnováhu mezi rodinou a podnikáním. Její rady jsou zlaté.",
      author: "Petra V.",
    },
    {
      text: "Ivanin mentoring mi pomohl překonat počáteční obavy a začít s důvěrou v sebe sama.",
      author: "Lucie H.",
    },
    {
      text: "Spolupráce s Ivanou mi otevřela nové možnosti a ukázala cestu k úspěchu.",
      author: "Martina K.",
    },
    {
      text: "Ivanin přístup je inspirativní a motivující. Vždy ví, jak mě posunout dál.",
      author: "Kateřina L.",
    },
    {
      text: "Díky Ivaně jsem našla svou cestu v podnikání a mohu se věnovat tomu, co mě baví.",
      author: "Veronika M.",
    },
  ];

  const benefitDetails = [
    {
      title: "Osobní mentoring a podpora na každém kroku",
      icon: <GraduationCap size={20} color="#21435F" />, 
      detail:
        "Budete mít přístup k mé osobní podpoře a zkušenostem. Pomohu vám překonat počáteční obavy a nejistoty, naučím vás efektivně komunikovat s klienty a budovat vaši značku. Každý týden společně zhodnotíme vaše pokroky a nastavíme další cíle.",
    },
    {
      title: "Přístup k exkluzivním školením a materiálům",
      icon: <BookOpen size={20} color="#21435F" />, 
      detail:
        "Získáte přístup k mým prověřeným školícím materiálům, videím a prezentacím. Naučíte se vše o produktech, ale především o podnikání – od marketingu přes prodejní techniky až po budování týmu. Vše je připraveno tak, abyste mohli začít okamžitě.",
    },
    {
      title: "Flexibilní pracovní doba podle vašich možností",
      icon: <Clock size={20} color="#21435F" />, 
      detail:
        "Vaše podnikání můžete skloubit s jakýmkoliv životním stylem. Společně najdeme systém, který bude fungovat právě pro vás – ať už jste na rodičovské dovolené, pracujete na plný úvazek nebo hledáte novou životní výzvu.",
    },
    {
      title: "Členství v komunitě úspěšných a inspirativních žen",
      icon: <Users size={20} color="#21435F" />, 
      detail:
        "Stanete se součástí naší podpůrné komunity, kde se můžete inspirovat a sdílet zkušenosti s ostatními ambasadorkami. Pravidelné online setkání, mastermind skupiny a společné akce vám pomohou růst a motivovat se navzájem.",
    },
    {
      title: "Finanční nezávislost",
      icon: <Wallet size={20} color="#21435F" />, 
      detail:
        "Naučíte se, jak budovat stabilní příjem a dosáhnout finanční nezávislosti. Ukážu Vám způsoby, jak efektivně rozvíjet své podnikání tak, aby pracovalo pro Vás. Díky tomu získáte větší kontrolu nad svými financemi i životním stylem.",
    },
    {
      title: "Pravidelné workshopy a setkání",
      icon: <Calendar size={20} color="#21435F" />, 
      detail:
        "Budete mít možnost účastnit se exkluzivních workshopů a setkání, kde se naučíte praktické dovednosti, sdílet zkušenosti a budovat vztahy. Tyto akce jsou klíčové pro váš růst a úspěch v podnikání.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const handleBenefitClick = (index: number) => {
    if (openIndex === index) {
      // Pokud zavíráme aktuální bod, otevřeme předchozí
      const newIndex = index === 0 ? benefitDetails.length - 1 : index - 1;
      setOpenIndex(newIndex);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <div className="w-full">
        <img src="/images/spoluprace-top.svg" alt="Separator" className="w-full h-auto" />
      </div>
      <section id="collaboration" className="section-padding bg-[#FFD1C1] relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto reveal inline-block text-[#21435F]">
              Spolupráce se mnou
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto reveal reveal-delay-200">
              Pojďme společně vybudovat Vaše úspěšné podnikání. Moje cesta začala stejně jako ta Vaše – s touhou po změně a vírou v lepší budoucnost. Dnes, po letech zkušeností a pomoci velkému množství žen, Vám mohu nabídnout prověřený systém, který vede k úspěchu. Společně projdeme každým krokem Vaší cesty, od prvních krůčků až po budování vlastní úspěšné značky.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 reveal border border-[#21435F] transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-medium text-[#21435F] mb-10 font-['Montserrat']">Co získáte spoluprací?</h3>
              <ul className="space-y-4">
                {benefitDetails.map((benefit, index) => (
                  <li key={index} className={`py-2 ${index !== benefitDetails.length - 1 ? 'border-b border-[#21435F]/20' : ''}`}>
                    <button
                      className="flex items-center w-full text-left focus:outline-none group"
                      onClick={() => handleBenefitClick(index)}
                      aria-expanded={openIndex === index}
                      aria-controls={`benefit-detail-${index}`}
                    >
                      <span className="bg-[#21435F]/10 rounded-full p-1 mr-3 flex-shrink-0 flex items-center justify-center">
                        {benefit.icon}
                      </span>
                      <span className="text-gray-700 font-medium flex-1">{benefit.title}</span>
                      <svg
                        className={`ml-2 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: '#21435F' }}
                      >
                        <path d="M5 12l5-5 5 5" stroke="#21435F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openIndex === index && (
                      <div
                        id={`benefit-detail-${index}`}
                        className="text-gray-600 text-sm mt-2 animate-fade-in min-h-[4.5em]"
                      >
                        {benefit.detail}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 reveal reveal-delay-200 border border-[#21435F] transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-medium text-[#21435F] mb-10 font-['Montserrat']">Co o mně říkají ostatní</h3>
              <div className="relative">
                <div 
                  className="overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div 
                    className="transition-all duration-500 ease-in-out flex"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                  >
                    {[0, 1, 2].map((slideIndex) => (
                      <div 
                        key={slideIndex}
                        className="w-full flex-shrink-0"
                      >
                        <div className={`grid ${window.innerWidth <= 640 ? 'grid-rows-2' : 'grid-rows-3'} gap-6 h-[${window.innerWidth <= 640 ? '240px' : '360px'}]`}>
                          {testimonials.slice(slideIndex * (window.innerWidth <= 640 ? 2 : 3), (slideIndex + 1) * (window.innerWidth <= 640 ? 2 : 3)).map((testimonial, index) => (
                            <div key={index} className="border-l-4 border-[#21435F] pl-4 py-4 flex flex-col justify-center">
                              <p className="text-gray-700 italic mb-2 min-h-[3em]">"{testimonial.text}"</p>
                              <p className="text-gray-600 font-medium">{testimonial.author}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full hover:bg-[#21435F]/10 transition-colors"
                    aria-label="Předchozí"
                  >
                    <ChevronLeft size={24} className="text-[#21435F]" />
                  </button>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentSlide === index ? 'bg-[#21435F]' : 'bg-[#21435F]/30'
                        }`}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full hover:bg-[#21435F]/10 transition-colors"
                    aria-label="Další"
                  >
                    <ChevronRight size={24} className="text-[#21435F]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center reveal reveal-delay-400">
            <a href="#contact" className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center px-10 py-4 text-lg rounded-full group">
              Začít spolupráci
              <Handshake size={22} className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collaboration;
