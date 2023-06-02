import React from "react";
import { Link } from "react-router-dom";
export function MoviesCard({ type, id, url, name, releaseDate }) {
  return (
    <Link to={`/details/${type}/${id}`}>
      <div className="flex flex-col flex-shrink-0 w-40 h-auto gap-2 hover:scale-110 hover:duration-300">
        <img className="w-full h-auto rounded-lg" src={url} alt="" />
        <p className="text-center font-semibold">{name} </p>
        <p className="text-center">{releaseDate} </p>
      </div>
    </Link>
  );
}
export function FlexMoviesCard({ type, id, url, name, releaseDate }) {
  return (
    <Link to={`/details/${type}/${id}`}>
      <div className="flex flex-col flex-shrink-0 w-full h-auto gap-2 py-4 hover:scale-110 hover:duration-300">
        <img className="w-full h-auto rounded-lg" src={url} alt="" />
        <p className="text-center font-semibold">{name} </p>
        <p className="text-center">{releaseDate} </p>
      </div>
    </Link>
  );
}

export function LoadingCards() {
  return (
    <div className="flex flex-col bg-slate-200 flex-shrink-0 w-40 h-auto gap-4 hover:scale-110 hover:duration-300 items-center">
      <div className="w-full bg-slate-500 h-60 rounded-lg"></div>
      <div className="w-4/5 rounded-lg h-3 bg-slate-500 "></div>
      <div className="w-4/5 rounded-lg h-3 bg-slate-500 "></div>
    </div>
  );
}
