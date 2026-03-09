import React, { useState } from 'react'

const Navbar = ({ onHome, onBrowse, onSearch, currentView }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [tempQuery, setTempQuery] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && tempQuery.trim()) {
            onSearch(tempQuery.trim());
            setIsSearchOpen(false);
            setTempQuery('');
        }
    };

    return (
        <nav className="flex items-center justify-between py-6 relative z-50">
            <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={onHome}
            >
                <div className="bg-white p-1 rounded group-hover:bg-gray-200 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#030014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                </div>
                <span className="text-white font-bold text-xl tracking-tight leading-none">CineMatch</span>
            </div>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={onHome}
                        className={`${currentView === 'home' ? 'text-red-500' : 'text-gray-400'} font-medium transition-colors hover:text-white`}
                    >
                        Home
                    </button>
                    <button
                        onClick={onBrowse}
                        className={`${currentView === 'browse' ? 'text-red-500' : 'text-gray-400'} font-medium transition-colors hover:text-white`}
                    >
                        Browse
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="text-gray-400 hover:text-white flex items-center gap-2 transition-all px-3 py-1.5 rounded-full hover:bg-white/5"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span className="text-sm font-medium">Search</span>
                    </button>

                    {isSearchOpen && (
                        <div className="absolute right-0 mt-2 p-2 bg-[#1a1a2e] border border-white/10 rounded-lg shadow-2xl animate-fadeIn">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search movies or genres..."
                                value={tempQuery}
                                onChange={(e) => setTempQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent text-white text-sm outline-none w-64 px-2 py-1"
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
