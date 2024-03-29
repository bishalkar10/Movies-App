import axios from "axios";
import { useState, useEffect } from "react";
import { FlexMoviesCard } from "../components/MoviesCard";
import Genre from "../components/Genre";
import Selector from "../components/Selector";
import { ShowGridCards } from "../components/ShowCards";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { formatDate, useScrollVisibility } from "../components/utils";

export default function DiscoverGallery() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [page, setPage] = useState(1); // page number
  const [genre, setGenre] = useState("");
  const [contentType, setContentType] = useState("movie");
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const showArrowButton = useScrollVisibility();
  const uniqueMoviesId = new Map()
  const uniqueMovies = []

  // call api then set moviesArray to response.data.results  -> it's an array
  useEffect(() => {
    async function fetchData() {
      const url = `https://api.themoviedb.org/3/discover/${contentType}`;
      const options = {
        params: {
          page: page.toString(),
          with_genres: genre,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${bearerToken} `,
        },
      };
      const response = await axios.get(url, options);
      setMoviesArray((prevMoviesArray) => [
        ...prevMoviesArray,
        ...response.data.results,
      ]);
    }

    fetchData();
  }, [page, genre, contentType]);

  // * filter moviesArray to get unique movie
  moviesArray.forEach(movie => {
    if (!uniqueMoviesId.has(movie.id)) {
      uniqueMoviesId.set(movie.id, true)
      uniqueMovies.push(movie)
    }
  })
  // * map MoviesCard component for each movie in uniqueMovies
  const listOfMovies = uniqueMovies.map((movie) => {
    return (
      <FlexMoviesCard
        type={contentType}
        id={movie.id}
        key={movie.id}
        url={fixedPath + movie.poster_path} // * const fixedPath + the url for the poster
        name={
          movie.title ||
          movie.name ||
          movie.original_title ||
          movie.original_name
        } // * sometimes the title is not available ans sometimes it's original_title or original_name
        releaseDate={formatDate(movie.release_date || movie.first_air_date)}
      />
    );
  });

  // when our user reaches the page bottom them immedietly call the handlePageEnd funtion and set isScrolling to true.
  // We set isScrolling to true so that the handlePageEnd function is not called multiple times.
  // We set isScrolling to false after 500ms so that the handlePageEnd function can be called again.
  // * this is to prevent the handlePageEnd function from being called multiple times when the user reaches the page bottom
  useEffect(() => {
    // when our user reaches the page bottom them immedietly call the handlePageEnd funtion 
    // this function increments the page number by 1 which causes the useEffect to run again and make an api call with the new page number
    const handlePageEnd = () => setPage((prevPage) => prevPage + 1);
    let isScrolling = false;

    function handleScroll() {
      if (isScrolling) {
        return;
      }

      const scrollTop = document.documentElement?.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement?.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement?.clientHeight || window.innerHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight + 200) >= scrollHeight;

      if (scrolledToBottom) {
        handlePageEnd();
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center gap-5 p-5  bg-[#e9edc9] ">
        <h2 className="mr-auto text-xl sm:text-3xl ">Discover Gallery</h2>

        <Selector
          name="contentType"
          id="contentType_discoverGallery"
          setMoviesArray={setMoviesArray}
          setPage={setPage}
          state={contentType}
          setState={setContentType}
          values={["movie", "tv"]}
        />
        <Genre
          setMoviesArray={setMoviesArray}
          setPage={setPage}
          type={contentType}
          genre={genre}
          setGenre={setGenre}
        />
      </div>

      <ShowGridCards listOfMovies={listOfMovies} />
      {showArrowButton && <ScrollToTopButton />}
    </div>
  );
}
