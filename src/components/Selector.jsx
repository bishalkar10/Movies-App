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
      // * Trending and Discover comononent doesn't have setPage prop
      onChange={(e) => {
        setState(e.target.value);
        {
          setPage && setPage(1);
        } //  * make movies array empty when user changes the type so that new items will be replaced with the existing one else new items will be appended
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
