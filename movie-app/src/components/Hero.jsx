import React, { useState, useEffect } from 'react'
import { getImageUrl } from '../services/tmdb'

const Hero = ({ movies = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            handleNext();
        }, 7000);
        return () => clearInterval(interval);
    }, [currentIndex, movies.length]);

    if (!movies || movies.length === 0) return null;

    const currentMovie = movies[currentIndex];
    const year = currentMovie.release_date ? currentMovie.release_date.split('-')[0] : '2024';
    const backgroundImage = getImageUrl(currentMovie.backdrop_path, 'original');

    const handleNext = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
            setIsFading(false);
        }, 300);
    };

    const handlePrev = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
            setIsFading(false);
        }, 300);
    };

    const goToSlide = (index) => {
        if (index === currentIndex) return;
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsFading(false);
        }, 300);
    };

    return (
        <section className="relative py-20 flex flex-col items-start min-h-[700px] justify-center overflow-visible group/hero">
            {/* Background Image with Gradient Overlay */}
            <div className={`absolute inset-0 -mx-5 sm:-mx-10 md:-mx-20 pointer-events-none transition-all duration-1000 ${isFading ? 'opacity-0 scale-105' : 'opacity-40 scale-100'}`}>
                {backgroundImage && (
                    <img
                        src={backgroundImage}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-[#030014]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
            </div>

            {/* Edge Navigation Arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white transition-all opacity-0 group-hero-hover/hero:opacity-100 hidden md:block"
                aria-label="Previous slide"
            >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white transition-all opacity-0 group-hero-hover/hero:opacity-100 hidden md:block"
                aria-label="Next slide"
            >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            <div className={`relative z-10 max-w-2xl transition-all duration-300 transform ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    Trending Now
                </div>

                <h1 className="text-white text-6xl font-bold mb-4 !text-left !mx-0 leading-tight min-h-[140px] drop-shadow-2xl">
                    {currentMovie.title}
                </h1>

                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-white">{year}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-yellow-500 font-bold">
                        ★ {currentMovie.vote_average?.toFixed(1)}
                    </span>
                    <span>•</span>
                    <span className="text-gray-300">TMDB Popular</span>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8 h-24 overflow-hidden line-clamp-3">
                    {currentMovie.overview || "A captivating story that will keep you on the edge of your seat. Experience the thrill, the emotion, and the spectacle of this trending masterpiece."}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-600/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Watch Now
                    </button>

                    <div className="flex items-center gap-2">
                        {movies.slice(0, 10).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-red-600 w-6' : 'bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
