import axios from "axios";
import { useState, useEffect } from "react";
import { MoviesCard } from "./MoviesCard";
import Genre from "./Genre";
import { ShowCards } from "./ShowCards";
import Selector from "./Selector";
import { formatDate } from "./helperfunction";

export default function Discover() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [contentType, setContentType] = useState("movie");
  const [genre, setGenre] = useState("");
  const fixedPath = "https://image.tmdb.org/t/p/w500"; // url prefix for images link
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN; // extracting the bearer token from .env file
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/${contentType}`,
    params: {
      with_genres: genre,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken} `,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.request(options);
      setMoviesArray(response.data.results);

      //   console.log(response.data);
    }
    fetchData();

    // console.log(moviesArray);
  }, [contentType, genre]);

  const listOfMovies = moviesArray.map((movie) => {
    return (
      <MoviesCard
        type={contentType}
        id={movie.id}
        key={movie.id}
        url={fixedPath + movie.poster_path} // const fixedPath + the url for the poster
        name={movie.title || movie.original_title || movie.original_name} // sometimes the title is not available ans sometimes it's original_title or original_name
        releaseDate={formatDate(movie.release_date || movie.first_air_date)}
      />
    );
  });

  return (
    <>
      <div className="flex items-center gap-5 p-5 bg-red-50 ">
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
      <ShowCards listOfMovies={listOfMovies} route="/discover_gallery" />
    </>
  );
}
