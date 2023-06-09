import { useEffect, useState } from "react";

export function useScrollVisibility() {
  const scrollThreshold = 200; // Adjust this value as needed
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > scrollThreshold);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
}

export function getReleaseYear(release_date) {
  const date = new Date(release_date);
  return date.getFullYear();
}

export function getRuntime(runtime) {
  runtime = parseInt(runtime);
  const hour = Math.floor(runtime / 60); // if runtime is 176m  then hour is 176/ 60 = 2
  const minute = runtime - hour * 60; // minute = 176  - (60 * 2) = 176 - 120 = 56
  return hour > 0 ? `${hour}H ${minute}minutes` : `${minute}minutes`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Format the date string
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate; // Output: Mar 22, 2023
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// scroll to top arrow button component
export function ScrollToTopButton() {
  return (
    <div
      onClick={scrollToTop}
      className="fixed grid w-8 h-8 bg-green-800 text-white rounded-full shadow-[0_10px_10px_2px_rgba(0,0,0,0.3)] cursor-pointer bottom-5 right-5 place-content-center animate-bounce"
    >
      <i className="fa fa-arrow-up"></i>
    </div>
  );
}
