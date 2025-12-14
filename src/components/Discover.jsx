import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { getDiscover } from '../api/tmdb';
import MovieCard, { LoadingCards } from './MoviesCard';
import Genre from './Genre';
import { MEDIA_TYPE, TMDB_API, IMAGE_SIZE } from '../constants';
import Select from './Select';


export default function Discover() {
  const [discover, setDiscover] = useState([]);
  const [discoverType, setDiscoverType] = useState(MEDIA_TYPE.MOVIE);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Discover
    const fetchDiscover = async () => {
      setLoading(true);
      try {
        const response = await getDiscover(discoverType, 1, genre);
        setDiscover(response.data?.results || []);
      } catch (error) {
        console.error("Error fetching discover:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscover();
  }, [discoverType, genre]);

  return (
    <section className="category-section">
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="section-title section-title-text">Discover</h2>
          <div className='btn-link-wrapper'>

            <div className="select-group">
              <Select
                options={[
                  { label: 'Movies', value: MEDIA_TYPE.MOVIE },
                  { label: 'TV Shows', value: MEDIA_TYPE.TV }
                ]}
                value={discoverType}
                onChange={setDiscoverType}
                className="w-32"
              />
              {/* Genre Selector */}
              <div style={{ color: 'black' }}>
                <Genre type={discoverType} genre={genre} setGenre={setGenre} />
              </div>
            </div>
            <Link to="/discover_gallery" className="see-all-link">
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
            {discover.map(movie => (
              <MovieCard key={movie.id} movie={movie} type={discoverType} />
            ))}
            {/* See All Card */}
            <Link to="/discover_gallery" className="see-all-card">
              <span>See All</span>
              <FaChevronRight />
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
