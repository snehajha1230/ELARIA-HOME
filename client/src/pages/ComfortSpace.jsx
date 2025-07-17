import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaMusic,
  FaFilm,
  FaPenFancy,
  FaBook,
  FaTrashAlt,
  FaStickyNote,
  FaLeaf,
  FaMoon,
  FaSun,
  FaHome
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ComfortSpace = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);

  // Room data with positions mapped to house layout
  const rooms = [
    {
      id: 'music',
      name: 'Music Room',
      icon: <FaMusic />,
      path: '/sound-corner',
      position: { gridArea: '1 / 2 / 2 / 3' }, // Top-left room
    },
    {
      id: 'cinema',
      name: 'Cinema',
      icon: <FaFilm />,
      path: '/comfort-screen',
      position: { gridArea: '1 / 4 / 2 / 5' }, // Top-right room
    },
    {
      id: 'poetry',
      name: 'Poetry Corner',
      icon: <FaPenFancy />,
      path: '/poetry',
      position: { gridArea: '2 / 1 / 3 / 2' }, // Left room
    },
    {
      id: 'library',
      name: 'Library',
      icon: <FaBook />,
      path: '/quiet-library',
      position: { gridArea: '2 / 5 / 3 / 6' }, // Right room
    },
    {
      id: 'release',
      name: 'Release Corner',
      icon: <FaTrashAlt />,
      path: '/crush-notes',
      position: { gridArea: '3 / 2 / 4 / 3' }, // Bottom-left room
    },
    {
      id: 'diary',
      name: 'Diary Space',
      icon: <FaStickyNote />,
      path: '/self-diary',
      position: { gridArea: '3 / 4 / 4 / 5' }, // Bottom-right room
    }
  ];

  // Animation variants
  const roomVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#2a211c] text-[#f8e3d4]' : 'bg-[#fff9f5] text-[#5a4a42]'}`}>
      {/* Dark mode toggle and home button */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/home')}
          className={`p-3 rounded-full ${darkMode ? 'bg-[#3a312c] text-[#f8e3d4]' : 'bg-[#f8e3d4] text-[#8c6a56]'}`}
        >
          <FaHome />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full ${darkMode ? 'bg-[#3a312c] text-[#f8e3d4]' : 'bg-[#f8e3d4] text-[#8c6a56]'}`}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </motion.button>
      </div>

      {/* Main Content - Interactive Home Map */}
      <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center p-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 mx-auto"
          >
            <FaLeaf className={`text-3xl ${darkMode ? 'text-[#b38a6d]' : 'text-[#8c6a56]'}`} />
            <span className={`text-3xl font-serif font-bold tracking-wide ${darkMode ? 'text-[#f8e3d4]' : 'text-[#5a4a42]'}`}>ELARIA</span>
          </motion.div>
          <h1 className={`text-4xl md:text-5xl font-bold mt-4 font-serif tracking-tight leading-tight ${darkMode ? 'text-[#f8e3d4]' : 'text-[#5a4a42]'}`}>
            Your <span className={darkMode ? 'text-[#b38a6d]' : 'text-[#8c6a56]'}>Comfort</span> Home
          </h1>
        </motion.div>

        {/* House Grid Layout */}
        <div className="relative w-full max-w-4xl h-3/5">
          {/* Grid Container */}
          <div className="grid grid-cols-6 grid-rows-4 h-full w-full gap-0">
            {/* Empty grid cells for structure */}
            <div className={`border ${darkMode ? 'border-[#4a3d36]' : 'border-[#e7d8c9]'}`}></div>
            <div className={`border ${darkMode ? 'border-[#4a3d36]' : 'border-[#e7d8c9]'}`}></div>
            <div className={`border ${darkMode ? 'border-[#4a3d36]' : 'border-[#e7d8c9]'}`}></div>
            <div className={`border ${darkMode ? 'border-[#4a3d36]' : 'border-[#e7d8c9]'}`}></div>
            <div className={`border ${darkMode ? 'border-[#4a3d36]' : 'border-[#e7d8c9]'}`}></div>
            <div className={`border ${darkMode ? 'border-[#4a3d36]' : 'border-[#e7d8c9]'}`}></div>
            
            {/* Repeat for all rows... */}
            {/* In a real implementation, you would map through rows or use CSS for the grid lines */}

            {/* Central Hall Area - Moved to left */}
            {/* <div 
              className={`col-span-2 col-start-1 row-span-2 row-start-2 flex items-center justify-center ${darkMode ? 'bg-[#3a312c]/30' : 'bg-[#f8e3d4]/30'} border ${darkMode ? 'border-[#4a3d36]' : 'border-[#e7d8c9]'}`}
            >
              <motion.div 
                className="text-center p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-[#f8e3d4]' : 'text-[#5a4a42]'}`}>Welcome</h2>
                <p className={`${darkMode ? 'text-[#d9c7b8]' : 'text-[#7a6a62]'}`}>
                  Room?
                </p>
              </motion.div>
            </div> */}

            {/* Room Components */}
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                className={`flex flex-col items-center justify-center cursor-pointer z-20 ${darkMode ? 'hover:bg-[#3a312c]/50' : 'hover:bg-[#f8e3d4]/50'} rounded-lg`}
                style={room.position}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={roomVariants}
                onClick={() => navigate(room.path)}
              >
                <div className={`p-5 rounded-full ${darkMode ? 'bg-[#3a312c]' : 'bg-white'} shadow-lg`}>
                  <div className={`text-4xl ${darkMode ? 'text-[#b38a6d]' : 'text-[#8c6a56]'}`}>
                    {room.icon}
                  </div>
                </div>
                <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-[#f8e3d4]' : 'text-[#5a4a42]'}`}>
                  {room.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* House Outline */}
          <div className="absolute inset-0 pointer-events-none">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              className="absolute"
            >
              {/* Main house outline */}
              <path 
                d="M15,15 H85 V85 H55 V65 H15 Z" 
                fill="none" 
                stroke={darkMode ? '#b38a6d' : '#8c6a56'} 
                strokeWidth="0.5" 
              />
              
              {/* Room dividers */}
              <path 
                d="M15,35 H55" 
                fill="none" 
                stroke={darkMode ? '#b38a6d' : '#8c6a56'} 
                strokeWidth="0.5" 
              />
              <path 
                d="M55,15 V65" 
                fill="none" 
                stroke={darkMode ? '#b38a6d' : '#8c6a56'} 
                strokeWidth="0.5" 
              />
              <path 
                d="M55,50 H85" 
                fill="none" 
                stroke={darkMode ? '#b38a6d' : '#8c6a56'} 
                strokeWidth="0.5" 
              />
            </svg>
          </div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-8 text-center text-sm ${darkMode ? 'text-[#d9c7b8]' : 'text-[#7a6a62]'}`}
        >
          <p>Take a deep breath. You're exactly where you need to be.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ComfortSpace;