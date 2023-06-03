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
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
