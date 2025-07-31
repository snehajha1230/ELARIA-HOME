import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

const AddTrack = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    title: '',
    artist: '',
    coverUrl: '',
    trackUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [trackId, setTrackId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.trackToEdit) {
      const { _id, title, artist, coverUrl, trackUrl } = location.state.trackToEdit;
      setForm({ title, artist, coverUrl, trackUrl });
      setIsEditing(true);
      setTrackId(_id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please sign in to add to your sound collection');
      setIsSubmitting(false);
      return;
    }

    if (!form.title || !form.trackUrl) {
      toast.error('Title and track link are required');
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`/tracks/${trackId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Track updated successfully!');
      } else {
        await axios.post('/tracks', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Track added to your sound collection!');
      }
      navigate('/sound-corner');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error saving your track');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-purple-900 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Panel - Musical Inspiration */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 dark:from-gray-900 dark:to-purple-900/70 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "url('https://i.pinimg.com/736x/7e/ac/14/7eac1404728921a5d16d575512f4067d.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}></div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <h2 className="text-3xl font-bold font-serif text-purple-100">
                    Music Room
                  </h2>
                </div>
                <div className="w-16 h-1 bg-purple-400 mb-4"></div>
                <p className="text-purple-200 italic font-serif text-lg leading-relaxed">
                  "Music can heal the wounds which medicine cannot touch."<br />
                  <span className="text-purple-300">— Debasish Mridha</span>
                </p>
              </div>
              
              <div className="relative mt-8">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-purple-600/20 rounded-full"></div>
                <div className="relative bg-white/10 dark:bg-black/20 p-6 rounded-lg backdrop-blur-sm border border-purple-300/20">
                  <h3 className="font-bold text-purple-100 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    Pro Tip
                  </h3>
                  <p className="text-sm text-purple-200">
                    Add tracks that resonate with your soul - nostalgic melodies, calming instrumentals, or uplifting beats.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 mt-auto pt-4 border-t border-purple-700/50">
              <p className="text-xs text-purple-300/80">
                <span className="font-semibold">Note:</span> Your collection becomes a personalized auditory retreat.
              </p>
            </div>
          </div>

          {/* Right Panel - Add Track Form */}
          <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 p-8 flex flex-col">
            <div className="flex items-center mb-8">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isEditing ? 'Edit Comfort Track' : 'Add Comfort Track'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="What's this comforting track called?"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Artist
                </label>
                <input
                  type="text"
                  name="artist"
                  value={form.artist}
                  onChange={handleChange}
                  placeholder="Who created this musical comfort?"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  name="coverUrl"
                  value={form.coverUrl}
                  onChange={handleChange}
                  placeholder="Paste an image link for album/cover art"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Track Link *
                </label>
                <input
                  type="url"
                  name="trackUrl"
                  value={form.trackUrl}
                  onChange={handleChange}
                  required
                  placeholder="Where can we find this comfort track?"
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
                      {isEditing ? 'Updating Track...' : 'Saving Your Comfort Track...'}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {isEditing ? 'Update Track' : 'Add to Sound Collection'}
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => navigate('/sound-corner')}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Music Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrack;