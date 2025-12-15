import React, { useEffect, useState } from 'react';
import { LoadingCards } from '../components/MoviesCard';
import { getTrending } from '../api/tmdb';
import Navbar from '../components/Navbar';
import Trending from '../components/Trending';
import Discover from '../components/Discover';
import { MEDIA_TYPE, TIME_WINDOW, TMDB_API, IMAGE_SIZE } from '../constants';

export function HomepageSkeleton() {
  return (
    <div className="modern-app">
      <Navbar />
      <div className="skeleton-hero"></div>

      {/* Section Skeleton 1 */}
      <section className="category-section">
        <div className="section-header">
          <div className="skeleton-title" style={{ width: '200px', height: '2rem', marginBottom: 0 }}></div>
        </div>
        <div className="movie-row">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCards key={i} />
          ))}
        </div>
      </section>

      {/* Section Skeleton 2 */}
      <section className="category-section">
        <div className="section-header">
          <div className="skeleton-title" style={{ width: '200px', height: '2rem', marginBottom: 0 }}></div>
        </div>
        <div className="movie-row">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCards key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Homepage() {
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    // Fetch Trending for Hero
    const fetchHero = async () => {
      try {
        const response = await getTrending(MEDIA_TYPE.MOVIE, TIME_WINDOW.DAY);
        const results = response.data?.results || [];

        // Set Hero Movie (random from top 5)
        if (results.length > 0) {
          const randomHero = results[Math.floor(Math.random() * Math.min(5, results.length))];
          setHeroMovie(randomHero);
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };
    fetchHero();
  }, []);

  // Helper to get image URL
  const getImageUrl = (path, size = IMAGE_SIZE.BACKDROP) => {
    if (!path) return '';
    return `${TMDB_API.IMAGE_BASE_URL}${size}${path}`;
  };

  if (!heroMovie) return <HomepageSkeleton />;

  return (
    <div className="modern-app">
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero"
        style={{ '--hero-bg': `url(${getImageUrl(heroMovie?.backdrop_path)})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-genres">
            Trending Now
          </div>
          <h1 className="hero-title">{heroMovie?.title || heroMovie?.name}</h1>
          <p className="hero-overview">{heroMovie?.overview}</p>
        </div>
      </section>

      {/* Trending Section */}
      <Trending />

      {/* Discover Section */}
      <Discover />
    </div>
  );
}
