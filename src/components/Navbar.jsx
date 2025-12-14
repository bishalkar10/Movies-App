import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Theme logic removed - Permanent Dark Mode

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/multi/${searchTerm}`);
    }
  }

  return (
    <nav className="modern-nav">
      <div className="logo">
        <Link to="/" className="logo-link">CineVerse</Link>
      </div>

      <div className="nav-actions">
        <form onSubmit={handleSearch} className="search-container">
          <FaSearch color="#ffffff" className="opacity-50" />
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
}
