import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaMusic,
  FaFilm,
  FaPenFancy,
  FaBook,
  FaTrashAlt,
  FaStickyNote,
  FaHeadphones,
  FaVideo,
  FaFeatherAlt,
  FaBookOpen,
  FaFireAlt,
  FaInbox,
  FaHome,
  FaLeaf,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ComfortSpace = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 text-gray-900'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-colors duration-500 ${darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-b border-gray-700' : 'bg-white/80 backdrop-blur-sm border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
              className="flex items-center space-x-2"
            >
              <FaLeaf className={`text-2xl ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={`text-2xl font-serif font-bold tracking-wide ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>ELARIA</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <FaHome className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Home</span>
            </motion.button>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-amber-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {!darkMode && (
          <>
            <div className="absolute top-10% left-5% w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute top-30% right-10% w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
            <div className="absolute bottom-10% left-40% w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
          </>
        )}
        
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 opacity-5 ${darkMode ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iIzAwMDAwMCIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+")]'}`}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight leading-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Your <span className={darkMode ? 'text-emerald-400' : 'text-indigo-600'}>Sacred</span> Digital Haven
          </h1>
          <div className={`w-32 h-1.5 mx-auto mb-8 rounded-full ${darkMode ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-indigo-400 to-purple-400'}`}></div>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            A carefully curated collection of spaces designed to nurture your mind, 
            soothe your soul, and spark your creativity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Music Player Card */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            className={`relative overflow-hidden rounded-3xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200'} shadow-xl transition-all duration-300`}
          >
            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 ${darkMode ? 'bg-emerald-400' : 'bg-indigo-200'}`}></div>
            <div className="p-8 relative z-10">
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl ${darkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'}`}>
                <FaHeadphones className={`text-3xl ${darkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Serene Soundscapes</h2>
              <p className={`mb-6 text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Immerse yourself in handcrafted audio experiences designed to calm, focus, or uplift.
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${darkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center gap-2`}
                  onClick={() => navigate('/sound-corner')}
                >
                  <FaMusic /> Tune In
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Video Player Card */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            className={`relative overflow-hidden rounded-3xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200'} shadow-xl transition-all duration-300`}
          >
            <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 ${darkMode ? 'bg-amber-400' : 'bg-rose-200'}`}></div>
            <div className="p-8 relative z-10">
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl ${darkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'}`}>
                <FaVideo className={`text-3xl ${darkMode ? 'text-amber-400' : 'text-rose-600'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Visual Comfort</h2>
              <p className={`mb-6 text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Gentle visuals and soothing narratives to transport you to peaceful moments.
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${darkMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-rose-600 hover:bg-rose-700'} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center gap-2`}
                  onClick={() => navigate('/comfort-screen')}
                >
                  <FaFilm /> Watch Now
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Poetry Card */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            className={`relative overflow-hidden rounded-3xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200'} shadow-xl transition-all duration-300`}
          >
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 ${darkMode ? 'bg-yellow-400' : 'bg-amber-200'}`}></div>
            <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 ${darkMode ? 'bg-yellow-500' : 'bg-amber-300'}`}></div>
            <div className="p-8 relative z-10">
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl ${darkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'}`}>
                <FaFeatherAlt className={`text-3xl ${darkMode ? 'text-yellow-400' : 'text-amber-600'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Whispered Verses</h2>
              <p className={`mb-6 text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Words that dance with your emotions and speak directly to your heart.
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-amber-600 hover:bg-amber-700'} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center gap-2`}
                  onClick={() => navigate('/poetry')}
                >
                  <FaPenFancy /> Explore
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Library Card */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            className={`relative overflow-hidden rounded-3xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-teal-100 to-cyan-100 border border-teal-200'} shadow-xl transition-all duration-300`}
          >
            <div className={`absolute inset-0 opacity-10 ${darkMode ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMCAzOC41NUMzMC4xNjIgMzguNSAzOC41IDMwLjE2MiAzOC41IDIwQzM4LjUgOS44MzggMzAuMTYyIDEuNSAyMCAxLjVDOS44MzggMS41IDEuNSA5LjgzOCAxLjUgMjBDMS41IDMwLjE2MiA5LjgzOCAzOC41IDIwIDM4LjVaIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMCAzOC41NUMzMC4xNjIgMzguNSAzOC41IDMwLjE2MiAzOC41IDIwQzM4LjUgOS44MzggMzAuMTYyIDEuNSAyMCAxLjVDOS44MzggMS41IDEuNSA5LjgzOCAxLjUgMjBDMS41IDMwLjE2MiA5LjgzOCAzOC41IDIwIDM4LjVaIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=")]'}`}></div>
            <div className="p-8 relative z-10">
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl ${darkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'}`}>
                <FaBookOpen className={`text-3xl ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>The Quiet Library</h2>
              <p className={`mb-6 text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                A collection of reads that offer stillness, wisdom, and gentle escapes.
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-600 hover:bg-teal-700'} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center gap-2`}
                  onClick={() => navigate('/quiet-library')}
                >
                  <FaBook /> Browse
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Thought Release Card */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            className={`relative overflow-hidden rounded-3xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-red-100 to-orange-100 border border-red-200'} shadow-xl transition-all duration-300`}
          >
            <div className={`absolute inset-0 opacity-5 ${darkMode ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMCAzOC41NUMzMC4xNjIgMzguNSAzOC41IDMwLjE2MiAzOC41IDIwQzM4LjUgOS44MzggMzAuMTYyIDEuNSAyMCAxLjVDOS44MzggMS41IDEuNSA5LjgzOCAxLjUgMjBDMS41IDMwLjE2MiA5LjgzOCAzOC41IDIwIDM4LjVaIiBzdHJva2U9IiNGRjgwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMCAzOC41NUMzMC4xNjIgMzguNSAzOC41IDMwLjE2MiAzOC41IDIwQzM4LjUgOS44MzggMzAuMTYyIDEuNSAyMCAxLjVDOS44MzggMS41IDEuNSA9LjgzOCAxLjUgMjBDMS41IDMwLjE2MiA5LjgzOCAzOC41IDIwIDM4LjVaIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=")]'}`}></div>
            <div className="p-8 relative z-10">
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl ${darkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'}`}>
                <FaFireAlt className={`text-3xl ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Release & Let Go</h2>
              <p className={`mb-6 text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Write down what no longer serves you and watch it disappear forever.
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center gap-2`}
                  onClick={() => navigate('/crush-notes')}
                >
                  <FaTrashAlt /> Release
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Personal Notes Card */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            className={`relative overflow-hidden rounded-3xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200'} shadow-xl transition-all duration-300`}
          >
            <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-20 ${darkMode ? 'bg-violet-400' : 'bg-purple-200'}`}></div>
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-30 ${darkMode ? 'bg-violet-500' : 'bg-violet-200'}`}></div>
            <div className="p-8 relative z-10">
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl ${darkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'}`}>
                <FaInbox className={`text-3xl ${darkMode ? 'text-violet-400' : 'text-purple-600'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Sacred Pages</h2>
              <p className={`mb-6 text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Your private sanctuary for thoughts, dreams, and personal reflections.
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${darkMode ? 'bg-violet-600 hover:bg-violet-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center gap-2`}
                  onClick={() => navigate('/self-diary')}
                >
                  <FaStickyNote /> Begin Writing
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-20 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          <p>Take a deep breath. You're exactly where you need to be.</p>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ComfortSpace;