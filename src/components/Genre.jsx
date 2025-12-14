import { Genres } from "../asset/GenreData";
import Select from "./Select";

export default function Genre(props) {
  const { genre, setGenre, type } = props;
  const genres = (type === "movie" ? Genres.movieGenres : Genres.tvGenres);

  const handleGenreChange = (value) => {
    setGenre(String(value));
  };

  // Convert genres to options format for the Select component
  // Add "All Genres" as the first option
  const options = [
    { value: "", label: "All Genres" },
    ...genres.map((g) => ({ value: String(g.id), label: g.name })),
  ];

  return (
    <div className="w-48">
      {/* Explicit width for the container */}
      <Select
        options={options}
        value={genre}
        onChange={handleGenreChange}
        placeholder="Filter by Genre"
      />
    </div>
  );
}
