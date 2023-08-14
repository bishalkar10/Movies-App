import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { FlexMoviesCard } from "../components/MoviesCard";
import Selector from "../components/Selector";
import { ShowGridCards } from "../components/ShowCards";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { formatDate, useScrollVisibility } from "../components/utils";

export default function Gallery() {
  const [moviesArray, setMoviesArray] = useState([]); // array of response.data.results
  const [timeFrame, setTimeFrame] = useState("day");
  const [page, setPage] = useState(1); // page number
  const [contentType, setContentType] = useState("movie");
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const showArrowButton = useScrollVisibility();     // custom hook - returns true if the user scrolled down 250px
  const uniqueMoviesId = new Map()
  const uniqueMovies = []

  // axios options
  const options = useMemo(() => ({
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/${contentType}/${timeFrame}`,
    params: {
      page: page.toString(),
    }, // convert integer to string
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken} `,
    },
  }), [contentType, timeFrame, page]) // * useMemo to prevent infinite loop

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
  }, [options]);

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
        url={fixedPath + movie.poster_path}
        name={
          movie.title ||
          movie.name ||
          movie.originial_title ||
          movie.original_name
        }
        releaseDate={formatDate(movie.release_date || movie.first_air_date)}
      />
    );
  });

  function handlePageEnd() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
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
    <>
      <div className="flex items-center gap-5 p-5  bg-[#e9edc9] ">
        <h2 className="mr-auto text-xl sm:text-3xl">Trending Gallery</h2>
        <Selector
          name="timeFrame"
          id="timeFrame_trendingGallery"
          setMoviesArray={setMoviesArray}
          setPage={setPage}
          state={timeFrame}
          setState={setTimeFrame}
          values={["day", "week"]}
        />

        <Selector
          name="contentType"
          id="contentType_trendingGallery"
          setMoviesArray={setMoviesArray}
          setPage={setPage}
          state={contentType}
          setState={setContentType}
          values={["movie", "tv"]}
        />
      </div>
      <ShowGridCards listOfMovies={listOfMovies} />
      {showArrowButton && <ScrollToTopButton />}
    </>
  );
}
