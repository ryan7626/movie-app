import React, { useState } from 'react'
import MovieCard from './MovieCard'

const AllMovies = ({ allMovies = [], searchQuery = '' }) => {
    const [selectedGenre, setSelectedGenre] = useState('All');

    // Extract unique genres from all movies
    const genres = ['All', ...new Set(allMovies.flatMap(movie => movie.genres || []))];

    // Filtering Logic
    let filteredMovies = allMovies;

    // 1. Apply Genre filter if selected
    if (selectedGenre !== 'All') {
        filteredMovies = filteredMovies.filter(movie => movie.genres?.includes(selectedGenre));
    }

    // 2. Apply Search filter if searchQuery exists
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(q) ||
            movie.genres?.some(g => g.toLowerCase().includes(q))
        );

        // Sort: Title matches first, then Genre matches
        filteredMovies.sort((a, b) => {
            const aTitleMatch = a.title.toLowerCase().includes(q);
            const bTitleMatch = b.title.toLowerCase().includes(q);

            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            return 0;
        });
    }

    return (
        <section className="py-12 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        {searchQuery ? `Results for "${searchQuery}"` : 'Browse All Movies'}
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {searchQuery
                            ? `Found ${filteredMovies.length} movies matching your search.`
                            : 'Explore our entire collection of cinematic masterpieces.'}
                    </p>

                    {!searchQuery && (
                        <div className="mt-8 flex flex-col gap-2">
                            <label htmlFor="genre-filter" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Filter by Genre
                            </label>
                            <select
                                id="genre-filter"
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="bg-[#1a1a2e] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none min-w-[200px] cursor-pointer"
                            >
                                {genres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                {!searchQuery && (
                    <div className="text-gray-500 text-sm font-medium">
                        Showing <span className="text-white">{filteredMovies.length}</span> movies
                    </div>
                )}
            </div>

            {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
                    {filteredMovies.map((movie, index) => (
                        <div key={movie.id || index} className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: `${index * 30} ms` }}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <p className="text-gray-400 text-lg italic">No movies found in this genre.</p>
                </div>
            )}
        </section>
    )
}

export default AllMovies
