import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex w-full px-5 py-3 text-white bg-blue-800">
      <h1 className="mr-auto text-3xl">
        <Link to="/">MoviesDB </Link>
      </h1>

      {/* <i className="fa fa-search"></i> */}
    </nav>
  );
}
