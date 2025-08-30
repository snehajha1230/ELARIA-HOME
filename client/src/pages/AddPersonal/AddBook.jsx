import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

const AddBook = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    coverUrl: '',
    bookUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.bookToEdit) {
      const { _id, ...bookData } = location.state.bookToEdit;
      setForm(bookData);
      setCoverPreview(bookData.coverUrl);
      setIsEditMode(true);
      setBookId(_id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Update cover preview when coverUrl changes
    if (name === 'coverUrl') {
      setCoverPreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not logged in');
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`/books/${bookId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Book updated successfully!');
      } else {
        await axios.post('/books', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Book added to your collection!');
      }
      navigate('/quiet-library');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Cozy Reading Nook */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-800 dark:to-amber-900 p-8 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Your Reading Room
                </h2>
                <div className="w-16 h-1 bg-amber-700 dark:bg-amber-400 mb-4"></div>
                <p className="text-amber-800 dark:text-amber-200 italic font-serif text-lg">
                  {isEditMode 
                    ? "Update your book's details to keep your collection current." 
                    : "Every book you add becomes a new friend in your personal library."}
                </p>
              </div>
              
              <div className="relative mt-8">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-amber-400 dark:bg-amber-600 rounded-full opacity-20"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                  <h3 className="font-serif font-bold text-amber-900 dark:text-amber-200 mb-2">
                    Did you know?
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-100">
                    {isEditMode
                      ? "Keeping your book details accurate helps you remember why each book is special to you."
                      : "Personal libraries reflect our journey. Each book tells a story about when and why it joined your collection."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-amber-300 dark:border-amber-700">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                <span className="font-semibold">Tip:</span> {isEditMode ? "Update any details that have changed since you added this book." : "Add books that speak to you. This is your curated space."}
              </p>
            </div>
          </div>

          {/* Right Side - Add Book Form */}
          <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 p-8 flex flex-col">
            <div className="flex items-center mb-8">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isEditMode ? 'Edit Book Details' : 'Add to Your Collection'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {['title', 'author', 'genre'].map((field) => (
                <div key={field} className="group">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize transition-all duration-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required={field === 'title'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}

              {/* Cover URL with Preview */}
              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize transition-all duration-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  cover URL
                </label>
                <input
                  type="text"
                  name="coverUrl"
                  value={form.coverUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter cover URL"
                />
                {/* Cover Preview */}
                {coverPreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                    <div className="relative w-24 h-36 rounded-md overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm">
                      <img 
                        src={coverPreview} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Book URL */}
              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize transition-all duration-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  book URL
                </label>
                <input
                  type="text"
                  name="bookUrl"
                  value={form.bookUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter book URL"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${isSubmitting 
                    ? 'bg-amber-400 dark:bg-amber-600 cursor-not-allowed' 
                    : 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 shadow-md hover:shadow-lg'} text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEditMode ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditMode ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                      </svg>
                      {isEditMode ? 'Update Book' : 'Add to Your Collection'}
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => navigate('/quiet-library')}
                className="text-sm text-amber-600 dark:text-amber-400 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Reading Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;