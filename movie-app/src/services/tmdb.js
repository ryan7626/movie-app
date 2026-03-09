import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
    baseURL: BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
});

export const getImageUrl = (path, size = 'original') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchTrendingMovies = async () => {
    const response = await tmdb.get('/trending/movie/day');
    return response.data.results;
};

export const fetchPopularMovies = async () => {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
};

export const fetchMoviesByGenre = async (genreId) => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_genres: genreId,
        },
    });
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await tmdb.get('/search/movie', {
        params: {
            query,
        },
    });
    return response.data.results;
};

export const fetchGenres = async () => {
    const response = await tmdb.get('/genre/movie/list');
    return response.data.genres;
};

export default tmdb;
