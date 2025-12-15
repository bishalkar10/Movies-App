import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

// Standard Imports (No Lazy Loading to prevent Suspense errors)
import Homepage, { HomepageSkeleton } from "./pages/Homepage";

// Lazy Load other pages
const TrendingGallery = React.lazy(() => import("./pages/TrendingGallery"));
const DiscoverGallery = React.lazy(() => import("./pages/DiscoverGallery"));
const Details = React.lazy(() => import("./pages/Details"));
const SearchResults = React.lazy(() => import("./components/SearchResults"));

export default function App() {
  return (
    <>
      <Suspense fallback={<HomepageSkeleton />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/trending_gallery" element={<TrendingGallery />} />
          <Route path="/discover_gallery" element={<DiscoverGallery />} />
          <Route path="/details/:type/:id" element={<Details />} />
          <Route path="/search/:filter/:searchTerm" element={<SearchResults />} />
        </Routes>
      </Suspense>
    </>
  );
}
