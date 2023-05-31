import { useState, useEffect } from "react";
import axios from "axios";

export default function Details({ id }) {
  const [movieData, setMovieData] = useState({});
  const fixedPath = "https://image.tmdb.org/t/p/w500";
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  function getReleaseYear(release_date) {
    const date = new Date(release_date);
    return date.getFullYear();
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.request(options);
      const data = response.data;
      setMovieData({
        title: data.title || data.original_data || data.oririginal_name,
        overview: data.overview,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        status: data.status,
        release_date: data.release_date,
        genres: data.genres,
        release_year: getReleaseYear(data.release_date),
        tagline: data.tagline ? data.tagline : "",
        runtime: data.runtime,
      });
    }
    fetchData();
  }, []);

  // Add a conditional check to wait for the data to be fetched
  if (!movieData.title) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex space-x-4">
          <div className="w-8 h-8 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="bg-fixed bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${
            "https://image.tmdb.org/t/p/original" + movieData.backdrop_path
          }) `,
        }}
      >
        <div className="bg-[rgba(0_0_0/0.5)] flex flex-col justify-center items-center md:grid md:grid-cols-[auto_1fr]">
          <div className="md:h-screen">
            <img
              className="h-full p-10 rounded-[100px] "
              src={fixedPath + movieData.poster_path}
              alt=""
            />
          </div>
          <div className="p-10 pt-0 text-white md:pt-10">
            <h1 className="mb-1 text-4xl">
              {movieData.title}
              {`(${movieData.release_year})`}
            </h1>
            <p>{`${movieData.status} • ${movieData.release_date} • ${
              movieData.genres && movieData.genres.map((genre) => genre.name)
            }`}</p>

            <i className="inline-block py-3">{movieData.tagline}</i>
            <p className="my-2 text-2xl">Overview</p>
            <p>{movieData.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}
