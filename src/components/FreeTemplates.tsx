import React, { useEffect, useState } from "react";
import { Download, FileText, Instagram, Lightbulb, ArrowRight, ClipboardCheck, BookOpen, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Template = {
  id: string
  title: string
  description: string
  cta: string
  href: string
  icon: string
  created_at: string
}

const iconComponents = {
  FileText: FileText,
  Instagram: Instagram,
  Lightbulb: Lightbulb,
  ClipboardCheck: ClipboardCheck,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
}

const FreeTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTemplates(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Spustit až po načtení šablon
    if (!loading && templates.length > 0) {
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
    }
  }, [loading, templates]);

  if (loading) {
    return (
      <section id="templates" className="section-padding bg-[#FFD1C1]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto reveal inline-block text-[#21435F]">
              Tipy a rady za Vaší cestou k úspěchu
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto reveal reveal-delay-200">
              Vaše cesta k úspěchu začíná zde.
            </p>
          </div>
          <div className="text-center text-lg text-[#21435F]">Načítání...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="templates" className="section-padding bg-[#FFD1C1]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto reveal inline-block text-[#21435F]">
            Tipy a rady za Vaší cestou k úspěchu
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto reveal reveal-delay-200">
            Vaše cesta k úspěchu začíná zde.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {templates.slice(0, 2).map((template, idx) => {
            const IconComponent = iconComponents[template.icon as keyof typeof iconComponents]
            return (
              <div
                key={template.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-[#21435F] reveal transition-all duration-300 hover:shadow-xl z-10 flex flex-col h-full"
                style={{ position: 'relative', zIndex: 10 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#21435F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center mb-6 min-h-[56px]">
                    <div className="bg-[#FFD1C1] rounded-full p-3 mr-4">
                      {IconComponent && <IconComponent size={24} className="text-[#21435F]" />}
                    </div>
                    <h3 className="text-2xl font-semibold text-[#21435F] font-['Montserrat'] min-h-[2.5rem] flex items-center">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-8 line-clamp-3 flex-1">
                    {template.description}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={template.href}
                      className="inline-flex items-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium group"
                    >
                      {template.cta}
                      <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FreeTemplates; 