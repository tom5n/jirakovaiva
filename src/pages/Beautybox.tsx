import React, { useState } from "react";
import NewsNavbar from "../components/NewsNavbar";
import { FooterNews } from "../components/Footer";
import { Tag, Bell, ShoppingCart, Star, Info, ChevronDown } from "lucide-react";
import SeoHead from '../components/SeoHead';

const Beautybox = () => {
  const discountBenefits = [
    {
      text: "Okamžitá sleva 23% na všechny produkty FARMASI",
      icon: <Tag size={16} />
    },
    {
      text: "Přístup k exkluzivním nabídkám a novinkám",
      icon: <Bell size={16} />
    },
    {
      text: "Žádné minimální odběry ani povinné nákupy",
      icon: <ShoppingCart size={16} />
    },
    {
      text: "Možnost testovat produkty jako první",
      icon: <Star size={16} />
    },
    {
      text: "Pravidelné informace o akcích a slevách",
      icon: <Info size={16} />
    },
  ];

  const faq = [
    {
      question: "Musím po registraci něco nakupovat?",
      answer: "Ne, registrace vás k ničemu nezavazuje. Nakupujete jen když chcete."
    },
    {
      question: "Kolik registrace stojí?",
      answer: "Registrace je zcela zdarma."
    },
    {
      question: "Jak dlouho trvá registrace?",
      answer: "Vyplnění formuláře zabere jen pár minut a potvrzení přijde obratem."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const response = await fetch('/api/register-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        if (window && window.navigator && window.navigator.vibrate) window.navigator.vibrate(100);
        window.alert('Registrace byla úspěšně odeslána!');
        form.reset();
      } else {
        window.alert('Něco se pokazilo při odesílání registrace. Zkuste to prosím znovu.');
      }
    } catch (err) {
      window.alert('Něco se pokazilo při odesílání registrace. Zkuste to prosím znovu.');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <SeoHead
        title="Beautybox | Nakupujte FARMASI levněji | Ivana Jiráková"
        description="Získejte exkluzivní benefity a nakupujte FARMASI levněji díky Beautyboxu. Registrace je zdarma a nezavazuje vás k žádným povinnostem."
        url="https://www.jirakovaiva.cz/beautybox"
      />
      <div className="min-h-screen bg-white">
        <NewsNavbar />
        <main className="pt-6 md:pt-2">
          <section className="section-padding bg-white relative z-10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h1 className="section-title text-[#21435F] animate-fade-in">
                  Nakupujte FARMASI levněji
                </h1>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-fade-in">
                  Staňte se součástí komunity FARMASI a získejte exkluzivní benefity. Registrace je zdarma a nezavazuje vás k žádným povinnostem.
                </p>
              </div>

              <div className="rounded-2xl p-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                  <div className="flex flex-col h-full">
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between h-full border border-[#21435F] rounded-2xl p-6 bg-[#F3E8E2] max-w-md w-full mx-auto md:max-w-none">
                      <h2 className="text-xl font-medium text-[#21435F] mb-6">Vyplňte údaje</h2>
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

                        <div className="md:col-span-2 pt-4 flex items-end">
                          <button
                            type="submit"
                            className="w-full bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full font-medium"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Odesílání...' : 'Odeslat'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="flex flex-col h-full lg:pl-8">
                    <div className="border border-[#21435F] rounded-2xl py-6 px-6 bg-[#F3E8E2]">
                      <h2 className="text-xl font-medium text-[#21435F] mb-6">Co získáte registrací?</h2>
                      <ul className="space-y-4 mb-0">
                        {discountBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <span className="bg-[#21435F] rounded-full p-1 text-white mr-3 flex-shrink-0">
                              {benefit.icon}
                            </span>
                            <span className="text-gray-700">{benefit.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <FooterNews />
      </div>
    </>
  );
};

export default Beautybox; 