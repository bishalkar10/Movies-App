import { useState, useEffect } from "react";
import { getDetails } from "@/api/tmdb";
import { useParams } from "react-router-dom";
import { getReleaseYear, getRuntime } from "@/components/utils";
export default function Details() {
  const { id, type } = useParams();
  const [movieData, setMovieData] = useState({});
  const fixedPath = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function fetchData() {
      const response = await getDetails(type, id);
      const data = response.data; // data is an object
      setMovieData(data);
    }
    fetchData();
  }, []);

  // Add a conditional check to wait for the data to be fetched
  if (
    !(movieData.title || movieData.original_data || movieData.original_name)
  ) {
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
          backgroundImage: `url(${"https://image.tmdb.org/t/p/original" + movieData.backdrop_path
            }) `,
        }}
      >
        <div className="bg-[rgba(0_0_0/0.5)] flex flex-col justify-center items-center md:grid md:grid-cols-[auto_1fr]">
          <div className="md:h-screen">
            <img
              className="h-full p-10 rounded-[70px] "
              src={fixedPath + movieData.poster_path}
              alt=""
            />
          </div>

          {type === "movie" ? ( // if type is movie then render this
            <div className="p-10 pt-0 text-white md:pt-10">
              <h1 className="mb-1 text-4xl">
                {movieData.title}
                {` (${getReleaseYear(movieData.release_date)})`}
              </h1>
              <p>{`${movieData.status} • ${movieData.release_date} • ${movieData.genres && movieData.genres.map((genre) => genre.name)
                } 
             • ${getRuntime(movieData.runtime)}`}</p>

              <i className="inline-block py-3">{movieData.tagline}</i>
              <p className="my-2 text-2xl">Overview</p>
              <p>{movieData.overview}</p>
            </div>
          ) : (
            // if type is tv then render this
            <div className="p-10 pt-0 text-white md:pt-10">
              <h1 className="mb-1 text-4xl">
                {movieData.title}
                {`(${getReleaseYear(
                  movieData.first_air_date
                )} - ${getReleaseYear(movieData.last_air_date)})`}
              </h1>
              <p>{`${movieData.genres &&
                movieData.genres.map((genre) => genre.name).join(", ")
                } 
             • ${getRuntime(movieData.last_episode_to_air.runtime)}`}</p>
              <i className="inline-block py-3">{movieData.tagline}</i>
              <p className="my-2 text-2xl">Overview</p>
              <p>{movieData.overview}</p>
              <br />
              <p>First Air Date : {movieData.first_air_date}</p>
              <p>Last Air Date : {movieData.last_air_date}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
