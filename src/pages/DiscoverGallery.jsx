import axios from "axios";
import { useState, useEffect } from "react";
import { FlexMoviesCard } from "../components/MoviesCard";
import Genre from "../components/Genre";
import Selector from "../components/Selector";
import { ShowGridCards } from "../components/ShowCards";
import {
  ScrollToTopButton,
  formatDate,
  useScrollVisibility,
} from "../components/helperfunction";

export default function DiscoverGallery() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [page, setPage] = useState(1); // page number
  const [genre, setGenre] = useState("");
  const [contentType, setContentType] = useState("movie");
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const showArrowButton = useScrollVisibility();

  // axios options
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/${contentType}`,
    params: {
      page: page.toString(),
      with_genres: genre,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken} `,
    },
  };

  // call api then set moviesArray to response.data.results  -> it's an array
  useEffect(() => {
    async function fetchData() {
      const response = await axios.request(options);
      setMoviesArray((prevMoviesArray) => [
        ...prevMoviesArray,
        ...response.data.results,
      ]);
    }

    fetchData();
  }, [genre, contentType, page]);

  // * filter moviesArray to get unique movies
  const uniqueMovies = moviesArray.filter((movie, index, self) => {
    const firstIndex = self.findIndex((item) => item.id === movie.id);
    return firstIndex === index;
  });
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
          movie.originial_title ||
          movie.original_name
        } // * sometimes the title is not available ans sometimes it's original_title or original_name
        releaseDate={formatDate(movie.release_date || movie.first_air_date)}
      />
    );
  });

  function handlePageEnd() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    // when our user reaches the page bottom them immedietly call the handlePageEnd funtion
    // then set the isScrolling variable to true
    // don't make the change the isScroll varible to false for the next 500ms to prevent excessive API calls
    let isScrolling = false;
    function handleScroll() {
      if (isScrolling) {
        return;
      }

      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight + 200) >= scrollHeight;

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
