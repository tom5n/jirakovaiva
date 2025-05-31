import React from "react";
import { Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  // Zjistím aktuální cestu
  const isAllNewsPage = typeof window !== 'undefined' && window.location.pathname === '/novinky';
  const isReservationPage = typeof window !== 'undefined' && window.location.pathname === '/rezervace';
  return (
    <>
      <div className="w-full">
        <img src={isReservationPage ? "/images/footer-top3.svg" : isAllNewsPage ? "/images/footer-top2.svg" : "/images/footer-top.svg"} alt="Separator" className="w-full h-auto" />
      </div>
      <footer className="bg-[#21435F] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <span className="font-['Dancing_Script'] text-2xl text-white hidden md:block">
                Ivana Jiráková
              </span>
              <p className="text-sm text-center md:text-left">
                © {new Date().getFullYear()} Ivana Jiráková. Všechna práva vyhrazena.
              </p>
              <div className="flex items-center space-x-4 hidden md:flex">
                <a
                  href="https://www.facebook.com/ivana.jirakova.5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/ivana_jirakova_farmasi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="mailto:ivana.jirakova@farmasi.com"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-4">
            <div className="flex justify-center">
              <a 
                href="https://www.tfvision.cz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm opacity-50 hover:opacity-70 transition-opacity relative group"
              >
                <span className="italic">Coded with Vision by </span>
                <span className="italic font-bold">t&f</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export const FooterNews = () => (
  <>
    <div className="w-full">
      <img src="/images/footer-top2.svg" alt="Separator" className="w-full h-auto" />
    </div>
    <footer className="bg-[#21435F] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <span className="font-['Dancing_Script'] text-2xl text-white hidden md:block">
              Ivana Jiráková
            </span>
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} Ivana Jiráková. Všechna práva vyhrazena.
            </p>
            <div className="flex items-center space-x-4 hidden md:flex">
              <a
                href="https://www.facebook.com/ivana.jirakova.5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/ivana_jirakova_farmasi/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:ivana.jirakova@farmasi.com"
                className="hover:opacity-80 transition-opacity"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4">
          <div className="flex justify-center">
            <a 
              href="https://www.tfvision.cz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm opacity-50 hover:opacity-70 transition-opacity relative group"
            >
              <span className="italic">Coded with Vision by </span>
              <span className="italic font-bold">t&f</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
