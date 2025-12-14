import { getSearch } from "@/api/tmdb";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPlay, FaArrowLeft } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import MovieCard, { LoadingCards } from "@/components/MoviesCard";

export default function SearchResults() {
  const { filter, searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getSearch(filter, searchTerm);
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }
    setResults([]);
    fetchData();
  }, [searchTerm, filter]);

  return (
    <div className="modern-app">
      <Navbar />

      <div className="gallery-container">
        <div className="gallery-header" style={{ justifyContent: 'flex-start' }}>
          <Link to="/" className="back-link">
            <FaArrowLeft />
          </Link>
          <h1 className="section-title gallery-title">
            Search Results for "{searchTerm}"
          </h1>
        </div>

        {results.length === 0 && !loading ? (
          <div className="no-results">
            <h2>No results found</h2>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {results.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
                type={movie.media_type || 'movie'}
                className="w-full"
              />
            ))}

            {loading && Array.from({ length: 10 }).map((_, index) => (
              <LoadingCards key={`skeleton-${index}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
