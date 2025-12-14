import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TMDB_API, IMAGE_SIZE } from '../constants';
import { FaFilm } from 'react-icons/fa';


// Custom hook for 3D tilt effect
const useCardTilt = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const MAX_ROTATION = 15; // Maximum degrees to rotate

    // Calculate rotation values
    const rotateY = ((mouseX / width) - 0.5) * MAX_ROTATION * 2;
    const rotateX = -((mouseY / height) - 0.5) * MAX_ROTATION * 2;

    // Apply transform
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Reset to flat state
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleTouchMove = (e) => {
    // e.preventDefault(); // Skipping preventDefault to avoid scroll blocking issues in list view
    const touch = e.touches[0];
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    // Relative to viewport, but we need relative to element for tilt calculation consistency?
    // Actually the snippet uses clientX/Y - rect.left/top which is correct for position within element.
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    // Check if touch is within bounds
    if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
      const MAX_ROTATION = 5;
      const rotateY = ((mouseX / rect.width) - 0.5) * MAX_ROTATION * 2;
      const rotateX = -((mouseY / rect.height) - 0.5) * MAX_ROTATION * 2;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleTouchEnd = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return { cardRef, handleMouseMove, handleMouseLeave, handleTouchMove, handleTouchEnd };
};

export default function MovieCard({ movie, type = 'movie', className = '' }) {
  const { cardRef, handleMouseMove, handleMouseLeave, handleTouchMove, handleTouchEnd } = useCardTilt();

  const [imgError, setImgError] = useState(false);

  const getImageUrl = (path) => {
    if (!path) return null;
    return `${TMDB_API.IMAGE_BASE_URL}${IMAGE_SIZE.POSTER}${path}`;
  };

  const imageUrl = getImageUrl(movie.poster_path);
  const title = movie.title || movie.name || "Untitled";

  // Array of funny messages
  const errorMessages = [
    "Director cut this poster!",
    "Lost in the void",
    "Camera shy",
    "404: Poster Not Found"
  ];

  // Pick a random message based on movie id (stable per movie)
  const randomMsg = errorMessages[(movie.id || 0) % errorMessages.length];

  return (
    <Link
      to={`/details/${type}/${movie.id}`}
      className={`movie-card-link ${className}`}
      aria-label={`View details for ${title}`}
    >
      <div
        className="movie-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transition: 'transform 0.1s ease-out' }} // Smooth out the movement slightly
      >
        {imgError || !imageUrl ? (
          <div className="broken-card" role="img" aria-label="Poster missing">
            <FaFilm className="broken-icon" />
            <p className="broken-text">{randomMsg}</p>
          </div>
        ) : (
          <img
            className="movie-img"
            src={imageUrl}
            alt={`Poster for ${title}`}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </div>
      <div className="movie-info">
        <span className="movie-title">{title}</span>
      </div>
    </Link>
  );
}

// * This is slightly different than Moviescards. here width is not fixed it takes full width of the grid.. It is only used in TrendingGallery and DiscoverGallery
export function FlexMoviesCard({ type, id, url, name, releaseDate }) {
  return (
    <Link to={`/details/${type}/${id}`}>
      <div className="flex flex-col flex-shrink-0 w-full h-auto gap-2 py-4 hover:scale-110 hover:duration-300">
        <img className="w-full h-auto rounded-lg" src={url} alt={name} />
        <p className="font-semibold text-center">{name} </p>
        <p className="text-center">{releaseDate} </p>
      </div>
    </Link>
  );
}
// TODO - Loadind Cards components while our cards are still loading from the API
export function LoadingCards() {
  return (
    <div className="loading-card-container movie-card-link">
      <div className="loading-card-poster skeleton-shimmer"></div>

      <div className="loading-card-text-container">
        <div className="loading-card-text-line skeleton-shimmer"></div>
      </div>
    </div>
  );
}
