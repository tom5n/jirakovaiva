import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  showDivider?: boolean;
}

const Hero = ({ showDivider = true }: HeroProps) => {
  const navigate = useNavigate();
  // Zjistím, zda jsme na stránce /koucink
  const isKoucinkPage = typeof window !== 'undefined' && window.location.pathname === '/koucink';

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
        className={`pt-24 md:pt-32 pb-12 md:pb-16 flex items-center relative ${isKoucinkPage ? 'bg-[#FFD1C1]' : 'bg-[#F3E8E2]'}`}
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-1 md:order-1">
            {isKoucinkPage ? (
              <>
                <h2 className="reveal reveal-delay-200 text-4xl md:text-5xl lg:text-6xl text-[#21435F] font-['Montserrat'] font-light mb-6">
                  <strong className="font-medium">Koučink</strong> a mentoring<br/>
                  pro Váš osobní růst
                </h2>
                <p className="reveal reveal-delay-400 text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
                  Pomáhám Vám najít Vaši cestu, překonat překážky a dosáhnout Vašich cílů. Společně projdeme každým krokem Vašeho rozvoje.
                </p>
                <div className="reveal reveal-delay-600 flex flex-col sm:flex-row gap-4">
                  <a href="#pricing" className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center px-10 py-5 text-xl rounded-full group">
                    Rezervovat schůzku
                    <ArrowRight size={22} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                  <button
                    onClick={() => {
                      navigate('/');
                      setTimeout(() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="bg-[#F3E8E2] text-gray-800 hover:bg-[#F3E8E2]/90 transition-colors duration-300 flex items-center justify-center px-10 py-5 text-xl rounded-full"
                  >
                    Kontaktujte mě
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="reveal reveal-delay-200 text-4xl md:text-5xl lg:text-6xl text-[#21435F] font-['Montserrat'] font-light mb-6">
                  <strong className="font-medium">Pomáhám</strong> lidem <strong className="font-medium">růst</strong> v životě i v podnikání.
                </h2>
                <p className="reveal reveal-delay-400 text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
                  Jsem koučka & mentorka pro jednotlivce i firmy. Podporuji osobní rozvoj a leadership. Pomáhám také ženám vybudovat úspěšné online podnikání a dosáhnout finanční nezávislosti.
                </p>
                <div className="reveal reveal-delay-600 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center px-10 py-5 text-xl rounded-full group"
                  >
                    Chci vědět víc
                    <ArrowRight size={22} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center px-10 py-5 text-xl rounded-full"
                  >
                    Kontaktujte mě
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="order-2 md:order-2">
            <div className="relative">
              <div className={`relative w-full aspect-square ${isKoucinkPage ? 'rounded-2xl' : 'rounded-full'} overflow-hidden reveal group`}>
                <img
                  src={isKoucinkPage ? "/images/koucinkhero.webp" : "/images/hlavnihero.webp"}
                  alt={isKoucinkPage ? "Koučink a mentoring" : "Ivana Jiráková"}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {showDivider && (
        <div className="w-full">
          <img src="/images/dividers/1.svg" alt="Separator" className="w-full h-auto" />
        </div>
      )}
    </>
  );
};

export default Hero;
