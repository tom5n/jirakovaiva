import React, { useEffect } from "react";
import { ArrowRight, Check, Gift, Percent, Sparkles, X, Tag, Bell, ShoppingCart, Star, Info, UserPlus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "./ui/dialog";

const Discount = () => {
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

  const discountBenefits = [
    {
      text: "Okamžitá sleva 23% na všechny produkty FARMASI",
      icon: <Tag size={16} />
    },
    {
      text: "Přístup k exkluzivním nabídkám a novinkám",
      icon: <Bell size={16} />
    },
    {
      text: "Žádné minimální odběry ani povinné nákupy",
      icon: <ShoppingCart size={16} />
    },
    {
      text: "Možnost testovat produkty jako první",
      icon: <Star size={16} />
    },
    {
      text: "Pravidelné informace o akcích a slevách",
      icon: <Info size={16} />
    },
  ];

  return (
    <section id="discount" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title reveal text-[#21435F]">
              Získej benefity FARMASI
            </h2>
            <p className="text-lg text-gray-700 mb-6 reveal reveal-delay-200">
              Zřiď si slevu na e-shopu FARMASI a nakupuj každý jeden produkt s 23% slevou, bez nutnosti výše objednávek a pravidelného nakupování.
            </p>
            <ul className="space-y-4 mb-8 reveal reveal-delay-400">
              {discountBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="bg-[#21435F] rounded-full p-1 text-white mr-3 flex-shrink-0">
                    {benefit.icon}
                  </span>
                  <span className="text-gray-700">{benefit.text}</span>
                </li>
              ))}
            </ul>
            <div className="reveal reveal-delay-600 flex gap-4 flex-row flex-wrap items-center justify-start">
              <a
                href="https://1url.cz/@eshop_farmasi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center px-8 py-4 text-lg rounded-full group"
              >
                Získat slevu
                <Gift size={18} className="ml-2 transition-transform duration-300 group-hover:scale-125" />
              </a>
              <a
                href="/registrace"
                className="bg-[#F3E8E2] text-gray-800 hover:bg-[#F3E8E2]/90 transition-colors duration-300 flex items-center justify-center px-8 py-4 text-lg rounded-full group font-medium"
              >
                Registrovat se
                <UserPlus size={18} className="ml-2 transition-transform duration-300 group-hover:scale-125" />
              </a>
            </div>
          </div>
          <div className="relative reveal">
            <a
              href="https://1url.cz/@eshop_farmasi"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden reveal group">
                  <img
                    src="/images/sleva.webp"
                    alt="Ivana Jiráková"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl overflow-hidden shadow-xl w-48 h-48 border-4 border-white reveal reveal-delay-200">
                  <img
                    src="/images/qr.webp"
                    alt="Ivana Jiráková s produkty FARMASI"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-[#21435F] text-white rounded-full w-24 h-24 flex items-center justify-center text-2xl font-bold shadow-lg transform rotate-12">
                -50%
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
