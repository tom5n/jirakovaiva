import React, { useEffect, useState } from "react";
import { Mail, Phone, Instagram, ArrowRight, Send, Facebook } from "lucide-react";
import InstagramFeed from "./InstagramFeed";
import { FaTiktok } from "react-icons/fa";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        alert('Něco se pokazilo, zkuste to prosím znovu');
        throw new Error(result.error || 'Něco se pokazilo');
      }

      alert('Zpráva byla úspěšně odeslána!');
      e.currentTarget.reset();
    } catch (error) {
      // alert už je volán výše
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <InstagramFeed />
      <div className="w-full">
        <img src="/images/ig-bottom.svg" alt="Separator" className="w-full h-auto" />
      </div>
      <section id="contact" className="section-padding bg-[#FFD1C1]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto reveal inline-block text-[#21435F]">
              Kontaktujte mě
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto reveal reveal-delay-200">
              Máte otázky nebo chcete začít spolupráci? Neváhejte mě kontaktovat.<br />
              Ráda vám pomůžu na Vaší cestě s FARMASI.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 md:mb-0">
              <h3 className="text-2xl font-medium text-[#21435F] mb-6 font-['Montserrat']">
                Napište mi
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Jméno a příjmení *
                    </label>
                    <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-farmasi-pink focus:border-farmasi-pink transition" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-farmasi-pink focus:border-farmasi-pink transition" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Předmět
                  </label>
                  <input type="text" id="subject" name="subject" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-farmasi-pink focus:border-farmasi-pink transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Zpráva *
                  </label>
                  <textarea id="message" name="message" rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-farmasi-pink focus:border-farmasi-pink transition resize-none" required></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 w-full flex justify-center items-center px-8 py-3 rounded-full group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}
                  <Send size={18} className="ml-2 transition-transform duration-300 group-hover:-rotate-12" />
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-medium text-[#21435F] mb-6 font-['Montserrat']">
                  Kontaktní údaje
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-[#21435F] mt-1 mr-4" />
                    <div>
                      <p className="font-medium">Email:</p>
                      <a href="mailto:info@jirakovaiva.cz" className="text-gray-700 hover:text-[#21435F]">
                        info@jirakovaiva.cz
                      </a>
                      <br />
                      <a href="mailto:jirakovaiva@seznam.cz" className="text-gray-700 hover:text-[#21435F]">
                        jirakovaiva@seznam.cz
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-[#21435F] mt-1 mr-4" />
                    <div>
                      <p className="font-medium">Telefon:</p>
                      <a href="tel:+420604179130" className="text-gray-700 hover:text-[#21435F]">
                        +420 604 179 130
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Instagram className="text-[#21435F] mt-1 mr-4" />
                    <div>
                      <p className="font-medium">Instagram:</p>
                      <a
                        href="https://www.instagram.com/jirakova_iva/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#21435F]"
                      >
                        @jirakova_iva
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-medium text-[#21435F] mb-4 font-['Montserrat']">
                  Sledujte mě na sociálních sítích
                </h3>
                <p className="text-gray-700 mb-6">
                  Nejnovější akce, produkty a tipy najdete na mých sociálních sítích.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/jirakova_iva/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#21435F] hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl shadow-md"
                    aria-label="Instagram"
                  >
                    <Instagram size={26} />
                  </a>
                  <a
                    href="https://www.facebook.com/jirakovaiva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#21435F] hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl shadow-md"
                    aria-label="Facebook"
                  >
                    <Facebook />
                  </a>
                  <a
                    href="https://www.tiktok.com/@jirakova_iva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#21435F] hover:bg-[#21435F]/90 transition-colors duration-300 flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl shadow-md"
                    aria-label="TikTok"
                  >
                    <FaTiktok />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
