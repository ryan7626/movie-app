import React from 'react'
import MovieCard from './MovieCard'

const MovieSection = ({ title, movies, onViewAll }) => {
    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
                <button
                    onClick={onViewAll}
                    className="text-red-500 hover:text-red-400 text-sm font-bold flex items-center gap-1 group transition-colors"
                >
                    View All
                    <svg className="transform transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    )
}

export default MovieSection
