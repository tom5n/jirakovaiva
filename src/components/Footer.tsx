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
      <footer className="bg-[#21435F] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex justify-between items-center w-full">
              <span className="font-['Dancing_Script'] text-2xl text-white">
                Ivana Jiráková
              </span>
              <p className="text-sm">
                © {new Date().getFullYear()} Ivana Jiráková. Všechna práva vyhrazena.
              </p>
              <div className="flex items-center space-x-4">
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
    <footer className="bg-[#21435F] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex justify-between items-center w-full">
            <span className="font-['Dancing_Script'] text-2xl text-white">
              Ivana Jiráková
            </span>
            <p className="text-sm">
              © {new Date().getFullYear()} Ivana Jiráková. Všechna práva vyhrazena.
            </p>
            <div className="flex items-center space-x-4">
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
      </div>
    </footer>
  </>
);

export default Footer;
