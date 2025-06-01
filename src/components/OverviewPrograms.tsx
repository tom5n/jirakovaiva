import React from "react";
import { ArrowRight, Star, BookOpen, User, Calendar, Send, MessageSquare } from "lucide-react";

const programs = [
  {
    title: "Masterclass",
    icon: <Star size={24} className="text-[#21435F] mr-3" />, 
    description:
      "Intenzivní online workshop zaměřený na konkrétní téma (například prodej, sociální sítě nebo osobní rozvoj). Vhodné pro všechny, kdo chtějí rychle získat nové dovednosti a inspiraci. Probíhá online, s možností dotazů a sdílení zkušeností.",
    cta: "Zobrazit více",
    href: "#news",
    ctaIcon: <MessageSquare size={18} className="ml-2 transition-transform duration-300 group-hover:scale-110" />
  },
  {
    title: "FARMASI Akademie",
    icon: <BookOpen size={24} className="text-[#21435F] mr-3" />, 
    description:
      "Komplexní vzdělávací program pro ty, kdo chtějí podnikat dlouhodobě a růst. Obsahuje sérii lekcí, praktických úkolů a podporu komunity. Ideální pro ženy, které chtějí budovat stabilní podnikání a posouvat se krok za krokem.",
    cta: "Chci se přihlásit",
    href: "#discount",
    ctaIcon: <Calendar size={18} className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
  },
  {
    title: "Školení 1:1",
    icon: <User size={24} className="text-[#21435F] mr-3" />, 
    description:
      "Individuální spolupráce přímo s Ivanou. Osobní vedení, zpětná vazba a podpora na míru vašim potřebám. Vhodné pro ty, kdo chtějí maximální pozornost a rychlý posun vpřed.",
    cta: "Rezervovat místo",
    href: "/rezervace",
    ctaIcon: <Send size={18} className="ml-2 transition-transform duration-300 group-hover:-rotate-12" />
  },
];

const OverviewPrograms = () => {
  return (
    <section id="programs" className="section-padding bg-[#F3E8E2]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto reveal inline-block text-[#21435F]">
            Přehled programů
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto reveal reveal-delay-200">
            Vyberte si formát, který Vám nejvíce vyhovuje. Každý program je navržený tak, aby Vás posunul blíž k vašim cílům a dal Vám maximum podpory i inspirace.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="bg-[#FFD1C1] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[#21435F] reveal transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                {program.icon}
                <h3 className="text-2xl font-semibold text-[#21435F] font-['Montserrat']">
                  {program.title}
                </h3>
              </div>
              <p className="text-gray-700 mb-8 flex-1">
                {program.description}
              </p>
              <a
                href={program.href}
                className="mt-auto inline-flex items-center bg-[#F3E8E2] text-gray-800 hover:bg-[#F3E8E2]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium group"
              >
                {program.cta}
                {program.ctaIcon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OverviewPrograms; 