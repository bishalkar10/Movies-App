import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { getTrending } from '../api/tmdb';
import MovieCard, { LoadingCards } from './MoviesCard';
import { MEDIA_TYPE, TIME_WINDOW } from '../constants';
import Select from './Select';


export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [trendingTime, setTrendingTime] = useState(TIME_WINDOW.DAY);
  const [trendingType, setTrendingType] = useState(MEDIA_TYPE.MOVIE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Trending
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const response = await getTrending(trendingType, trendingTime);
        const results = response.data?.results || [];
        setTrending(results);
      } catch (error) {
        console.error("Error fetching trending:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, [trendingTime, trendingType]);

  return (
    <section className="category-section">
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="section-title section-title-text">Trending Now</h2>
          {/* Controls Container */}
          <div className='btn-link-wrapper'>

            <div className="select-group">
              {/* Type Select */}
              <Select
                options={[
                  { label: 'Movies', value: MEDIA_TYPE.MOVIE },
                  { label: 'TV Shows', value: MEDIA_TYPE.TV }
                ]}
                value={trendingType}
                onChange={setTrendingType}
                className="w-32"
              />
              {/* Time Select */}
              <Select
                options={[
                  { label: 'Today', value: TIME_WINDOW.DAY },
                  { label: 'This Week', value: TIME_WINDOW.WEEK }
                ]}
                value={trendingTime}
                onChange={setTrendingTime}
                className="w-32"
              />
            </div>
            <Link to="/trending_gallery" className="see-all-link">
              See All <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>
      <div className="movie-row">
        {loading ? (
          // Show loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <LoadingCards key={index} />
          ))
        ) : (
          <>
            {trending.map(movie => (
              <MovieCard key={movie.id} movie={movie} type={trendingType} />
            ))}
            {/* See All Card */}
            <Link to="/trending_gallery" className="see-all-card">
              <div className="see-all-icon"><FaChevronRight /></div>
              <span>See All</span>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
