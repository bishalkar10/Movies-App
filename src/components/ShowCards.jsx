import { Link } from "react-router-dom";
import { LoadingCards } from "./MoviesCard";
export function ShowCards({ listOfMovies, route }) {
  return (
    <div className="flex w-full gap-6 p-5 overflow-x-auto ">
      {listOfMovies}

      <div className="grid flex-shrink-0 w-40 rounded-lg hover:scale-110 hover:duration-300 bg-gray-50 h-60 place-content-center ">
        <Link to={route}>
          See All <i className="inline text-center fa fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}

export function ShowGridCards({ listOfMovies }) {
  return (
    <div className="  gap-4 p-3  xl:grid-cols-[repeat(7,1fr)] lg:grid-cols-[repeat(6,1fr)] md:grid-cols-[repeat(5,1fr)] sm:grid-cols-[repeat(4,1fr)] grid grid-cols-[repeat(2,1fr)]">
      {listOfMovies}
    </div>
  );
}

export function ShowLoadingCards() {
  return (
    // Render loading cards while data is loading
    <div className="flex w-full gap-6 p-5 overflow-x-auto ">
      {Array.from({ length: 20 }).map((_, index) => (
        <LoadingCards key={index} />
      ))}
    </div>
  );
}
