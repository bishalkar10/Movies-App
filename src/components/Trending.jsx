import axios from "axios";
import { useState, useEffect } from "react";
import { MoviesCard } from "./MoviesCard";
import { ShowCards, ShowLoadingCards } from "./ShowCards";
import Selector from "./Selector";
import { formatDate } from "./utils";

export default function Trending() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [timeFrame, setTimeFrame] = useState("day");
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const [contentType, setContentType] = useState("movie");
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  const [loading, setLoading] = useState(true);

  // call api then set moviesArray to response.data.results -> it's an array
  useEffect(() => {
    async function fetchData() {
      const url = `https://api.themoviedb.org/3/trending/${contentType}/${timeFrame}`;
      const options = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${bearerToken} `,
        },
      };
      try {
        setLoading(true); // setLoading to true while data is loading
        const response = await axios.get(url, options);
        console.log(response.data.results)
        setMoviesArray(response.data.results);
        setLoading(false); // setLoading to false when data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
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
