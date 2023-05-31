import axios from "axios";
import { useState, useEffect } from "react";
import { MoviesCard } from "./MoviesCard";
import Genre from "./Genre";
import { ShowCards } from "./ShowCards";
import Selector from "./Selector";

export default function Discover() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [contentType, setContentType] = useState("movie");
  const [genre, setGenre] = useState("");
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/${contentType}`,
    params: {
      with_genres: genre,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
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
        <h2 className="text-3xl ">Discover</h2>

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
