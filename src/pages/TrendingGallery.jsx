import { getTrending } from "@/api/tmdb";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaArrowLeft } from "react-icons/fa";
import Navbar from "@/components/Navbar";

import { LoadingCards } from "@/components/MoviesCard";
import Select from "@/components/Select";
import { MEDIA_TYPE, TIME_WINDOW } from "@/constants";
import MovieCard from "@/components/MoviesCard";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function TrendingGallery() {
  const [movies, setMovies] = useState([]);
  const [timeFrame, setTimeFrame] = useState("day");
  const [contentType, setContentType] = useState("movie");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getTrending(contentType, timeFrame, page);
        if (page === 1) {
          setMovies(response.data?.results || []);
        } else {
          setMovies(prev => [...prev, ...(response.data?.results || [])]);
        }
      } catch (error) {
        console.error("Error fetching trending:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [contentType, timeFrame, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [contentType, timeFrame]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="modern-app">
      <Navbar />

      <div className="gallery-container">
        <div className="gallery-header">
          <div className="gallery-title-group">
            <Link to="/" className="back-link">
              <FaArrowLeft />
            </Link>
            <h1 className="section-title gallery-title">Trending Gallery</h1>
          </div>

          <div className="gallery-actions">
            {/* Content Type Selector */}
            <Select
              options={[
                { label: 'Movies', value: MEDIA_TYPE.MOVIE },
                { label: 'TV Shows', value: MEDIA_TYPE.TV }
              ]}
              value={contentType}
              onChange={setContentType}
              className="w-40"
            />

            {/* Time Frame Selector */}
            <Select
              options={[
                { label: 'Today', value: TIME_WINDOW.DAY },
                { label: 'This Week', value: TIME_WINDOW.WEEK }
              ]}
              value={timeFrame}
              onChange={setTimeFrame}
              className="w-40"
            />
          </div>
        </div>

        <div className="movies-grid">
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              type={contentType}
              className="w-full"
            />
          ))}

          {loading && Array.from({ length: 10 }).map((_, index) => (
            <LoadingCards key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
