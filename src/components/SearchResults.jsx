import axios from "axios";
import { useEffect, useState } from "react";
import SearchResultsCard from "./SearchResultsCard";

export default function SearchResults({ searchValue, filter }) {
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const [results, setResults] = useState([]);
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/${filter}`,
        params: {
          query: searchValue,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      const response = await axios.request(options);
      console.log(response.data);
      setResults(response.data.results);
    }

    fetchData();
  }, [searchValue, filter]);
  const CardArray = results.map((result) => {
    return (
      <SearchResultsCard
        key={result.id}
        title={result.title || result.original_title || result.name}
        backdrop_path={
          result.backdrop_path &&
          "https://image.tmdb.org/t/p/w500" + result.backdrop_path
        }
        poster_path={result.poster_path && fixedPath + result.poster_path}
        type={result.media_type}
        genres={result.genre_ids && result.genre_ids}
        release_date={result.release_date || result.first_air_date}
        overview={result.overview}
      />
    );
  });

  return <div>{CardArray}</div>;
}
