import React, { useEffect, useState } from "react";
import NewsNavbar from "../components/NewsNavbar";
import Footer from "../components/Footer";
import type { News } from "../types";
import { supabase } from "../lib/supabase";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, ArrowRight } from "lucide-react";

const AllNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

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
  }, [loading]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NewsNavbar />
      <main className="pt-6 md:pt2">
        <section className="section-padding bg-white relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title reveal inline-block text-[#21435F]">
                Novinky a události
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto reveal reveal-delay-200">
                Buďte vždy v obraze s nejnovějšími událostmi, kurzy a akcemi. Pravidelně pořádám
                školení a workshopy, kde se můžete dozvědět více o produktech a podnikání s FARMASI.
              </p>
            </div>

            {loading ? (
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
                        <img
                          src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/news-images/${item.image_url}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center text-gray-500 mb-3">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">
                            {new Date(item.created_at).toLocaleDateString('cs-CZ')}
                          </span>
                        </div>
                        <h3 className="truncate text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 font-['Montserrat']">{item.title}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 font-['Montserrat'] line-clamp-3">{item.description}</p>
                        <DialogTrigger asChild>
                          <button
                            className="inline-flex items-center bg-[#F3E8E2] text-gray-800 hover:bg-[#F3E8E2]/90 transition-colors duration-300 px-6 py-3 rounded-full font-medium group w-fit mt-auto"
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
                            <span className="text-sm">
                              {new Date(item.created_at).toLocaleDateString('cs-CZ')}
                            </span>
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
          </div>
        </section>
      </main>
      {/* <div className="w-full">
        <img src="/images/footer-top2.svg" alt="Separator" className="w-full h-auto" />
      </div> */}
      <Footer />
    </div>
  );
};

export default AllNews; 