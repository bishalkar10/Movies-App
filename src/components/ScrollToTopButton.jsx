// scroll to top arrow button component
export default function ScrollToTopButton() {
  return (
    <div
      onClick={scrollToTop}
      className="fixed grid w-8 h-8 bg-green-800 text-white rounded-full shadow-[0_10px_10px_2px_rgba(0,0,0,0.3)] cursor-pointer bottom-5 right-5 place-content-center animate-bounce"
    >
      <i className="fa fa-arrow-up"></i>
    </div>
  );
} 

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}