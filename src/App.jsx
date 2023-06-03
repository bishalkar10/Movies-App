import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import TrendingGallery from "./pages/TrendingGallery";
import DiscoverGallery from "./pages/DiscoverGallery";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";
import SearchResults from "./components/SearchResults";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/trending_gallery" element={<TrendingGallery />} />
        <Route path="/discover_gallery" element={<DiscoverGallery />} />
        <Route path="/details/:type/:id" element={<Details />} />
        <Route
          path="/search/:filter/:searchValue"
          element={<SearchResults />}
        />
      </Routes>
    </Router>
  );
}
