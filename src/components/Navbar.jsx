import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";
export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState(""); // * if we use searchTerm in the useEffect dependency array , with each change it will make an API call
  const [filter, setFilter] = useState("multi"); // filter for search
  const navigate = useNavigate();

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    searchTerm;
    ("Clicked");
    if (searchTerm.trim()) {
      navigate(`/search/${filter}/${searchTerm}`);
    }
  }

  return (
    <>
      <header className="sticky top-0 left-0">
        <nav className="flex items-center w-full gap-5 px-5 md:py-5 py-3 z-40 text-white bg-[#7c162e]">
          <h1 className="mr-auto text-xl sm:text-3xl">
            <Link to="/">Movies Gallery</Link>
          </h1>
          {/*  form element */}
          <form className="relative">
            <input
              className="w-40 h-10 text-black rounded outline-none sm:w-60 indent-3"
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
      {/* SearchContext.Provider is used to pass the setSearchValue function to the SearchResults component which is a child of Navbar component */}
    </>
  );
}
