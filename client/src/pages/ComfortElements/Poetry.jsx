import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/api';
import { toast } from 'react-toastify';
import { X, Plus, BookOpen, Search, Home } from 'lucide-react';

const Poetry = () => {
  const [poems, setPoems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchPoems = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('/poems', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPoems(res.data);
    } catch (err) {
      toast.error('Failed to load poems');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`/poems/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Poem removed from your collection');
      setPoems(poems.filter((p) => p._id !== id));
    } catch {
      toast.error('Failed to delete poem');
    }
  };

  const filteredPoems = poems.filter(poem => 
    poem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (poem.author && poem.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (poem.excerpt && poem.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchPoems();
  }, []);

  const handleAddClick = () => navigate('/add-poem');

  return (
    <div className={`min-h-screen bg-fixed bg-center py-8 px-4 bg-[#f9f5f0] dark:bg-gray-900`}>
      {/* Paper Texture Background */}
      <div className={`fixed inset-0 bg-[url('/paper-texture.png')] bg-repeat opacity-15 dark:opacity-10 pointer-events-none z-0`}></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-2xl backdrop-blur-md bg-white/90 dark:bg-gray-800/90 shadow-lg border border-rose-100 dark:border-gray-700">
          <div className="flex items-center mb-4 md:mb-0">
            <BookOpen className="text-3xl mr-3 text-rose-600 dark:text-rose-400" />
            <h1 className="text-4xl font-serif font-bold text-rose-800 dark:text-rose-200">Soulful Poetry</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search poems..."
                className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-700 border border-rose-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => navigate('/comfort-space')}
              className="p-2 rounded-full bg-rose-100 dark:bg-gray-700 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-gray-600 transition"
            >
              <Home size={20} />
            </button>
          </div>
        </header>

        {/* Main Poetry Area */}
        <main className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-rose-100 dark:border-gray-700">
          {/* Add Poem Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={handleAddClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={20} />
              <span>Compose New Poem</span>
            </button>
          </div>

          {/* Poems Grid */}
          {poems.length === 0 ? (
            <div className="text-center py-16">
              <img src="/empty-notebook.svg" alt="No poems" className="mx-auto w-56 opacity-80" />
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">Your poetry journal awaits... ✍️</p>
              <p className="text-sm text-gray-400">Begin by adding your first heartfelt verse.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoems.map((poem) => (
                <div
                  key={poem._id}
                  className="relative group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100 dark:border-gray-600 hover:border-rose-300 dark:hover:border-rose-500"
                >
                  {/* Poem Content */}
                  <div className="p-6">
                    <button
                      onClick={() => handleDelete(poem._id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X size={20} />
                    </button>

                    <div className="mb-6">
                      <h2 className="text-xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {poem.title}
                      </h2>
                      {poem.author && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">
                          by {poem.author}
                        </p>
                      )}
                      {poem.excerpt && (
                        <div className="relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-rose-200 dark:bg-rose-800 rounded-full"></div>
                          <p className="pl-4 text-gray-700 dark:text-gray-300 font-light leading-relaxed line-clamp-5">
                            {poem.excerpt}
                          </p>
                        </div>
                      )}
                    </div>

                    {poem.linkUrl && (
                      <a
                        href={poem.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 px-4 py-2 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-800 transition"
                      >
                        Read Full Poem
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Your personal poetry sanctuary • {poems.length} poems in your collection</p>
          <p className="mt-1">"Poetry is when an emotion has found its thought and the thought has found words." — Robert Frost</p>
        </footer>
      </div>
    </div>
  );
};

export default Poetry;