import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaMusic, FaFilm, FaBook, FaPenAlt, FaEnvelope, FaHandsHelping, FaRobot, FaLeaf, FaUserCircle, FaSmile, FaBell, FaWind, FaMedal, FaHandHoldingHeart, FaSearch, FaUserFriends, FaPhoneAlt, FaFirstAid, FaHome, FaCouch } from 'react-icons/fa';

const AboutPage = () => {
  const comfortFeatures = [
    { icon: <FaMusic className="text-2xl" />, title: "Song Sanctuary", desc: "Build your personal comfort playlist with soul-soothing melodies that speak to your heart." },
    { icon: <FaFilm className="text-2xl" />, title: "Cozy Screen", desc: "Curate your collection of comforting films and shows that feel like a warm blanket." },
    { icon: <FaBook className="text-2xl" />, title: "Poetry Nook", desc: "A collection of gentle verses with space to save those that touch your soul." },
    { icon: <FaBook className="text-2xl" />, title: "Reading Corner", desc: "Your personal digital library filled with comforting books and stories." },
    { icon: <FaPenAlt className="text-2xl" />, title: "Thought Pages", desc: "A private space to pour out your heart, with option to release what no longer serves you." },
    { icon: <FaEnvelope className="text-2xl" />, title: "Letters to Self", desc: "Compose heartfelt letters to your past, present or future self, saved with love." }
  ];

  const supportFeatures = [
    { icon: <FaSmile className="text-2xl" />, title: "Heart Check-ins", desc: "Gently track your emotional landscape with kindness and compassion." },
    { icon: <FaBell className="text-2xl" />, title: "Comfort Alerts", desc: "Receive gentle notifications from your support circle when you need them most." },
    { icon: <FaWind className="text-2xl" />, title: "Breathe Together", desc: "Guided breathing exercises for moments when the world feels heavy." },
    { icon: <FaMedal className="text-2xl" />, title: "Mindful Moments", desc: "Simple meditation and yoga practices to reconnect with yourself." },
    { icon: <FaHandHoldingHeart className="text-2xl" />, title: "Gratitude Garden", desc: "Nurture appreciation with daily prompts and life-affirming wisdom." },
    { icon: <FaSearch className="text-2xl" />, title: "Compassionate Connections", desc: "Find understanding professionals or kindred spirits who truly listen." },
    { icon: <FaUserFriends className="text-2xl" />, title: "Become a Light", desc: "Share your warmth by offering support to others on their journey." },
    { icon: <FaFirstAid className="text-2xl" />, title: "Gentle Self-Check", desc: "Tender self-reflection prompts to understand your needs." },
    { icon: <FaPhoneAlt className="text-2xl" />, title: "Reach Out", desc: "Quickly connect with your trusted circle when you need extra care." }
  ];

  const aiCompanionFeatures = [
    { icon: <FaLeaf className="text-2xl" />, title: "Gentle Presence", desc: "ELARIA listens with patience and responds with heartfelt understanding." },
    { icon: <FaPhoneAlt className="text-2xl" />, title: "Voice Comfort", desc: "Hear ELARIA's soothing voice whenever words on a screen aren't enough." },
    { icon: <FaUserCircle className="text-2xl" />, title: "Always Here", desc: "24/7 companionship for those moments when the world is asleep but you're awake with your thoughts." },
    { icon: <FaHeart className="text-2xl" />, title: "Grows With You", desc: "Learns your unique needs to offer increasingly personalized comfort." }
  ];

  return (
    <div className="min-h-screen bg-[#fff9f5] text-[#5a4a42] font-serif">
      {/* Warm background textures */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#f8e3d4]/40 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }} 
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-[#e7d8c9]/40 blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center bg-[#f8e3d4] p-3 rounded-full mb-6">
            <FaHome className="text-3xl text-[#b38a6d]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#5a4a42] leading-tight">
            Welcome to Your <span className="text-[#b38a6d]">Comfort Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#7a6a62] max-w-3xl mx-auto leading-relaxed">
            ELARIA is your personal sanctuary for comfort and emotional well-being—a soft place to land when the world feels hard.
          </p>
        </motion.div>

        {/* Website Summary */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-[#5a4a42] mb-4">A Sanctuary for Your Well-being</h2>
          <p className="text-lg text-[#7a6a62] max-w-4xl mx-auto leading-relaxed">
            ELARIA offers a collection of carefully designed spaces and tools to help you find comfort, peace, and support whenever you need it. 
            Whether you're looking for a moment of calm, a creative outlet, or compassionate connection, we're here to help you feel at home.
          </p>
        </motion.div>

        {/* Comfort Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }} 
          className="mb-24"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-[#f8e3d4] p-4 rounded-full mb-4">
              <FaCouch className="text-3xl text-[#b38a6d]" />
            </div>
            <h2 className="text-4xl font-bold text-[#5a4a42] mb-4">Your Personal Comfort Spaces</h2>
            <p className="text-xl text-[#7a6a62] max-w-3xl mx-auto">
              Curated corners designed to nurture your heart and mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comfortFeatures.map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e7d8c9]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#f8e3d4] p-3 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#5a4a42]">{feature.title}</h3>
                </div>
                <p className="text-[#7a6a62] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }} 
          className="mb-24"
        >
          <div className="bg-[#f5ebe6] rounded-3xl p-8 shadow-inner border border-[#e7d8c9]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-[#e7d8c9] p-3 rounded-full mb-4">
                <FaHandsHelping className="text-3xl text-[#8c6a56]" />
              </div>
              <h2 className="text-3xl font-semibold text-[#5a4a42]">
                Gentle Support When You Need It
              </h2>
              <p className="text-lg text-[#7a6a62] mt-4 max-w-3xl mx-auto leading-relaxed">
                We all need help sometimes. ELARIA offers compassionate tools designed to meet you where you are.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportFeatures.map((feature, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 border border-[#e7d8c9] shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-[#f8e3d4] p-2 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <h4 className="font-medium text-[#5a4a42]">{feature.title}</h4>
                  </div>
                  <p className="text-[#7a6a62] text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Companion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }} 
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#5a4a42] mb-4">ELARIA AI Companion</h2>
            <p className="text-xl text-[#7a6a62] max-w-3xl mx-auto">
              Your always-available compassionate listener
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCompanionFeatures.map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e7d8c9]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-[#5a4a42] mb-4">{feature.title}</h3>
                <p className="text-[#7a6a62] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Invitation */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          viewport={{ once: true }} 
          className="mt-16 text-center"
        >
          <div className="bg-[#f8e3d4] rounded-3xl p-8 shadow-inner border border-[#e7d8c9]">
            <div className="inline-flex items-center justify-center bg-white p-4 rounded-full mb-6">
              <FaHeart className="text-3xl text-[#b38a6d]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-[#5a4a42]">You Belong Here</h2>
            <p className="text-xl text-[#7a6a62] mb-8 max-w-3xl mx-auto leading-relaxed">
              Take the first gentle step toward creating your personal comfort space today.
            </p>
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(179, 138, 109, 0.3)" }} 
              whileTap={{ scale: 0.98 }} 
              className="px-8 py-3 bg-[#b38a6d] text-white rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => window.location.href = '/signup'}
            >
              Begin Your Comfort Journey
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-[#5a4a42] text-[#f8e3d4] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaHeart className="mr-2 text-[#f8e3d4]" /> ELARIA
              </h3>
              <p className="text-[#d9c7b8]">A soft place to land on hard days.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <p className="text-[#d9c7b8] mb-2 flex items-center">
                <FaEnvelope className="mr-2" /> elaria1230@gmail.com
              </p>
              <p className="text-[#d9c7b8]">
                Created with care by Sneha Jha
              </p>
            </div>
          </div>
          <div className="border-t border-[#7a6a62] mt-8 pt-8 text-center text-[#d9c7b8]">
            <p>© {new Date().getFullYear()} ELARIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;