import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Zjistím, zda jsme na stránce /novinky
  const isAllNewsPage = typeof window !== 'undefined' && window.location.pathname === '/novinky';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Výpočet progress baru
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar (desktop only) */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-[#21435F]/20 z-50 hidden md:block"
        style={{ width: '100%' }}
      >
        <div 
          className="h-full bg-[#21435F] transition-all duration-150 ease-out"
          style={{ 
            width: `${scrollProgress}%`,
            transition: 'width 150ms ease-out'
          }}
        />
      </div>
      {/* Desktop header - pouze na lg a větších */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto flex justify-center">
          <div className={`inline-flex rounded-full shadow-lg px-10 py-4 transition-all duration-300 ${
            isScrolled 
              ? "bg-white/80 backdrop-blur-md shadow-md" 
              : "bg-transparent shadow-none"
          }`}>
            <div className="inline-flex items-center gap-16">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className="flex items-center flex-shrink-0">
                <span className="font-['Dancing_Script'] text-3xl md:text-4xl text-[#21435F] hover:text-[#21435F]/90 transition-colors duration-300">
                  Ivana Jiráková
                </span>
              </a>
              {/* Desktop Navigation */}
              <nav className="inline-flex items-center gap-8">
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  O mně
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('collaboration')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  Spolupráce
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  Programy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <Link
                  to="/kurzy"
                  className="text-gray-800 hover:text-[#21435F] transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('courses');
                  }}
                >
                  Koučink a mentoring
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  Tipy a rady
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('discount')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  Benefity FARMASI
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  Novinky
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('instagram')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  Instagram
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-gray-800 hover:text-[#21435F] transition-colors relative group">
                  Kontakt
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#21435F] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile header - až do lg */}
      <nav className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} className="font-['Dancing_Script'] text-3xl text-[#21435F] hover:text-[#21435F]/90 transition-colors duration-300">
            Ivana Jiráková
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#21435F] p-2 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 top-3' : 'top-1'
              }`} />
              <span className={`absolute w-6 h-0.5 bg-current top-3 transform transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 top-3' : 'top-5'
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          style={{ top: '64px' }}
          onClick={() => setIsMenuOpen(false)} 
        />
      )}

      {/* Mobile menu */}
      <div 
        className={`fixed inset-x-0 top-16 bottom-0 bg-white/80 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}
      >
        <nav className="h-full overflow-y-auto px-6 py-8">
          <ul className="space-y-8">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-xl text-gray-800 w-full text-left"
              >
                O mně
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('collaboration')}
                className="text-xl text-gray-800 w-full text-left"
              >
                Spolupráce
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('programs')}
                className="text-xl text-gray-800 w-full text-left"
              >
                Programy
              </button>
            </li>
            <li>
              <Link
                to="/kurzy"
                className="text-xl text-gray-800 w-full text-left"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('courses');
                }}
              >
                Koučink a mentoring
              </Link>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('templates')}
                className="text-xl text-gray-800 w-full text-left"
              >
                Tipy a rady
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('discount')}
                className="text-xl text-gray-800 w-full text-left"
              >
                Benefity FARMASI
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('news')}
                className="text-xl text-gray-800 w-full text-left"
              >
                Novinky
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('instagram')}
                className="text-xl text-gray-800 w-full text-left"
              >
                Instagram
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-xl text-gray-800 w-full text-left"
              >
                Kontakt
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
