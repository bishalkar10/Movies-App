import { useEffect, useState } from "react";

export function useScrollVisibility() {
  const scrollThreshold = 250; // Adjust this value as needed
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


