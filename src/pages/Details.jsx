import { useState, useEffect } from "react";
import { getDetails } from "@/api/tmdb";
import { useParams, Link } from "react-router-dom";
import { FaPlay, FaPlus, FaStar, FaArrowLeft, FaCalendar, FaClock } from "react-icons/fa";
import { getReleaseYear, getRuntime } from "@/components/utils";
import Navbar from "@/components/Navbar";
import { TMDB_API, IMAGE_SIZE } from "@/constants";
import PageSkeleton from "@/components/PageSkeleton";

export default function Details() {
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getDetails(type, id);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, type]);

  if (loading) return <PageSkeleton />;
  if (!movie) return <div className="modern-app"><Navbar /><div className="flex h-screen items-center justify-center">Movie not found</div></div>;

  const getImageUrl = (path, size = IMAGE_SIZE.BACKDROP) => path ? `${TMDB_API.IMAGE_BASE_URL}${size}${path}` : '';

  const releaseDate = movie.release_date || movie.first_air_date;
  const releaseYear = releaseDate ? getReleaseYear(releaseDate) : 'N/A';

  const runtimeValue = type === 'movie'
    ? movie.runtime
    : (movie.episode_run_time?.length > 0 ? movie.episode_run_time[0] : null);
  const runtime = runtimeValue ? getRuntime(runtimeValue) : 'N/A';

  return (
    <div className="modern-app">
      <Navbar />

      <div className="details-hero" style={{ '--hero-bg': `url(${getImageUrl(movie.backdrop_path)})` }}>
        <div className="details-overlay"></div>

        <div className="details-content-wrapper">
          <Link to="/" className="details-back-link">
            <FaArrowLeft />
          </Link>

          <div className="details-info">
            <div className="details-meta">
              <span className="media-type-badge">
                {type === 'movie' ? 'MOVIE' : 'TV SERIES'}
              </span>
              <span className="meta-item rating">
                <FaStar /> {movie.vote_average?.toFixed(1)}
              </span>
              <span className="meta-item secondary">
                <FaCalendar /> {releaseYear}
              </span>
              <span className="meta-item secondary">
                <FaClock /> {runtime}
              </span>
            </div>

            <h1 className="details-title">
              {movie.title || movie.name}
            </h1>

            <div className="genres-list">
              {movie.genres?.map(g => (
                <span key={g.id} className="genre-badge">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="details-overview">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
