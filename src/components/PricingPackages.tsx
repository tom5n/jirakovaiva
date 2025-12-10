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
      title: "Osobní koučink",
      price: "od 2 500 Kč",
      description: "Individuální koučink zaměřený na Váš osobní růst a dosažení Vašich cílů.",
      isPopular: true,
      features: [
        "Individuální přístup",
        "Flexibilní termíny",
        "Osobní podpora",
      ],
    },
    {
      title: "Týmový koučink",
      price: "od 5 000 Kč",
      description: "Koučink pro malé týmy a skupiny zaměřený na budování silného týmu.",
      isPopular: false,
      features: [
        "Skupinové sezení",
        "Týmová dynamika",
        "Společné cíle",
      ],
    },
    {
      title: "Pro firmy - Leadership",
      price: "na dotaz",
      description: "Komplexní leadership program pro firmy a organizace.",
      isPopular: false,
      features: [
        "Firemní programy",
        "Workshopy",
        "Dlouhodobá spolupráce",
      ],
    },
    {
      title: "VIP spolupráce",
      price: "na dotaz",
      description: "Exkluzivní VIP program s maximální podporou a individuálním přístupem.",
      isPopular: false,
      features: [
        "Prioritní podpora",
        "Exkluzivní materiály",
        "Osobní konzultace",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
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
                
                <div className={`p-8 flex flex-col flex-1 ${pkg.isPopular ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-semibold text-[#21435F] mb-4 font-['Montserrat'] min-h-[3rem] flex items-center">
                  {pkg.title}
                </h3>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#21435F] font-['Montserrat']">
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
                  {pkg.title === "Osobní koučink" ? (
                    <Link
                      to="/koucink/osobni"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Týmový koučink" ? (
                    <Link
                      to="/koucink/tymovy"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "Pro firmy - Leadership" ? (
                    <Link
                      to="/koucink/leadership"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium text-sm w-full group/btn font-['Montserrat']"
                    >
                      Zjistit více
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  ) : pkg.title === "VIP spolupráce" ? (
                    <Link
                      to="/koucink/vip"
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
    </section>
  );
};

export default PricingPackages;

