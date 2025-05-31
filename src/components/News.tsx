import React, { useEffect, useState, useRef } from "react";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription } from "./ui/dialog";
import { supabase } from "@/lib/supabase";

type News = {
  id: string
  title: string
  description: string
  created_at: string
  image_url: string
  location: string
  time: string
}

const News = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      fetchNews();
    }
  }, [isVisible]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && news.length > 0) {
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
  }, [loading, news]);

  const handleImageLoad = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      {/* <div className="w-full">
        <img src="/images/discount-bottom.svg" alt="Separator" className="w-full h-auto" />
      </div> */}
      <section ref={sectionRef} id="news" className="section-padding bg-[#F3E8E2] relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto reveal inline-block text-[#21435F]">
              Novinky a události
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto reveal reveal-delay-200">
              Buďte vždy v obraze s nejnovějšími událostmi, kurzy a akcemi. Pravidelně pořádám školení a workshopy, kde se můžete dozvědět více o produktech a podnikání s FARMASI.
            </p>
          </div>

          {!isVisible ? (
            <div className="h-[400px] flex items-center justify-center relative z-10">
              <div className="text-center text-lg text-[#21435F]">Načítání...</div>
            </div>
          ) : loading ? (
            <div className="text-center text-lg text-[#21435F] relative z-10">Načítání...</div>
          ) : news.length === 0 ? (
            <div className="text-center text-lg text-gray-600 relative z-10">Zatím nejsou žádné novinky.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {news.map((item, index) => (
                <Dialog key={item.id} open={openIndex === index} onOpenChange={(open) => setOpenIndex(open ? index : null)}>
                  <div
                    className={`card overflow-hidden reveal flex flex-col ${
                      index === 1 ? "reveal-delay-200" : index === 2 ? "reveal-delay-400" : ""
                    } shadow-lg bg-white rounded-2xl relative`}
                  >
                    <div className="h-52 overflow-hidden cursor-pointer relative" onClick={() => setOpenIndex(index)}>
                      {!imageLoading[item.id] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                      )}
                      <img
                        src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/news-images/${item.image_url}`}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoading[item.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(item.id)}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-gray-500 mb-3">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm">{new Date(item.created_at).toLocaleDateString('cs-CZ')}</span>
                      </div>
                      <h3 className="truncate text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 font-['Montserrat']">{item.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 font-['Montserrat'] line-clamp-3">{item.description}</p>
                      <DialogTrigger asChild>
                        <button
                          className="inline-flex items-center bg-[#F3E8E2] text-gray-800 hover:bg-[#F3E8E2]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium group w-fit"
                        >
                          Více informací
                          <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </DialogTrigger>
                    </div>
                  </div>
                  <DialogContent hideCloseButton className="z-50">
                    <DialogTitle className="sr-only">{item.title}</DialogTitle>
                    <DialogDescription className="sr-only">
                      Detailní informace o novince: {item.title}
                    </DialogDescription>
                    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-0 sm:p-0">
                      <div className="relative w-full">
                        <img 
                          src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/news-images/${item.image_url}`}
                          alt={item.title} 
                          className="w-full max-h-[220px] sm:max-h-[340px] object-cover rounded-t-none sm:rounded-t-xl" 
                          loading="lazy"
                        />
                        <DialogClose asChild>
                          <button
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/80 hover:bg-white text-[#21435F] rounded-full p-2 shadow-md transition"
                            aria-label="Zavřít"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#21435F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6 6 18M6 6l12 12"/></svg>
                          </button>
                        </DialogClose>
                      </div>
                      <div className="w-full bg-white rounded-b-none sm:rounded-b-xl px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-start">
                        <div className="flex items-center text-gray-500 mb-3">
                          <Calendar size={18} className="mr-2" />
                          <span className="text-base">{new Date(item.created_at).toLocaleDateString('cs-CZ')}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#21435F] text-left">{item.title}</h3>
                        <p className="text-gray-700 text-left text-base sm:text-lg max-w-xl">{item.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}

          <div className="text-center mt-12 reveal reveal-delay-600 relative z-10">
            <a href="/novinky" className="inline-flex items-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full">
              Zobrazit všechny novinky
              <Newspaper size={18} className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
            </a>
          </div>
        </div>
      </section>
      <div className="w-full">
        <img src="/images/ig-top.svg" alt="Separator" className="w-full h-auto" />
      </div>
    </>
  );
};

export default News;
