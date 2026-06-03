import React, { useState } from "react";
import NewsNavbar from "../components/NewsNavbar";
import Footer from "../components/Footer";
import {
  CalendarCheck,
  MessageCircle,
  Footprints,
  Users,
  HeartHandshake,
  Gift,
  Ticket,
} from "lucide-react";
import SeoHead from '../components/SeoHead';

const SpoluVKondici = () => {
  const whatToExpect = [
    {
      text: "Jednoduchá každodenní rutina s vybranými produkty",
      icon: <CalendarCheck size={16} />
    },
    {
      text: "Motivace a podpora v soukromé WhatsApp skupině",
      icon: <MessageCircle size={16} />
    },
    {
      text: "Tipy na lehký pohyb a zdravé návyky",
      icon: <Footprints size={16} />
    },
    {
      text: "Sdílení zkušeností s dalšími ženami",
      icon: <Users size={16} />
    },
    {
      text: "Pravidelná podpora a vedení",
      icon: <HeartHandshake size={16} />
    },
  ];

  const welcomeGifts = [
    {
      text: "Shaker zdarma",
      icon: <Gift size={16} />
    },
    {
      text: "Voucher na další nákup",
      icon: <Ticket size={16} />
    },
    {
      text: "Přístup do privátní WhatsApp skupiny",
      icon: <MessageCircle size={16} />
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!acceptedTerms) {
      window.alert('Musíte souhlasit se zpracováním osobních údajů.');
      return;
    }

    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name')?.toString() || '',
      surname: formData.get('surname')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      street: formData.get('street')?.toString() || '',
      zip: formData.get('zip')?.toString() || '',
      city: formData.get('city')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };
    try {
      const response = await fetch('/api/register-spoluvkondici', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        if (window && window.navigator && window.navigator.vibrate) window.navigator.vibrate(100);
        window.alert('Vaše přihláška byla úspěšně odeslána! Brzy se vám ozvu.');

        if ((window as any).trackFacebookEvent) {
          (window as any).trackFacebookEvent('Lead', {
            content_name: 'Spolu v Kondici Registration',
            content_category: 'Registration',
            value: 0,
            currency: 'CZK'
          });
        }

        form.reset();
        setAcceptedTerms(false);
      } else {
        window.alert('Něco se pokazilo při odesílání přihlášky. Zkuste to prosím znovu.');
      }
    } catch (err) {
      window.alert('Něco se pokazilo při odesílání přihlášky. Zkuste to prosím znovu.');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <SeoHead
        title="Spolu v Kondici | Projekt pro ženy 40+ | Ivana Jiráková"
        description="Podpůrná skupina pro ženy 40+, které chtějí více energie, zdraví a pohody. Jednoduchá rutina, WhatsApp komunita a osobní vedení."
        url="https://www.jirakovaiva.cz/spolu-v-kondici"
      />
      <div className="min-h-screen bg-[#F3E8E2]">
        <NewsNavbar />
        <main className="pt-6 md:pt-2">
          <section className="section-padding bg-[#F3E8E2] relative z-10">
            <div className="container mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm uppercase tracking-widest text-[#21435F]/70 mb-3 animate-fade-in">
                  Nový projekt pro ženy 40+
                </p>
                <h1 className="section-title text-[#21435F] animate-fade-in max-w-4xl mx-auto">
                  SPOLU V KONDICI
                </h1>
              </div>

              <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
                <p className="text-lg text-gray-700 animate-fade-in">
                  Máte pocit, že po čtyřicítce už vaše tělo nefunguje tak, jak bývalo? Přestože se snažíte více hlídat, jíte rozumněji a více se hýbete, váha stojí na místě, energie ubývá a cítíte se unavené?
                </p>
                <p className="text-lg font-medium text-[#21435F] animate-fade-in">
                  Nejste v tom samy.
                </p>
                <p className="text-lg text-gray-700 animate-fade-in">
                  Právě proto vznikl projekt SPOLU V KONDICI – podpůrná skupina pro ženy, které chtějí udělat něco pro své zdraví, energii a celkovou pohodu, ale nechtějí trávit hodiny ve fitku ani držet drastické diety.
                </p>
              </div>

              <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full">
                  <div className="flex flex-col h-full w-full min-w-0 order-2 lg:order-1">
                    <div className="mb-6 lg:hidden">
                      <div className="w-full border border-[#21435F] rounded-2xl py-6 px-6 bg-white mb-6">
                        <h2 className="text-xl font-medium text-[#21435F] mb-6">Co vás čeká?</h2>
                        <ul className="space-y-4 mb-0">
                          {whatToExpect.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span className="bg-[#21435F] rounded-full p-1 text-white mr-3 flex-shrink-0">
                                {item.icon}
                              </span>
                              <span className="text-gray-700">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full border border-[#21435F] rounded-2xl py-6 px-6 bg-white mb-6">
                        <h2 className="text-xl font-medium text-[#21435F] mb-6">Dárek pro nové účastnice</h2>
                        <p className="text-gray-700 mb-4">Ke vstupu do projektu od mě získáte:</p>
                        <ul className="space-y-4 mb-0">
                          {welcomeGifts.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span className="bg-[#21435F] rounded-full p-1 text-white mr-3 flex-shrink-0">
                                {item.icon}
                              </span>
                              <span className="text-gray-700">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="text-center mb-6 lg:hidden">
                      <h2 className="text-2xl font-medium text-[#21435F] mb-3">Chcete se přidat?</h2>
                      <p className="text-gray-700">
                        Vyplňte krátký formulář níže a já se vám osobně ozvu.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between h-full w-full min-w-0 border border-[#21435F] rounded-2xl p-6 bg-white">
                      <h2 className="text-xl font-medium text-[#21435F] mb-6 hidden lg:block">Chcete se přidat? Vyplňte formulář</h2>
                      <h2 className="text-xl font-medium text-[#21435F] mb-6 lg:hidden">Vyplňte údaje</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Jméno <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                            Příjmení <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                            Ulice
                          </label>
                          <input
                            type="text"
                            id="street"
                            name="street"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                            PSČ
                          </label>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            Město
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Vaše zpráva
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21435F] focus:border-[#21435F] outline-none transition-colors resize-none"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="terms"
                              checked={acceptedTerms}
                              onChange={(e) => setAcceptedTerms(e.target.checked)}
                              className="mt-1 h-4 w-4 text-[#21435F] focus:ring-[#21435F] border-gray-300 rounded"
                              required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700">
                              Souhlasím se{" "}
                              <a href="/zasady" target="_blank" className="text-[#21435F] hover:underline">
                                zpracováním osobních údajů
                              </a>{" "}
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                        </div>

                        <div className="md:col-span-2 pt-4 flex items-end">
                          <button
                            type="submit"
                            className="w-full bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting || !acceptedTerms}
                          >
                            {isSubmitting ? 'Odesílání...' : 'Chci se přidat'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="flex flex-col h-full w-full min-w-0 lg:pl-8 order-1 lg:order-2">
                    <div className="hidden lg:block w-full border border-[#21435F] rounded-2xl py-6 px-6 bg-white mb-6">
                      <h2 className="text-xl font-medium text-[#21435F] mb-6">Co vás čeká?</h2>
                      <ul className="space-y-4 mb-0">
                        {whatToExpect.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="bg-[#21435F] rounded-full p-1 text-white mr-3 flex-shrink-0">
                              {item.icon}
                            </span>
                            <span className="text-gray-700">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="hidden lg:block w-full border border-[#21435F] rounded-2xl py-6 px-6 bg-white mb-6">
                      <h2 className="text-xl font-medium text-[#21435F] mb-6">Dárek pro nové účastnice</h2>
                      <p className="text-gray-700 mb-4">Ke vstupu do projektu od mě získáte:</p>
                      <ul className="space-y-4 mb-0">
                        {welcomeGifts.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="bg-[#21435F] rounded-full p-1 text-white mr-3 flex-shrink-0">
                              {item.icon}
                            </span>
                            <span className="text-gray-700">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full border border-[#21435F] rounded-2xl py-6 px-6 bg-white mb-6">
                      <p className="text-gray-700 leading-relaxed">
                        Nejde o žádnou soutěž ani krátkodobou dietu. Cílem je cítit se lépe, mít více energie, podpořit své tělo a vytvořit si návyky, které budou dlouhodobě fungovat.
                      </p>
                    </div>

                    <div className="hidden lg:block text-center">
                      <p className="text-gray-700 mb-2">
                        Vyplňte krátký formulář vlevo a já se vám osobně ozvu.
                      </p>
                      <div className="mt-8 pt-6 border-t border-[#21435F]/20">
                        <p className="text-[#21435F] font-medium text-lg">Ivana Jiráková</p>
                        <p className="text-[#21435F]/80 font-medium">SPOLU V KONDICI</p>
                        <p className="text-gray-600 mt-2 italic">Protože na změny nemusíte být samy.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:hidden text-center mt-10 pt-8 border-t border-[#21435F]/20 max-w-md mx-auto">
                  <p className="text-[#21435F] font-medium text-lg">Ivana Jiráková</p>
                  <p className="text-[#21435F]/80 font-medium">SPOLU V KONDICI</p>
                  <p className="text-gray-600 mt-2 italic">Protože na změny nemusíte být samy.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <div className="w-full">
          <img src="/images/dividers/7.svg" alt="Separator" className="w-full h-auto" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SpoluVKondici;
