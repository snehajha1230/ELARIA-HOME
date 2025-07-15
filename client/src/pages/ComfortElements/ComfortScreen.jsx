import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaFilm, FaSearch, FaMoon, FaSun, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

const ComfortScreen = () => {
  const [mediaList, setMediaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const fetchMedia = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/media', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMediaList(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load media');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Media removed from your collection');
      setMediaList(mediaList.filter((media) => media._id !== id));
    } catch {
      toast.error('Could not delete media');
    }
  };

  const handleWatch = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('No link provided');
    }
  };

  const filteredMedia = mediaList.filter(media => 
    media.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (media.description && media.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchMedia();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
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
    <div className={`min-h-screen bg-fixed bg-center py-8 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-[#f5f1e6]'}`}>
      {/* Wooden Shelf Background */}
      <div className={`fixed inset-0 bg-[url('/wooden-shelf-texture.png')] bg-repeat opacity-10 dark:opacity-5 pointer-events-none z-0`}></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-2xl backdrop-blur-md bg-white/90 dark:bg-gray-800/90 shadow-lg border border-amber-100 dark:border-gray-700">
          <div className="flex items-center mb-4 md:mb-0">
            <FaFilm className="text-3xl mr-3 text-amber-600 dark:text-amber-400" />
            <h1 className="text-4xl font-serif font-bold text-amber-800 dark:text-amber-200">Comfort Screen</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search your media..."
                className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-700 border border-amber-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-amber-100 dark:bg-gray-700 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </header>

        {/* Main Shelf Area */}
        <main className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-amber-100 dark:border-gray-700">
          {/* Add Media Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => navigate('/add-media')}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaPlus />
              <span>Add to My Collection</span>
            </button>
          </div>

          {/* Media Grid */}
          {mediaList.length === 0 ? (
            <div className="text-center py-16">
              <img src="/empty-screen.svg" alt="No media" className="mx-auto w-56 opacity-80" />
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">Your comfort screen is empty... 🎬</p>
              <p className="text-sm text-gray-400">Add your favorite movies, shows or videos to relax with.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMedia.map((media) => (
                <div
                  key={media._id}
                  className="relative group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-500"
                >
                  {/* Media Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={media.thumbnailUrl || '/default-media-cover.jpg'}
                      alt={media.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-media-cover.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => handleWatch(media.mediaUrl)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-500/90 hover:bg-amber-600 text-white p-4 rounded-full shadow-xl"
                      >
                        <FaPlay size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Media Details */}
                  <div className="p-5 bg-white dark:bg-gray-700">
                    <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">
                      {media.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3 line-clamp-1">
                      {media.type}
                    </p>
                    {media.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {media.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 text-xs rounded-full">
                        {media.genre || 'General'}
                      </span>
                      {media.duration && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {media.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(media._id);
                    }}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Your personal comfort collection • {mediaList.length} items to relax with</p>
          <p className="mt-1">"Movies can and do have tremendous influence in shaping young lives." — Walt Disney</p>
        </footer>
      </div>
    </div>
  );
};

export default ComfortScreen;