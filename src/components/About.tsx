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
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll("#about .reveal");
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Dancing_Script'] mb-4 text-[#21435F] reveal">
              O mně
            </h2>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-100">
              Jmenuji se Ivana Jiráková – jsem certifikovaná koučka, mentorka a průvodkyně osobním i profesním růstem.
            </p>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-200">
              Jsem držitelkou akreditace Ministerstva školství, mládeže a tělovýchovy, členkou Asociace koučů České republiky a zároveň členkou Hospodářské komory ČR.
            </p>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-300">
              Věnuji se individuálnímu koučinku, leadership koučinku, týmovému rozvoji i mentoringu. Pomáhám lidem odemykat jejich skutečný potenciál, posilovat sebevědomí, růst v osobním životě i kariéře a nacházet cestu k výsledkům, které jsou dlouhodobě udržitelné.
            </p>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-400">
              Pracuji osobně i online, podle potřeb a možností mých klientů.
            </p>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-500">
              Moje práce stojí na respektu, bezpečném prostředí a víře, že každý člověk v sobě má mnohem víc, než si často připouští – a mým posláním je pomoci tento potenciál probudit a rozvíjet.
            </p>
            <h3 className="text-2xl md:text-3xl font-['Montserrat'] font-medium mb-0 text-[#21435F] reveal reveal-delay-600 mt-8">
              Podnikání a vedení týmů
            </h3>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-700">
              Kromě koučinku působím také jako podnikatelka v oblasti přímého prodeje, kde pracuji jako TOP 1. ředitelka Farmasi pro Českou republiku.
            </p>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-800">
              Vedu vlastní tým a předávám dál ověřené strategie, jak si vybudovat stabilní příjem z domova, rozvíjet dovednosti, pracovat s mindsetem a stát se finančně nezávislým.
            </p>
            <p className="text-lg text-gray-700 mb-0 reveal reveal-delay-900">
              Pomáhám lidem – zejména ženám – objevit nové příležitosti, posílit jejich sebevědomí a najít cestu k životu, kde mohou převzít zodpovědnost za svou budoucnost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
