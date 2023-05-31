export default function Selector({
  setMoviesArray,
  setPage,
  state,
  setState,
  values,
  name,
  id,
}) {
  return (
    <select
      name={name}
      id={id}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
        {
          setPage && setPage(1);
        }
        setMoviesArray([]);
      }}
      className="py-1 text-white bg-gray-800 border-2 border-black rounded cursor-pointer sm:px-4"
    >
      {values.map((value) => (
        <option className="h-20" key={value} value={value}>
          {value === "day" && "Today"}
          {value === "movie" && "Movie"}
          {value === "tv" && "TV"}
          {value === "week" && "This Week"}
        </option>
      ))}
    </select>
  );
}
