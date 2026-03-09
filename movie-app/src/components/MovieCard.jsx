import { getImageUrl } from '../services/tmdb'

const MovieCard = ({ movie }) => {
    if (!movie) return null;

    const { title, poster_path, release_date, vote_average } = movie;
    const year = release_date ? release_date.split('-')[0] : 'N/A';
    const rating = vote_average ? vote_average.toFixed(1) : '0.0';
    const imageUrl = getImageUrl(poster_path, 'w500');

    return (
        <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-800 shadow-md transition-shadow hover:shadow-red-600/10">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 italic">
                        No Poster
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-500 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    ★ {rating}
                </div>
            </div>
            <div>
                <h3 className="text-white font-bold text-sm truncate group-hover:text-red-500 transition-colors leading-snug">{title}</h3>
                <p className="text-gray-500 text-[11px] mt-0.5">{year}</p>
            </div>
        </div>
    )
}

export default MovieCard
