import { TvGenre, MoviesGenre } from "../asset/GenreData";

export default function SearchResultsCard({
  title,
  backdrop_path,
  poster_path,
  type,
  genres,
  release_date,
  overview,
}) {
  let genreList = [];

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
  function getReleaseYear(release_date) {
    const date = new Date(release_date);
    return date.getFullYear();
  }
  return (
    <div className="flex border-b-4 border-black p-2 gap-2 my-4 ">
      {poster_path || backdrop_path ? (
        <img
          className="flex-shrink-0 w-40 h-60 rounded"
          src={poster_path || backdrop_path}
          alt=""
          width={160}
        />
      ) : (
        <div className="flex-shrink-0 w-40 grid place-content-center h-60 rounded bg-gray-400">
          Image not available
        </div>
      )}

      <div className="w-full flex flex-col ">
        <h1 className="text-xl font-semibold">
          {title} {release_date && `(${getReleaseYear(release_date)})`}
        </h1>

        <p className="mb-auto">{genreList.join(", ")}</p>

        <div className="overflow-hidden h-28 my-2 bg-slate-100  ">
          {overview}
        </div>
      </div>
    </div>
  );
}
