import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

// scroll to top arrow button component
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={scrollToTop}
      className="fixed grid w-10 h-10 text-white rounded-full bg-indigo-600/80 hover:bg-indigo-500 shadow-lg cursor-pointer bottom-6 right-6 place-content-center animate-bounce hover:scale-110 transition-all z-50 backdrop-blur-sm border border-indigo-400/30"
    >
      <FaArrowUp />
    </div>
  );
}