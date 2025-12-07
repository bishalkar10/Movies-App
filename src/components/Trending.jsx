import { getTrending } from "@/api/tmdb";
import { useState, useEffect } from "react";
import { MoviesCard } from "./MoviesCard";
import { ShowCards, ShowLoadingCards } from "./ShowCards";
import Selector from "./Selector";
import { formatDate } from "@/components/utils";

export default function Trending() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [timeFrame, setTimeFrame] = useState("day");
  const [contentType, setContentType] = useState("movie");
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  const [loading, setLoading] = useState(true);

  // call api then set moviesArray to response.data.results -> it's an array
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getTrending(contentType, timeFrame);
        console.log(response.data.results);
        setMoviesArray(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false even on error
      }
    }
    fetchData();
  }, [contentType, timeFrame]);

  // map MoviesCard component for each movie in moviesArray
  const listOfMovies = moviesArray.map((movie) => {
    return (
      <MoviesCard
        type={contentType}
        id={movie.id}
        key={movie.id}
        url={fixedPath + movie.poster_path}
        name={
          movie.title ||
          movie.name ||
          movie.original_title ||
          movie.original_name
        }
        releaseDate={formatDate(movie.release_date || movie.first_air_date)}
      />
    );
  });

  return (
    <>
      <div className="flex items-center gap-5 p-5 bg-[#e9edc9] ">
        <h2 className="mr-auto text-xl sm:text-3xl ">Trending</h2>
        <Selector
          setMoviesArray={setMoviesArray}
          state={timeFrame}
          setState={setTimeFrame}
          values={["day", "week"]}
        />

        <Selector
          name="contentType"
          id="contentType_trending"
          setMoviesArray={setMoviesArray}
          state={contentType}
          setState={setContentType}
          values={["movie", "tv"]}
        />
      </div>

      {loading ? (
        <ShowLoadingCards /> // Display loading cards while data is loading
      ) : (
        <ShowCards listOfMovies={listOfMovies} route="/trending_gallery" />
      )}
    </>
  );
}
