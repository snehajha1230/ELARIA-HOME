import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaMusic, FaSearch, FaHome, FaPlay, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

const SoundCorner = () => {
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const navigate = useNavigate();

  const fetchTracks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/tracks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTracks(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load tracks');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Track removed from your collection');
      setTracks(tracks.filter((track) => track._id !== id));
    } catch {
      toast.error('Could not delete track');
    }
  };

  const handleEdit = (track) => {
    navigate('/add-track', { state: { trackToEdit: track } });
  };

  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (track.artist && track.artist.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchTracks();
    // Initialize dark mode from localStorage or system preference
    if (localStorage.getItem('darkMode') === null) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.setItem('darkMode', prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors duration-300`}>
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-gray-800/90 shadow-lg border border-purple-300/20">
          <div className="flex items-center mb-4 md:mb-0">
            <FaMusic className="text-3xl mr-3 text-purple-400" />
            <h1 className="text-4xl font-serif font-bold text-purple-100">Your Music Room</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-purple-300" />
              <input
                type="text"
                placeholder="Search your tracks..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/10 dark:bg-gray-700 border border-purple-300/30 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 text-purple-100 placeholder-purple-300/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => navigate('/comfort-space')}
              className="p-2 rounded-full bg-purple-600/30 dark:bg-gray-700 text-purple-200 dark:text-purple-300 hover:bg-purple-700/40 dark:hover:bg-gray-600 transition"
              title="Go to Comfort Space"
              aria-label="Go to Comfort Space"
            >
              <FaHome />
            </button>
          </div>
        </header>

        {/* Main Shelf Area */}
        <main className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-300/20">
          {/* Add Track Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => navigate('/add-track')}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaPlus />
              <span>Add My Favourites</span>
            </button>
          </div>

          {/* Tracks Grid */}
          {tracks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-56 opacity-80 flex justify-center text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-56 w-56" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <p className="mt-6 text-xl text-purple-200">Your music room is silent... 🎵</p>
              <p className="text-sm text-purple-300/80">Add your favorite tracks to fill it with melody.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTracks.map((track) => (
                <div
                  key={track._id}
                  className="relative group bg-white/10 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-purple-300/20 dark:border-gray-600 hover:border-purple-400/50 dark:hover:border-purple-500"
                >
                  {/* Track Cover */}
                  <div className="relative h-64 overflow-hidden">
                    {track.coverUrl ? (
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-music-cover.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-900/20 dark:bg-purple-900/50 flex items-center justify-center text-purple-300 dark:text-purple-400">
                        <FaMusic className="text-4xl" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <a
                        href={track.trackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-600/90 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl"
                      >
                        <FaPlay size={20} />
                      </a>
                    </div>
                  </div>

                  {/* Track Details */}
                  <div className="p-5 bg-white/5 dark:bg-gray-700">
                    <h3 className="text-lg font-serif font-bold text-purple-100 dark:text-gray-100 mb-1 line-clamp-1">
                      {track.title}
                    </h3>
                    {track.artist && (
                      <p className="text-sm text-purple-200 dark:text-gray-300 italic mb-3 line-clamp-1">
                        by {track.artist}
                      </p>
                    )}
                    {track.album && (
                      <p className="text-xs text-purple-300/80 dark:text-gray-400 mb-3 line-clamp-1">
                        {track.album}
                      </p>
                    )}
                    {/* <div className="flex justify-between items-center">
                      <span className="inline-block bg-purple-900/30 dark:bg-purple-900 text-purple-200 dark:text-purple-200 px-3 py-1 text-xs rounded-full">
                        {track.genre || 'Various'}
                      </span>
                      {track.duration && (
                        <span className="text-xs text-purple-300/80 dark:text-gray-400">
                          {track.duration}
                        </span>
                      )}
                    </div> */}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(track);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(track._id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-purple-300/80 dark:text-gray-400">
          <p>Your personal music room • {tracks.length} tracks in your collection</p>
          <p className="mt-1">"Where words fail, music speaks." — Hans Christian Andersen</p>
        </footer>
      </div>
    </div>
  );
};

export default SoundCorner;