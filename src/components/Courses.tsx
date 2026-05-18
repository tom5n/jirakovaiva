import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
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
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll("#courses .reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);


  return (
    <section id="courses" className="section-padding bg-[#FFD1C1]">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Dancing_Script'] text-[#21435F] reveal">
              Koučink a mentoring
            </h2>
            <p className="text-lg text-gray-700 reveal reveal-delay-100">
              Už mnoho let předávám zkušenosti, vedení lidí a podporu jejich růstu. Mentoring i koučink jsem intuitivně využívala v různých rolích během svého života a postupně jsem zjistila, že právě tato práce s lidským potenciálem je mi nejbližší.
            </p>
            <p className="text-lg text-gray-700 reveal reveal-delay-200">
              Proto jsem se rozhodla posunout své dovednosti na profesionální úroveň a úspěšně jsem absolvovala certifikaci akreditovanou Ministerstvem školství, mládeže a tělovýchovy. Dnes jsem také členkou Asociace koučů České republiky, součástí globální ICF (International Coaching Federation) a zároveň členkou Hospodářské komory ČR. Tyto kroky pro mě představují nejen odborné zázemí, ale i závazek pracovat podle nejvyšších profesních a etických standardů.
            </p>
            <p className="text-lg text-gray-700 reveal reveal-delay-300">
              Své zkušenosti nyní předávám ještě intenzivněji – v rámci osobního i profesního koučinku, leadership rozvoje i mentoringu, a to jak online, tak offline.
            </p>
            <p className="text-lg text-gray-700 reveal reveal-delay-400">
              Jednotlivé formy spolupráce najdete v samostatných sekcích webu, kde si můžete vybrat přístup, který nejlépe odpovídá vašim potřebám nebo potřebám vaší organizace.
            </p>

            <div className="reveal reveal-delay-500 mt-8">
              <button
                onClick={() => {
                  navigate('/koucink');
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }}
                className="inline-flex items-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full group"
              >
                Zjistit více
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </div>
          </div>

          <div className="reveal reveal-delay-200 max-w-[650px] w-full mx-auto">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <img
                src="/images/koucinksekce.webp"
                alt="Koučink a mentoring"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses; 