import { getSearch } from "@/api/tmdb";
import { useEffect, useState } from "react";
import SearchResultsCard from "./SearchResultsCard";
import { useParams } from "react-router-dom";

export default function SearchResults() {
  const { filter, searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const fixedPath = "https://image.tmdb.org/t/p/w500"; // url prefix for images

  // api call inside useEffect hook
  useEffect(() => {
    async function fetchData() {
      const response = await getSearch(filter, searchTerm);
      setResults(response.data.results);
    }

    fetchData();
  }, [searchTerm, filter]);

  // Array of SearchResultsCard component
  const CardArray = results.map((result) => {
    return (
      <SearchResultsCard
        key={result.id}
        id={result.id}
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
  // Jsx --- rendering the CardArray
  return <div>{CardArray}</div>;
}
