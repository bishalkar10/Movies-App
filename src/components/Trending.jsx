import axios from "axios";
import { useState, useEffect } from "react";
import { MoviesCard } from "./MoviesCard";
import { ShowCards } from "./ShowCards";
import Selector from "./Selector";

export default function Trending() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [timeFrame, setTimeFrame] = useState("day");
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const [contentType, setContentType] = useState("movie");
  const fixedPath = "https://image.tmdb.org/t/p/w500";

  // axios options
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/${contentType}/${timeFrame}`,

    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  // call api then set moviesArray to response.data.results  -> it's an array
  useEffect(() => {
    async function fetchData() {
      const response = await axios.request(options);
      setMoviesArray(response.data.results);
    }
    fetchData();
  }, [timeFrame, contentType]);

  // map MoviesCard component for each movie in moviesArray
  const listOfMovies = moviesArray.map((movie) => {
    return (
      <MoviesCard
        id={movie.id}
        key={movie.id}
        url={fixedPath + movie.poster_path} // const fixedPath + the url for the poster
        name={movie.title || movie.originial_title || movie.original_name} // sometimes the title is not available ans sometimes it's original_title or original_name
      />
    );
  });

  return (
    <>
      <div className="flex items-center gap-10 p-5 mt-5 bg-red-50 ">
        <h2 className="text-3xl ">Trending</h2>
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

      <ShowCards listOfMovies={listOfMovies} route="/trending_gallery" />
    </>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);

  // Format the date string
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate; // Output: Mar 22, 2023
}
