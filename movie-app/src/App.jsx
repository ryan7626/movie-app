import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieSection from './components/MovieSection'
import AllMovies from './components/AllMovies'

import { fetchTrendingMovies, fetchMoviesByGenre, searchMovies, fetchGenres } from './services/tmdb'

const App = () => {
  const [view, setView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState({
    trending: [],
    sciFi: [],
    action: [],
    horror: [],
    comedy: [],
    all: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [genresList, trending, sciFi, action, horror, comedy] = await Promise.all([
          fetchGenres(),
          fetchTrendingMovies(),
          fetchMoviesByGenre(878), // Sci-Fi
          fetchMoviesByGenre(28),  // Action
          fetchMoviesByGenre(27),  // Horror
          fetchMoviesByGenre(35)   // Comedy
        ]);

        const genreMap = genresList.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const mapMovieData = (movies) => movies.map(m => {
          const names = m.genre_ids.map(id => genreMap[id]).filter(Boolean);
          return {
            ...m,
            genres: names,
            genre: names[0] || 'Other' // Keep first for display/legacy
          };
        });

        // Deduplicate movies for the "All" view
        const getUniqueMovies = (movieArrays) => {
          const combined = movieArrays.flat();
          const seen = new Set();
          return combined.filter(movie => {
            if (seen.has(movie.id)) return false;
            seen.add(movie.id);
            return true;
          });
        };

        setMovies({
          trending: mapMovieData(trending),
          sciFi: mapMovieData(sciFi),
          action: mapMovieData(action),
          horror: mapMovieData(horror),
          comedy: mapMovieData(comedy),
          all: mapMovieData(getUniqueMovies([trending, sciFi, action, horror, comedy]))
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const showHome = () => {
    setView('home');
    setSearchQuery('');
  };

  const showBrowse = () => {
    setView('browse');
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setView('browse');
  };

  if (loading) {
    return (
      <div className="bg-[#030014] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium animate-pulse">Loading Cinematic Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#030014] min-h-screen text-white px-5 sm:px-10 md:px-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <Navbar
          onHome={showHome}
          onBrowse={showBrowse}
          onSearch={handleSearch}
          currentView={view}
        />

        {view === 'home' ? (
          <div className="animate-fadeIn">
            <Hero movies={movies.trending} />

            <div className="flex flex-col gap-12 mt-10">
              <MovieSection title="Sci-Fi Blockbusters" movies={movies.sciFi} onViewAll={showBrowse} />
              <MovieSection title="Adrenaline Rush Action" movies={movies.action} onViewAll={showBrowse} />
              <MovieSection title="Chills & Thrills" movies={movies.horror} onViewAll={showBrowse} />
              <MovieSection title="Laugh Out Loud" movies={movies.comedy} onViewAll={showBrowse} />
            </div>
          </div>
        ) : (
          <AllMovies allMovies={movies.all} searchQuery={searchQuery} />
        )}
      </div>

      <footer className="py-20 text-center text-gray-500 text-sm border-t border-white/5 mt-20">
        <p className="mb-2 font-bold text-gray-400">CineMatch Premium</p>
        <p>&copy; 2024 CineMatch. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default App