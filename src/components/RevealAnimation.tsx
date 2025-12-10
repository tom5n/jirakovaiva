
import React, { useEffect } from "react";

interface RevealAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

const RevealAnimation: React.FC<RevealAnimationProps> = ({ children, delay = 0 }) => {
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

  const delayClass = delay === 200 ? "reveal-delay-200" : 
                     delay === 400 ? "reveal-delay-400" : 
                     delay === 600 ? "reveal-delay-600" : "";

  return (
    <div className={`reveal ${delayClass}`}>
      {children}
    </div>
  );
};

export default RevealAnimation;
