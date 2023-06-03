import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState(""); // * if we use searchTerm in the useEffect dependency array , with each change it will make an API call
  const [searchValue, setSearchValue] = useState(""); // * it is in the dependency array of the useEfffecy hook inside the SearchResults component
  const [filter, setFilter] = useState("multi"); // filter for search
  const navigate = useNavigate();

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    setSearchValue(searchTerm);
  }
  // navigation depends on seachValue so its added as a dependency
  useEffect(() => {
    if (searchValue) {
      navigate(`/search/${filter}/${searchValue}`);
    }
  }, [navigate, searchValue, filter]);
  return (
    <>
      <header>
        <nav className="flex w-full gap-5 px-5 py-3 text-white bg-blue-800">
          <h1 className="mr-auto sm:text-3xl">
            <Link to="/">MoviesDB</Link>
          </h1>
          {/*  form element */}
          <form className="relative">
            <input
              className="w-40 h-10 text-black rounded sm:w-60 indent-3"
              type="text"
              placeholder="Iron Man"
              value={searchTerm}
              onChange={handleChange}
            />
            <button onClick={handleClick} className="absolute right-3 top-2">
              <i className="text-black fa fa-search"></i>
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
    </>
  );
}
