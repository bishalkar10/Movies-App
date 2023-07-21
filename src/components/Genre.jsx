import { Genres } from "../asset/GenreData";

// we are recieving three props type , genre, setGenre
export default function Genre(props) {
  // * props.genre is the value of the select element, and props.setGenre is the function that changes the value of the select element
  const { genre, setGenre, type } = props;
  // * if props.type is movie then we use the movieGenres array, else we use the tvGenres array
  const genres = (type === "movie" ? Genres.movieGenres : Genres.tvGenres);

  const handleGenreChange = (event) => {
    const selectedValue = String(event.target.value); // * genre expects a string value so we will convert the integer to string
    setGenre(selectedValue);
    if (props.setMoviesArray && props.setPage) {
      props.setMoviesArray([]);
      props.setPage(1);
    }
  };
  // * Select Genre is a default value for the dropdown, then we spread the genres array and map it to an option element.
  const options = [
    <option key="default" value="">
      Select Genre
    </option>,
    ...genres.map((genre) => (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    )),
  ];

  return (
    <div>
      <select
        className="py-1 text-white bg-gray-800 border-2 border-black rounded cursor-pointer sm:px-4"
        name="genres"
        id="genre"
        value={genre}
        onChange={handleGenreChange}
      >
        {options} {/* render the option array */}
      </select>
    </div>
  );
}
