import React, { useEffect } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPackages = () => {
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

  const packages = [
    {
      title: "Individuální koučink & mentoring",
      price: "od 2 500 Kč / hod",
      description: "Osobní, profesní a mindset coaching vedený online i offline s naprosto individuálním přístupem. Pomáhám lidem lépe porozumět sobě, zvládat změny, budovat sebevědomí a dělat rozhodnutí, která je posunou kupředu.",
      isPopular: true,
      features: [
        "1:1 koučinková setkání",
        "Práce s mindsetem a cíli",
        "Podpora mezi sezeními",
      ],
    },
    {
      title: "Koučink pro rodiny a rodiče s dětmi",
      price: "od 2 900 Kč / hod",
      description: "Podporuji rodiče, kteří hledají cestu k lepší komunikaci se svými dětmi, řeší krizové situace, rodinné napětí nebo hledají společný jazyk v náročných obdobích. Koučink pomáhá posílit vztahy, pochopení i vzájemnou důvěru.",
      isPopular: false,
      features: [
        "Rozhovory s rodičem/rodiči",
        "Techniky komunikace",
        "Práce s emocemi",
      ],
    },
    {
      title: "Koučink pro začínající podnikatele",
      price: "od 3 200 Kč / hod",
      description: "Pomáhám lidem, kteří se chtějí pustit do vlastního podnikání, najít směr, strategii i sebejistotu. Společně nastavíme kroky, mindset i jasný plán, aby podnikání bylo udržitelné a dávalo smysl.",
      isPopular: false,
      features: [
        "Nastavení strategie podnikání",
        "Práce s mindsetem",
        "Jasný akční plán",
      ],
    },
    {
      title: "Coaching pro ženy a maminky po mateřské",
      price: "od 2 400 Kč / hod",
      description: "Podpora při návratu do práce, při změně kariéry nebo v období, kdy ženy často ztrácí sebevědomí, jistotu a orientaci v pracovním prostředí. Pomáhám jim znovu najít své místo, rytmus a sílu.",
      isPopular: false,
      features: [
        "Prioritní podpora",
        "Exkluzivní materiály",
        "Osobní konzultace",
      ],
    },
      {
        title: "Leadership koučink a firemní mentoring",
        price: "od 4 500 Kč / hod",
        description: "Práce s lídry, manažery a týmy na zvyšování výkonu, sebevědomí, komunikace a firemní kultury. Podpora při řízení lidí, motivaci a práci s tlakem i zodpovědností.",
      isPopular: false,
      features: [
        "Práce s lídry a manažery",
        "Zvyšování výkonu týmu",
        "Firemní kultura",
      ],
    },
    {
      title: "Týmový rozvoj a facilitace",
      price: "od 6 900 Kč / hod",
      description: "Rozvojové workshopy, podpora týmů v komunikaci, spolupráci, řešení konfliktů a budování společné strategie. Posiluji důvěru, respekt i efektivitu ve skupinách.",
      isPopular: false,
      features: [
        "Rozvojové workshopy",
        "Podpora týmů v komunikaci",
        "Budování společné strategie",
      ],
    },
    {
      title: "Exkluzivní Premium Balíček",
      price: "75 000 Kč",
      description: "Tento 3měsíční transformační program je určen pro ty, kteří chtějí udělat zásadní životní nebo profesní změnu a potřebují jasný směr, podporu a vedení.",
      isPopular: false,
      features: [
        "8 individuálních sezení",
        "Průběžná podpora mezi sezeními",
        "Akční plán",
        "Měření pokroku",
      ],
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Dancing_Script'] mx-auto reveal inline-block text-[#21435F]">
            Programy koučinku
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto reveal reveal-delay-200 mt-4 font-['Montserrat'] leading-relaxed">
            Vyberte si balíček, který Vám nejlépe vyhovuje. Každý program je navržen tak, aby Vás posunul blíž k Vašim cílům a dal Vám maximum podpory.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {packages.slice(0, 4).map((pkg, index) => (
            <div
              key={index}
              className="relative reveal flex flex-col h-full"
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-[#21435F] text-white px-4 py-1 rounded-full text-xs font-semibold font-['Montserrat'] flex items-center gap-1 shadow-lg">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    Nejoblíbenější
                  </span>
                </div>
              )}
              
              <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border flex flex-col h-full group transition-all duration-300 hover:shadow-xl ${
                pkg.isPopular ? "border-[#21435F] border-2" : "border-[#21435F]"
              }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-[#21435F] mb-4 font-['Montserrat'] min-h-[4.5rem] flex items-center">
                  {pkg.title}
                </h3>
                
                <div className="mb-4">
                  <span className="text-xl font-bold text-[#21435F] font-['Montserrat']">
                    {pkg.price}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-6 font-['Montserrat'] flex-grow min-h-[4rem]">
                  {pkg.description}
                </p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-[#21435F] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700 text-sm font-['Montserrat']">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  {pkg.title === "Individuální koučink & mentoring" ? (
                    <Link
                      to="/koucink/individualni"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Koučink pro rodiny a rodiče s dětmi" ? (
                    <Link
                      to="/koucink/rodiny"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Koučink pro začínající podnikatele" ? (
                    <Link
                      to="/koucink/podnikatele"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Coaching pro ženy a maminky po mateřské" ? (
                    <Link
                      to="/koucink/zeny-maminky"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Leadership koučink a firemní mentoring" ? (
                    <Link
                      to="/koucink/firemni"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Týmový rozvoj a facilitace" ? (
                    <Link
                      to="/koucink/tymovy-rozvoj"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Exkluzivní Premium Balíček" ? (
                    <Link
                      to="/koucink/premium"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : (
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </a>
                  )}
                </div>
                </div>
              </div>
            </div>
          ))}
          </div>
          
          {packages.length > 4 && (
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                {packages.slice(4).map((pkg, index) => (
                  <div
                    key={index + 4}
                    className="relative reveal flex flex-col h-full"
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-[#21435F] text-white px-4 py-1 rounded-full text-xs font-semibold font-['Montserrat'] flex items-center gap-1 shadow-lg">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          Nejoblíbenější
                        </span>
                      </div>
                    )}
                    
                    <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border flex flex-col h-full group transition-all duration-300 hover:shadow-xl ${
                      pkg.isPopular ? "border-[#21435F] border-2" : "border-[#21435F]"
                    }`}>
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      
                      <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-semibold text-[#21435F] mb-4 font-['Montserrat'] min-h-[4.5rem] flex items-center">
                        {pkg.title}
                      </h3>
                      
                      <div className="mb-4">
                        <span className="text-xl font-bold text-[#21435F] font-['Montserrat']">
                          {pkg.price}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-6 font-['Montserrat'] flex-grow min-h-[4rem]">
                        {pkg.description}
                      </p>

                      <ul className="space-y-2 mb-6 flex-grow">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              size={18}
                              className="text-[#21435F] flex-shrink-0 mt-0.5"
                            />
                            <span className="text-gray-700 text-sm font-['Montserrat']">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto">
                        {pkg.title === "Leadership koučink a firemní mentoring" ? (
                          <Link
                            to="/koucink/firemni"
                            onClick={() => window.scrollTo(0, 0)}
                            className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                          >
                            Zjistit více
                            <ArrowRight
                              size={16}
                              className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                            />
                          </Link>
                        ) : pkg.title === "Týmový rozvoj a facilitace" ? (
                          <Link
                            to="/koucink/tymovy-rozvoj"
                            onClick={() => window.scrollTo(0, 0)}
                            className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                          >
                            Zjistit více
                            <ArrowRight
                              size={16}
                              className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                            />
                          </Link>
                        ) : pkg.title === "Exkluzivní Premium Balíček" ? (
                          <Link
                            to="/koucink/premium"
                            onClick={() => window.scrollTo(0, 0)}
                            className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                          >
                            Zjistit více
                            <ArrowRight
                              size={16}
                              className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                            />
                          </Link>
                        ) : (
                          <a
                            href="#contact"
                            className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                          >
                            Zjistit více
                            <ArrowRight
                              size={16}
                              className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                            />
                          </a>
                        )}
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;

