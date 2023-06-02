import { Link } from "react-router-dom";
import { useState } from "react";
import SearchResults from "./SearchResults";
import SearchFilter from "./SearchFilter";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("multi");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setSearchValue(searchTerm);
  };

  return (
    <>
      <header>
        <nav className="flex gap-5 w-full px-5 py-3 text-white bg-blue-800">
          <h1 className="mr-auto sm:text-3xl">
            <Link to="/">MoviesDB</Link>
          </h1>
          <form className="relative">
            <input
              className="h-10 w-40 sm:w-60  indent-3 text-black rounded"
              type="text"
              placeholder="Iron Man"
              value={searchTerm}
              onChange={handleChange}
            />
            <button onClick={handleClick} className="absolute right-3 top-2">
              <i className="fa fa-search text-black"></i>
            </button>
          </form>
          <SearchFilter
            name="searchFilter"
            id="searchFilter"
            values={["multi", "movie", "tv"]}
            filter={filter}
            setFilter={setFilter}
          />
        </nav>
      </header>
      {searchValue.trim() !== "" && (
        <SearchResults searchValue={searchValue} filter={filter} />
      )}
    </>
  );
}
