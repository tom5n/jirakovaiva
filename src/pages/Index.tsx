import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Collaboration from "../components/Collaboration";
import Discount from "../components/Discount";
import News from "../components/News";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import OverviewPrograms from "../components/OverviewPrograms";
import FreeTemplates from "../components/FreeTemplates";
import Courses from "../components/Courses";

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

  // Update document title
  useEffect(() => {
    document.title = "Ivana Jiráková | FARMASI Ambasadorka";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Collaboration />
      <div className="w-full">
        <img src="/images/programy-top.svg" alt="Separator" className="w-full h-auto" />
      </div>
      <OverviewPrograms />
      <div className="w-full">
        <img src="/images/discount-top.svg" alt="Separator" className="w-full h-auto" />
      </div>
      <Courses />
      <div className="w-full">
        <img src="/images/tipy-top.svg" alt="Separator" className="w-full h-auto" />
      </div>
      <FreeTemplates />
      <div className="w-full">
        <img src="/images/benefity-top.svg" alt="Separator" className="w-full h-auto" />
      </div>
      <Discount />
      <div className="w-full">
        <img src="/images/benefity-bottom.svg" alt="Separator" className="w-full h-auto" />
      </div>
      <News />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
