import Navbar from "./Navbar";
import { LoadingCards } from "./MoviesCard";

export default function PageSkeleton() {
    return (
        <div className="modern-app">
            <Navbar />

            <div className="skeleton-hero" style={{ height: '50vh', marginBottom: '2rem' }}></div>

            <div className="gallery-container">
                <div className="skeleton-title" style={{ width: '300px', height: '2.5rem', marginBottom: '2rem' }}></div>

                <div className="movies-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <LoadingCards key={`skeleton-${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
