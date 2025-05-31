import React, { useEffect } from "react";

const About = () => {
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
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden reveal group">
                <img
                  src="/images/about.webp"
                  alt="Ivana Jiráková"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl overflow-hidden shadow-xl w-48 h-48 border-4 border-white reveal reveal-delay-200">
                <img
                  src="/images/about2.webp"
                  alt="Ivana Jiráková s produkty FARMASI"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-['Dancing_Script'] mb-8 text-[#21435F] reveal">
              O mně
            </h2>
            <p className="text-lg text-gray-700 mb-6 reveal reveal-delay-200">
              Jmenuji se Ivana Jiráková – jsem podnikatelka, mentorka a průvodkyně na cestě k finanční svobodě. Podnikám v oblasti přímého prodeje, kde působím jako TOP 1. ředitelka Farmasi pro Centrální Evropu. Věnuji se vedení vlastního týmu a předávám dál ověřené zkušenosti, jak si vybudovat stabilní a smysluplný příjem z pohodlí domova. Moje práce je mojí vášní, neboť mi umožňuje podporovat lidé v tom, aby převzali zodpovědnost za svůj život a finanční budoucnost.
            </p>
            <p className="text-lg text-gray-700 mb-6 reveal reveal-delay-400">
              Pomáhám ženám – a nejen jim – objevovat jejich potenciál, rozvíjet se, růst a najít rovnováhu mezi osobním a pracovním životem. Díky individuálnímu přístupu, mentoringu a sdílení osvědčených strategií v oblasti online podnikání mohou mí klienti dosahovat výsledků, o kterých dříve jen snili.
            </p>
            <p className="text-lg text-gray-700 mb-6 reveal reveal-delay-600">
              Mým posláním je inspirovat ostatní, že i bez předchozích zkušeností mohou začít podnikat, tvořit si pasivní příjem a stát se finančně nezávislými. Pokud toužíš po změně a chceš být součástí komunity, která tě podpoří na cestě k úspěchu, jsem tady právě pro tebe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
