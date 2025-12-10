import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TestimonialsAndCertificates from "../components/TestimonialsAndCertificates";
import PricingPackages from "../components/PricingPackages";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SeoHead from '../components/SeoHead';

const Koucink = () => {
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
        title="Koučink | Ivana Jiráková"
        description="Koučink a mentoring s Ivanou Jirákovou"
        url="https://www.jirakovaiva.cz/koucink"
      />
      <div className="min-h-screen">
        <Navbar />
        <Hero showDivider={false} />
        <div className="w-full">
          <img src="/images/dividers/koucink/1.svg" alt="Separator" className="w-full h-auto" />
        </div>
        <main>
          <TestimonialsAndCertificates />
          <div className="w-full">
            <img src="/images/dividers/koucink/2.svg" alt="Separator" className="w-full h-auto scale-x-[-1]" />
          </div>
          <PricingPackages />
          <div className="w-full">
            <img src="/images/dividers/koucink/3.svg" alt="Separator" className="w-full h-auto" />
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Koucink;

