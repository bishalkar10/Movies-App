export default function SearchFilter({ filter, setFilter, values, name, id }) {
  return (
    <select
      name={name}
      id={id}
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      className="py-1 text-white bg-gray-800 border-2 border-black rounded cursor-pointer sm:px-4"
    >
      {values.map((value) => (
        <option className="h-20" key={value} value={value}>
          {value === "multi" && "All"}
          {value === "movie" && "Movie"}
          {value === "tv" && "TV"}
        </option>
      ))}
    </select>
  );
}
