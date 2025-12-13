import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import News from "../components/News";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Courses from "../components/Courses";
import FarmasiSection from "../components/FarmasiSection";
import SeoHead from '../components/SeoHead';

const Index = () => {
  useEffect(() => {
    // Initialize reveal animations
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

  return (
    <>
      <SeoHead
        title="Ivana Jiráková | Koučka & Mentorka"
        description="Průvodkyně na cestě k finanční svobodě. Pomáhám ženám budovat úspěšné podnikání a dosáhnout finanční nezávislosti."
        url="https://www.jirakovaiva.cz/"
      />
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <div className="w-full">
          <img src="/images/dividers/2.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
        </div>
        <Courses />
        <div className="w-full">
          <img src="/images/dividers/3.svg" alt="Separator" className="w-full h-auto" />
        </div>
        <FarmasiSection />
        <div className="w-full">
          <img src="/images/dividers/1.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
        </div>
        <News />
        <div className="w-full">
          <img src="/images/dividers/2.svg" alt="Separator" className="w-full h-auto" />
        </div>
        <Contact />
        <div className="w-full">
          <img src="/images/dividers/7.svg" alt="Separator" className="w-full h-auto" />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
