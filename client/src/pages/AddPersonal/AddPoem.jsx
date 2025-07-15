import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

const AddPoem = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    excerpt: '',
    coverUrl: '',
    linkUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please sign in to share your poetry');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('/poems', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Your poem has been added to the collection!');
      navigate('/poetry');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong while saving your poem');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900/30">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Panel - Poetic Inspiration */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-purple-800 to-indigo-900 dark:from-purple-900/90 dark:to-indigo-900/80 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=1950&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}></div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-3xl font-serif font-bold text-purple-100">
                    Whispered Verses
                  </h2>
                </div>
                <div className="w-16 h-1 bg-purple-400 mb-4"></div>
                <p className="text-purple-200 italic font-serif text-lg leading-relaxed">
                  "Poetry is when an emotion has found its thought and the thought has found words."<br />
                  <span className="text-purple-300">— Robert Frost</span>
                </p>
              </div>
              
              <div className="relative mt-8">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-purple-600/20 rounded-full"></div>
                <div className="relative bg-white/10 dark:bg-black/20 p-6 rounded-lg backdrop-blur-sm border border-purple-300/20">
                  <h3 className="font-serif font-bold text-purple-100 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Poetry Tip
                  </h3>
                  <p className="text-sm text-purple-200">
                    The best poems often come from personal moments. Don't hesitate to share what moves you.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 mt-auto pt-4 border-t border-purple-700/50">
              <p className="text-xs text-purple-300/80">
                <span className="font-semibold">Note:</span> Your contributions help build a sanctuary of shared emotions.
              </p>
            </div>
          </div>

          {/* Right Panel - Add Poem Form */}
          <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 p-8 flex flex-col">
            <div className="flex items-center mb-8">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Share Your Poem
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="What shall we call this poem?"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Author
                </label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Who wrote these beautiful words?"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={3}
                  placeholder="A few lines that capture the essence..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Cover Image URL
                </label>
                <input
                  name="coverUrl"
                  value={form.coverUrl}
                  onChange={handleChange}
                  placeholder="A visual companion for your poem"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Poem or Article Link *
                </label>
                <input
                  name="linkUrl"
                  type="url"
                  value={form.linkUrl}
                  onChange={handleChange}
                  required
                  placeholder="Where can we find the full poem?"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${isSubmitting 
                    ? 'bg-purple-400 dark:bg-purple-600 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 shadow-md hover:shadow-lg'} text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Preserving Your Words...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add to Poetry Collection
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => navigate('/poetry')}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Poetry Garden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPoem;