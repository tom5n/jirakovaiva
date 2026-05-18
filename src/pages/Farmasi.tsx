import React, { useEffect } from "react";
import { ArrowRight, Handshake } from "lucide-react";
import Navbar from "../components/Navbar";
import Collaboration from "../components/Collaboration";
import OverviewPrograms from "../components/OverviewPrograms";
import FreeTemplates from "../components/FreeTemplates";
import Discount from "../components/Discount";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SeoHead from '../components/SeoHead';

const Farmasi = () => {
  useEffect(() => {
    // Initialize reveal animations
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
      <SeoHead
        title="FARMASI | Ivana Jiráková"
        description="FARMASI s Ivanou Jirákovou"
        url="https://www.jirakovaiva.cz/farmasi"
      />
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-white">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-1 md:order-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#21435F] font-['Montserrat'] font-light mb-6 reveal">
                  Podnikání s <strong className="font-medium">FARMASI</strong>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-lg reveal reveal-delay-200">
                  Staňte se součástí komunity úspěšných žen a vybudujte si vlastní podnikání s produkty FARMASI. Získejte podporu, školení a možnost vydělávat z pohodlí domova.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 reveal reveal-delay-400">
                  <a 
                    href="/spoluprace" 
                    className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center px-10 py-5 text-xl rounded-full group"
                  >
                    Začít spolupráci
                    <Handshake size={22} className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
                  </a>
                  <a 
                    href="#discount" 
                    className="bg-[#FFD1C1] text-gray-800 hover:bg-[#FFD1C1]/90 transition-colors duration-300 flex items-center justify-center px-10 py-5 text-xl rounded-full group"
                  >
                    Získat benefity
                    <ArrowRight size={22} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </div>
              </div>
              <div className="order-2 md:order-2">
                <div className="relative">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden reveal group">
                    <img
                      src="/images/farmasihero.webp"
                      alt="FARMASI podnikání"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full">
          <img src="/images/dividers/farmasi/1.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
        </div>
        <main>
          <Collaboration />
          <div className="w-full">
            <img src="/images/dividers/farmasi/2.svg" alt="Separator" className="w-full h-auto" />
          </div>
          <OverviewPrograms />
          <div className="w-full">
            <img src="/images/dividers/farmasi/3.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
          </div>
          <FreeTemplates />
          <div className="w-full">
            <img src="/images/dividers/farmasi/1.svg" alt="Separator" className="w-full h-auto" />
          </div>
          <Discount />
          <div className="w-full">
            <img src="/images/dividers/farmasi/4.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Farmasi;

