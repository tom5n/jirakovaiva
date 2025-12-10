import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NewsNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const isReservationPage = typeof window !== 'undefined' && window.location.pathname === '/rezervace';
  const isHomePage = typeof window !== 'undefined' && window.location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToHome = () => {
    window.scrollTo(0, 0);
    navigate('/');
  };

  return (
    <>
      {/* Progress bar (desktop only) */}
      {isHomePage && (
        <div className="fixed top-0 left-0 w-full h-1 bg-[#21435F]/20 z-50 hidden md:block">
          <div className="h-full bg-[#21435F] transition-all duration-150 ease-out" style={{ width: '0%' }} />
        </div>
      )}
      {/* Desktop header */}
      <header className={`hidden md:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-5"
      }`}>
        <div className="container mx-auto">
          <div className={`mx-auto max-w-5xl rounded-full px-12 py-4 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/80 backdrop-blur-md shadow-md' 
              : 'bg-transparent shadow-none'
          }`}>
            <div className="flex justify-between items-center">
              <Link to="/" onClick={handleBackToHome} className="flex items-center">
                <span className="font-['Dancing_Script'] text-3xl md:text-4xl text-[#21435F] hover:text-[#21435F]/90 transition-colors duration-300">
                  Ivana Jiráková
                </span>
              </Link>
              <button
                onClick={handleBackToHome}
                className="inline-flex items-center text-[#21435F] border border-[#21435F] bg-transparent hover:bg-[#21435F]/10 hover:text-[#21435F] px-4 py-2 rounded-full font-medium transition-colors duration-300 shadow-none group"
              >
                <ArrowLeft size={18} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Zpět na hlavní stránku
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile header */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-['Dancing_Script'] text-3xl text-[#21435F] hover:text-[#21435F]/90 transition-colors duration-300">
            Ivana Jiráková
          </Link>
          <Link
            to="/"
            className="inline-flex items-center text-[#21435F] border border-[#21435F] bg-transparent hover:bg-[#21435F]/10 hover:text-[#21435F] px-4 py-2 rounded-full font-medium transition-colors duration-300 shadow-none group"
          >
            <ArrowLeft size={18} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Zpět
          </Link>
        </div>
      </nav>
    </>
  )
} 