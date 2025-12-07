import { getDiscover } from "@/api/tmdb";
import { useState, useEffect } from "react";
import { MoviesCard } from "./MoviesCard";
import Genre from "./Genre";
import { ShowCards, ShowLoadingCards } from "./ShowCards";
import Selector from "./Selector";
import { formatDate } from "@/components/utils";

export default function Discover() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [contentType, setContentType] = useState("movie");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);

  const fixedPath = "https://image.tmdb.org/t/p/w500"; // url prefix for images link

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getDiscover(contentType, 1, genre);
        setMoviesArray(response.data.results);
        setLoading(false); // setLoading to false when data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [contentType, genre]);

  const listOfMovies = moviesArray.map((movie) => {
    return (
      <MoviesCard
        type={contentType}
        id={movie.id}
        key={movie.id}
        url={fixedPath + movie.poster_path} // const fixedPath + the url for the poster
        name={
          movie.title ||
          movie.name ||
          movie.original_title ||
          movie.original_name
        } // sometimes the title is not available ans sometimes it's original_title or original_name
        releaseDate={formatDate(movie.release_date || movie.first_air_date)}
      />
    );
  });

  return (
    <>
      <div className="flex items-center gap-5 p-5 bg-[#e9edc9] ">
        <h2 className="mr-auto text-xl sm:text-3xl">Discover</h2>

        <Selector
          name="contentType"
          id="contentType_discover"
          setMoviesArray={setMoviesArray}
          state={contentType}
          setState={setContentType}
          values={["movie", "tv"]}
        />
        <Genre type={contentType} genre={genre} setGenre={setGenre} />
      </div>
      {loading ? (
        <ShowLoadingCards /> // Display loading cards while data is loading
      ) : (
        <ShowCards listOfMovies={listOfMovies} route="/discover_gallery" />
      )}
    </>
  );
}
