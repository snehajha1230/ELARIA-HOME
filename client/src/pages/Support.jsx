import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaStethoscope,
  FaUserFriends,
  FaHeartbeat,
  FaWind,
  FaExclamationTriangle,
  FaHandsHelping,
  FaUserCheck,
  FaLeaf,
  FaHeadset,
  FaChartLine,
  FaRegSmile,
  FaRegCalendarAlt,
  FaRegBell,
  FaHome,
  FaBookOpen
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import BreathingModal from '../components/BreathingModal';
import SOSModal from '../components/SOSModal';
import axios from '../utils/api';
import { toast } from 'react-toastify';

const Support = () => {
  const navigate = useNavigate();
  const [showBreathing, setShowBreathing] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [activePath, setActivePath] = useState('discover');

  const handleSendSOS = async () => {
    try {
      await axios.post('/sos');
      toast.success('🚨 SOS alert sent to your emergency contacts!');
    } catch (err) {
      console.error('SOS Error:', err);
      toast.error('❌ Failed to send SOS email');
    } finally {
      setShowSOS(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e4f2fd] dark:from-[#1a1a2e] dark:to-[#16213e] text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <nav className="bg-white/90 dark:bg-[#0f3460]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/home')}
                className="flex items-center space-x-2 text-2xl font-bold text-[#5d78ff] dark:text-[#8a9bff]"
              >
                <FaHome className="text-[#5d78ff]" />
                <span>ELARIA</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Organic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#d4e6f8]/50 dark:bg-[#1e3a8a]/20 opacity-30 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-[#e8dff5]/50 dark:bg-[#5b21b6]/20 opacity-30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Personalized Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#2d3748] dark:text-white">
                Welcome Back
              </h1>
              <p className="text-lg text-[#4a5568] dark:text-gray-400">
                How are you feeling today?
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/mood-tracker')}
                className="flex items-center space-x-2 px-4 py-2 bg-white/90 dark:bg-[#1e293b]/90 rounded-xl shadow-sm border border-[#e2e8f0] dark:border-[#334155] hover:shadow-md transition-all"
              >
                <FaRegSmile className="text-[#f6ad55]" />
                <span>Track Mood</span>
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/notifications')}
                className="flex items-center space-x-2 px-4 py-2 bg-white/90 dark:bg-[#1e293b]/90 rounded-xl shadow-sm border border-[#e2e8f0] dark:border-[#334155] hover:shadow-md transition-all"
              >
                <FaRegBell className="text-[#63b3ed]" />
                <span>Notifications</span>
              </motion.button>
            </div>
          </div>
          
          {/* Daily Wellness Tip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#e2e8f0] dark:border-[#334155] mb-8"
          >
            <div className="flex items-start">
              <div className="bg-[#dbeafe] dark:bg-[#1e3a8a]/30 p-3 rounded-xl mr-4">
                <FaRegCalendarAlt className="text-[#3b82f6] dark:text-[#93c5fd]" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-[#2d3748] dark:text-gray-200">Daily Wellness Tip</h3>
                <p className="text-[#4a5568] dark:text-gray-400">
                  Take 5 deep breaths when you feel stressed. This simple practice can help reset your nervous system.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Wellness Tools */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#2d3748] dark:text-gray-200">Quick Wellness Tools</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.button
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBreathing(true)}
                className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-[#e2e8f0] dark:border-[#334155] flex flex-col items-center justify-center hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#e0f2f1] dark:bg-[#134e4a]/30 flex items-center justify-center mb-4">
                  <FaWind className="text-[#26a69a] dark:text-[#5eead4]" size={24} />
                </div>
                <span className="font-medium">Breathe</span>
                <span className="text-sm text-[#718096] dark:text-gray-400 mt-1">5 min exercise</span>
              </motion.button>
              
              <motion.button
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/mindfulness')}
                className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-[#e2e8f0] dark:border-[#334155] flex flex-col items-center justify-center hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#e8f5e9] dark:bg-[#14532d]/30 flex items-center justify-center mb-4">
                  <FaLeaf className="text-[#4caf50] dark:text-[#86efac]" size={24} />
                </div>
                <span className="font-medium">Meditate</span>
                <span className="text-sm text-[#718096] dark:text-gray-400 mt-1">Guided sessions</span>
              </motion.button>
              
              <motion.button
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/gratitude-journal')}
                className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-[#e2e8f0] dark:border-[#334155] flex flex-col items-center justify-center hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#ede7f6] dark:bg-[#5b21b6]/30 flex items-center justify-center mb-4">
                  <FaBookOpen className="text-[#673ab7] dark:text-[#a78bfa]" size={24} />
                </div>
                <span className="font-medium">Gratitude</span>
                <span className="text-sm text-[#718096] dark:text-gray-400 mt-1">Daily Inspiration</span>
              </motion.button>
              
              <motion.button
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/wellness-tools-guide')}
                className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-[#e2e8f0] dark:border-[#334155] flex flex-col items-center justify-center hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#e8eaf6] dark:bg-[#3730a3]/30 flex items-center justify-center mb-4">
                  <FaHeartbeat className="text-[#5c6bc0] dark:text-[#818cf8]" size={24} />
                </div>
                <span className="font-medium">How to Use</span>
                <span className="text-sm text-[#718096] dark:text-gray-400 mt-1">Feature guide</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Community Support Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#e2e8f0] dark:border-[#334155] mb-8 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-3 text-[#2d3748] dark:text-gray-200">You're not alone</h3>
              <p className="text-[#4a5568] dark:text-gray-400 mb-4">
                Join our compassionate community where you can share experiences, find understanding, 
                and receive support from people who truly care.
              </p>
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/helper-directory')}
                    className="px-5 py-2.5 bg-[#e0e7ff] dark:bg-[#3730a3]/30 text-[#4f46e5] dark:text-[#a5b4fc] rounded-lg font-medium hover:bg-[#c7d2fe] dark:hover:bg-[#4338ca]/50 transition-colors border border-[#c7d2fe] dark:border-[#4f46e5]"
                  >
                    Find Support
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/apply-helper')}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white rounded-lg font-medium hover:from-[#6366f1] hover:to-[#8b5cf6] transition-all"
                  >
                    Become a Helper
                  </motion.button>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2 text-sm text-[#4a5568] dark:text-gray-400"
                >
                  <div className="flex-1 h-px bg-[#e2e8f0] dark:bg-[#334155]"></div>
                  <span>or</span>
                  <div className="flex-1 h-px bg-[#e2e8f0] dark:bg-[#334155]"></div>
                </motion.div>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/helper-dashboard')}
                  className="px-5 py-2.5 bg-white dark:bg-[#334155] text-[#4f46e5] dark:text-[#a5b4fc] rounded-lg font-medium hover:bg-[#f5f5ff] dark:hover:bg-[#3e4a61] transition-colors border border-[#e2e8f0] dark:border-[#4f46e5]/30 flex items-center justify-center space-x-2"
                >
                  <FaHandsHelping className="text-[#818cf8]" />
                  <span>Already a helper? Check chat requests</span>
                </motion.button>
              </div>
            </div>
            <div className="relative w-full md:w-1/2 h-64 bg-gradient-to-br from-[#dbeafe]/50 to-[#e0f2fe]/50 dark:from-[#1e3a8a]/20 dark:to-[#0369a1]/10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <FaUserFriends size={120} className="text-[#3b82f6] dark:text-[#93c5fd]" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                <h4 className="text-lg font-semibold mb-2 text-[#3b82f6] dark:text-[#93c5fd]">Community Spotlight</h4>
                <p className="text-[#4a5568] dark:text-gray-300">
                  "This community helped me through my darkest times. Now I'm here to help others."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

          {/* Self-Check Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#e2e8f0] dark:border-[#334155] mb-8 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-3 text-[#673ab7] dark:text-[#b39ddb]">Your Self-Check Journey</h3>
              <p className="text-[#4a5568] dark:text-gray-400 mb-4">
                Understanding your mental health is the first step towards wellness. Our self-check tools provide 
                personalized insights to help you recognize patterns and take positive action.
              </p>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/diagnose-yourself')}
                className="px-5 py-2.5 bg-gradient-to-r from-[#b39ddb] to-[#9575cd] text-white rounded-lg font-medium hover:from-[#9575cd] hover:to-[#7e57c2] transition-all"
              >
                Start Self-Check
              </motion.button>
            </div>
            <div className="relative w-full md:w-1/2 h-64 bg-gradient-to-br from-[#ede7f6]/50 to-[#d1c4e9]/50 dark:from-[#5b21b6]/20 dark:to-[#7c4dff]/10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <FaStethoscope size={120} className="text-[#673ab7] dark:text-[#b39ddb]" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                <h4 className="text-lg font-semibold mb-2 text-[#673ab7] dark:text-[#b39ddb]">Did You Know?</h4>
                <p className="text-[#4a5568] dark:text-gray-300">
                  Regular self-checks can help you track your mental health progress and identify areas that need attention.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#e2e8f0] dark:border-[#334155] mb-12 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-3 text-[#e91e63] dark:text-[#f48fb1]">Your Safety Network</h3>
              <p className="text-[#4a5568] dark:text-gray-400 mb-4">
                Your trusted contacts are your safety net. Keep them updated so they can be there for you when you need them most.
              </p>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contacts')}
                className="px-5 py-2.5 bg-gradient-to-r from-[#f48fb1] to-[#e91e63] text-white rounded-lg font-medium hover:from-[#f06292] hover:to-[#d81b60] transition-all"
              >
                Manage Emergency Contacts
              </motion.button>
            </div>
            <div className="relative w-full md:w-1/2 h-64 bg-gradient-to-br from-[#fce4ec]/50 to-[#f8bbd0]/50 dark:from-[#e91e63]/20 dark:to-[#f06292]/10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <FaUserCheck size={120} className="text-[#e91e63] dark:text-[#f48fb1]" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                <h4 className="text-lg font-semibold mb-2 text-[#e91e63] dark:text-[#f48fb1]">Why It Matters</h4>
                <p className="text-[#4a5568] dark:text-gray-300">
                  Having trusted people who understand your needs can make all the difference in difficult moments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Emergency Floating Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSOS(true)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f87171] to-[#ef4444] shadow-lg hover:shadow-xl transition-all text-white flex items-center justify-center"
        >
          <FaExclamationTriangle size={28} />
        </motion.button>
      </motion.div>

      {/* Modals */}
      {showBreathing && <BreathingModal onClose={() => setShowBreathing(false)} />}
      {showSOS && <SOSModal onConfirm={handleSendSOS} onCancel={() => setShowSOS(false)} />}
    </div>
  );
};

export default Support;