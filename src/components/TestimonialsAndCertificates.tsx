import React, { useEffect, useState } from "react";
import { Star, ExternalLink, X } from "lucide-react";

const TestimonialsAndCertificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  
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

  // Zavření modálního okna pomocí klávesy Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCertificate !== null) {
        setSelectedCertificate(null);
      }
    };

    if (selectedCertificate !== null) {
      document.addEventListener("keydown", handleEscape);
      // Zablokování scrollování na pozadí
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedCertificate]);

  const testimonials = [
    {
      text: "Díky Ivaně jsem našla odvahu začít podnikat. Její podpora a rady jsou k nezaplacení. Profesionální přístup a individuální vedení mi pomohly překonat počáteční obavy.",
      author: "Markéta K.",
      initial: "M",
      rating: 5,
      timeAgo: "před 2 měsíci",
    },
    {
      text: "Spolupráce s Ivanou mi ukázala, že i při péči o dvě děti můžu mít úspěšné podnikání. Její mentoring je praktický a motivující.",
      author: "Lenka P.",
      initial: "L",
      rating: 5,
      timeAgo: "před měsícem",
    },
    {
      text: "Ivanin přístup je profesionální a zároveň osobní. Vždy je připravena poradit a pomoci. Díky ní jsem našla svou cestu v podnikání.",
      author: "Tereza M.",
      initial: "T",
      rating: 5,
      timeAgo: "před 3 měsíci",
    },
    {
      text: "S Ivanou jsem se naučila, jak efektivně komunikovat s klienty a budovat svou značku. Její rady jsou zlaté a vždy aktuální.",
      author: "Jana S.",
      initial: "J",
      rating: 5,
      timeAgo: "před týdnem",
    },
  ];

  const certificates = [
    {
      image: "/images/certificate1.webp",
      alt: "Certifikát koučinku",
    },
    {
      image: "/images/certificate2.webp",
      alt: "Certifikát mentoringu",
    },
    {
      image: "/images/certificate3.webp",
      alt: "Certifikát leadership",
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-[#F3E8E2]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Dancing_Script'] mx-auto reveal inline-block text-[#21435F]">
            Reference a certifikace
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto reveal reveal-delay-200 mt-4 font-['Montserrat'] leading-relaxed">
            Spokojenost klientů je pro mě nejdůležitější. Podívejte se na mé certifikace a přečtěte si, co o mé práci říkají klienti, kteří se mnou prošli koučinkem a mentoringem. Každá recenze je pro mě důkazem, že společně dokážeme dosáhnout vašich cílů.
          </p>
        </div>

        {/* Google Review Box */}
        <div className="flex justify-center mb-16 reveal">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-[#FFD1C1] to-[#F3E8E2] rounded-2xl px-8 py-5 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#21435F]/10 group"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-[#21435F] font-semibold text-lg font-['Montserrat']">Google</span>
            </div>
            <div className="h-8 w-px bg-[#21435F]/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#21435F] font-['Montserrat']">5.0</span>
              <Star size={24} className="text-yellow-400 fill-yellow-400" />
            </div>
            <div className="h-8 w-px bg-[#21435F]/20"></div>
            <span className="text-sm text-[#21435F] font-medium font-['Montserrat']">14 recenzí</span>
            <ExternalLink size={18} className="text-[#21435F] group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Recenze - Grid 2x2 s růžovým pozadím */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#FFD1C1] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 reveal border-2 border-[#21435F]/10 group flex flex-col h-full"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-gray-800 mb-5 text-base md:text-lg leading-relaxed font-['Montserrat'] font-medium flex-grow">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#21435F]/20 mt-auto">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-[#21435F] font-bold text-base font-['Montserrat']">
                    {testimonial.initial}
                  </span>
                </div>
                <div>
                  <p className="text-[#21435F] font-semibold text-sm font-['Montserrat']">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-600 text-xs font-['Montserrat']">
                    {testimonial.timeAgo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mb-20 reveal">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 rounded-full font-medium text-base shadow-lg hover:shadow-xl font-['Montserrat'] group"
          >
            Zobrazit všechny recenze na Google
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Certifikáty - Moderní asymetrická galerie */}
        <div>
          <h3 className="text-2xl md:text-3xl font-medium text-[#21435F] mb-12 text-center font-['Montserrat'] reveal">
            Certifikace
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {certificates.map((cert, index) => (
              <div
                key={index}
                onClick={() => setSelectedCertificate(index)}
                className="relative group reveal overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                style={{ 
                  width: index === 1 ? "320px" : "280px", 
                  height: index === 1 ? "240px" : "200px" 
                }}
              >
                <img
                  src={cert.image}
                  alt={cert.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "/images/about.webp";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#21435F]/0 via-[#21435F]/0 to-[#21435F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#21435F]/90">
                  <p className="text-white text-sm font-medium font-['Montserrat']">{cert.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modální okno pro zvětšený obrázek certifikátu */}
      {selectedCertificate !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadein"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-w-2xl w-full animate-fadein"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label="Zavřít"
              >
                <X size={20} className="text-[#21435F] group-hover:text-[#FFD1C1] transition-colors duration-300" />
              </button>
              <img
                src={certificates[selectedCertificate].image}
                alt={certificates[selectedCertificate].alt}
                className="w-full h-auto block"
                onError={(e) => {
                  e.currentTarget.src = "/images/about.webp";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-lg font-medium font-['Montserrat']">
                  {certificates[selectedCertificate].alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsAndCertificates;

