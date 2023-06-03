import { TvGenre, MoviesGenre } from "../asset/GenreData";
import { Link } from "react-router-dom";
import { getReleaseYear } from "./helperfunction";
export default function SearchResultsCard({
  id,
  title,
  backdrop_path,
  poster_path,
  type,
  genres,
  release_date,
  overview,
}) {
  let genreList = [];
  // * find the genre id inside the GenreData component and return the name of the genre
  if (type === "tv" && genres) {
    genreList = genres.map((genreId) => {
      const genre = TvGenre.tvGenres.find((item) => item.id === genreId);
      return genre ? genre.name : null;
    });
  } else if (type === "movie" && genres) {
    genreList = genres.map((genreId) => {
      const genre = MoviesGenre.movieGenres.find((item) => item.id === genreId);
      return genre ? genre.name : null;
    });
  }

  return (
    <div className="flex gap-2 p-2 my-4 border-b-4 border-black ">
      {/* if poster_path or backdrop_path is available then render */}
      {poster_path || backdrop_path ? (
        <img
          className="flex-shrink-0 w-40 rounded h-60"
          src={poster_path || backdrop_path}
          alt=""
          width={160}
        />
      ) : (
        <div className="grid flex-shrink-0 w-40 bg-gray-400 rounded place-content-center h-60">
          Image not available
        </div>
      )}

      <div className="flex flex-col w-full ">
        {/** if release_date is available then render */}
        <Link to={`/details/${type}/${id}`}>
          <h1 className="text-xl font-semibold">
            {title} {release_date && `(${getReleaseYear(release_date)})`}
          </h1>
        </Link>

        <p className="mb-auto">{genreList.join(", ")}</p>
        {/* if overview data is available then render */}
        {overview && (
          <div className="my-2 overflow-hidden h-28 bg-slate-100 ">
            {overview}
          </div>
        )}
      </div>
    </div>
  );
}
