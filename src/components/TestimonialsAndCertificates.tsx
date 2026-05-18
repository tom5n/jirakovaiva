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
      text: "Díky Ivaně jsem se konečně dostala zpět k sobě. Její koučink mi fakt pomohl - konečně se zase usmívám a mám chuť do věcí, které mě baví. Dokonce jsem se i namalovala a natočila videa, což jsem dlouho nedělala. Oceňuji její empatický přístup a to, že jsem se s ní mohla vykecat. Těším se na další setkání.",
      author: "Klientka",
      initial: "K",
      rating: 5,
      timeAgo: "před měsícem",
    },
    {
      text: "Děkuji moc za koučink, velmi mi to pomohlo, změnila jsem přístup k tomu, co jsme se bavili a jsem ráda, že jsem si na spoustu věcí během on-line sezení s vámi přišla.",
      author: "Klientka",
      initial: "K",
      rating: 5,
      timeAgo: "před 2 měsíci",
    },
  ];

  const certificates = [
    {
      image: "/images/certifikaty/c1.webp",
      alt: "Mindset Coach",
    },
    {
      image: "/images/certifikaty/c2.webp",
      alt: "Kouč",
    },
    {
      image: "/images/certifikaty/c3.webp",
      alt: "Členství hospodářské komory",
    },
    {
      image: "/images/certifikaty/c4.webp",
      alt: "Mindset Academy",
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

        {/* Certifikáty - Moderní asymetrická galerie */}
        <div>
          <h3 className="text-2xl md:text-3xl font-medium text-[#21435F] mb-12 text-center font-['Montserrat'] reveal">
            Certifikace
          </h3>
          <div className="flex flex-col md:flex-row md:flex-nowrap justify-center items-center gap-6 max-w-6xl mx-auto">
            {certificates.map((cert, index) => (
              <div
                key={index}
                onClick={() => setSelectedCertificate(index)}
                className="relative group reveal overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex-shrink-0 bg-white w-full max-w-[280px] md:w-[280px]"
              >
                <img
                  src={cert.image}
                  alt={cert.alt}
                  className="w-full h-auto object-contain transform group-hover:scale-110 transition-transform duration-700"
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
                className="w-full h-auto block max-h-[85vh] object-contain mx-auto"
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

