import React from "react";
import { Link } from "react-router-dom";
export function MoviesCard({ type, id, url, name, releaseDate }) {
  return (
    <Link to={`/details/${type}/${id}`}>
      <div className="flex flex-col flex-shrink-0 w-40 h-auto gap-2 hover:scale-110 hover:duration-300">
        <img className="w-full h-auto rounded-lg" src={url} alt="" />
        <p className="font-semibold text-center">{name} </p>
        <p className="text-center">{releaseDate} </p>
      </div>
    </Link>
  );
}

// * This is slightly different than Moviescards .. It is only used in TrendingGallery and DiscoverGallery
export function FlexMoviesCard({ type, id, url, name, releaseDate }) {
  return (
    <Link to={`/details/${type}/${id}`}>
      <div className="flex flex-col flex-shrink-0 w-full h-auto gap-2 py-4 hover:scale-110 hover:duration-300">
        <img className="w-full h-auto rounded-lg" src={url} alt="" />
        <p className="font-semibold text-center">{name} </p>
        <p className="text-center">{releaseDate} </p>
      </div>
    </Link>
  );
}
// TODO - Loadind Cards components while our cards are still loading from the API
export function LoadingCards() {
  return (
    <div className="flex flex-col items-center flex-shrink-0 w-40 h-auto gap-4 bg-slate-200 hover:scale-110 hover:duration-300">
      <div className="w-full rounded-lg bg-slate-500 h-60"></div>
      <div className="w-4/5 h-3 rounded-lg bg-slate-500 "></div>
      <div className="w-4/5 h-3 rounded-lg bg-slate-500 "></div>
    </div>
  );
}
