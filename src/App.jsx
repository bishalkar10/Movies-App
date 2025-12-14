import { Routes, Route } from "react-router-dom";

// Standard Imports (No Lazy Loading to prevent Suspense errors)
import Homepage from "./pages/Homepage";
import TrendingGallery from "./pages/TrendingGallery";
import DiscoverGallery from "./pages/DiscoverGallery";
import Details from "./pages/Details";
import SearchResults from "./components/SearchResults";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/trending_gallery" element={<TrendingGallery />} />
        <Route path="/discover_gallery" element={<DiscoverGallery />} />
        <Route path="/details/:type/:id" element={<Details />} />
        <Route path="/search/:filter/:searchTerm" element={<SearchResults />} />
      </Routes>

    </>
  );
}
