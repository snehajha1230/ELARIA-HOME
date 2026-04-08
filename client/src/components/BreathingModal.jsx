import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import breathingTune from '../assets/audio/nonenothingnowhere-174-hz-pain-release-156261.mp3';

const steps = [
  { text: 'Breathe In', instruction: 'Fill your lungs completely', color: 'bg-blue-400', duration: 4000 },
  { text: 'Hold', instruction: 'Feel the stillness', color: 'bg-teal-400', duration: 4000 },
  { text: 'Breathe Out', instruction: 'Release all tension', color: 'bg-indigo-400', duration: 4000 }
];

const BreathingModal = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [scale, setScale] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(breathingTune);
    const startAtSeconds = 8;
    audio.loop = true;
    audio.volume = 0.8;
    audio.currentTime = startAtSeconds;
    audioRef.current = audio;

    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {});
      return;
    }

    audio.pause();
  }, [isAudioPlaying]);

  useEffect(() => {
    let timeout;

    const updateBreathing = () => {
      setStepIndex(prev => {
        const next = (prev + 1) % steps.length;
        if (next === 0) setCycle(c => c + 1);
        return next;
      });

      // Set breathing circle scale based on step
      if (stepIndex === 0) setScale(1.3);      // Inhale - expand
      else if (stepIndex === 1) setScale(1.3); // Hold - stay expanded
      else if (stepIndex === 2) setScale(1);   // Exhale - shrink
    };

    if (isAnimating) {
      timeout = setTimeout(updateBreathing, steps[stepIndex].duration);
    }

    return () => clearTimeout(timeout);
  }, [stepIndex, isAnimating]);

  useEffect(() => {
    if (cycle > 3) {
      setIsAnimating(false);
      setTimeout(onClose, 1000); // Smooth exit after completion
    }
  }, [cycle, onClose]);

  const currentStep = steps[stepIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Breathing Exercise
              </h2>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAudioPlaying(prev => !prev)}
                  className="h-9 w-9 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300"
                  aria-label={isAudioPlaying ? 'Mute breathing tune' : 'Play breathing tune'}
                  title={isAudioPlaying ? 'Mute breathing tune' : 'Play breathing tune'}
                >
                  {isAudioPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.489 3.152a1 1 0 00-1.057.183L9.414 7H6a3 3 0 00-3 3v4a3 3 0 003 3h3.414l4.018 3.665A1 1 0 0015 19.93V4a1 1 0 00-.511-.848z" />
                      <path d="M17.707 8.293a1 1 0 010 1.414A3.978 3.978 0 0016.5 12c0 .848.263 1.636.707 2.293a1 1 0 01-1.414 1.414A5.972 5.972 0 0114.5 12c0-1.524.57-2.914 1.293-3.707a1 1 0 011.414 0z" />
                      <path d="M20.536 5.464a1 1 0 010 1.414C19.267 8.147 18.5 9.989 18.5 12s.767 3.853 2.036 5.122a1 1 0 01-1.414 1.414C17.486 16.9 16.5 14.553 16.5 12s.986-4.9 2.622-6.536a1 1 0 011.414 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.489 3.152a1 1 0 00-1.057.183L9.414 7H6a3 3 0 00-3 3v4a3 3 0 003 3h3.414l4.018 3.665A1 1 0 0015 19.93V4a1 1 0 00-.511-.848z" />
                      <path d="M18.293 8.293a1 1 0 011.414 0L21 9.586l1.293-1.293a1 1 0 111.414 1.414L22.414 11l1.293 1.293a1 1 0 01-1.414 1.414L21 12.414l-1.293 1.293a1 1 0 01-1.414-1.414L19.586 11l-1.293-1.293a1 1 0 010-1.414z" />
                    </svg>
                  )}
                </motion.button>
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 text-sm font-medium">
                  Cycle {cycle} of 3
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <motion.h3 
                  className={`text-4xl font-bold mb-2 ${currentStep.color.replace('bg', 'text')}`}
                >
                  {currentStep.text}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentStep.instruction}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative h-64 w-64 mx-auto mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`h-full w-full rounded-full ${currentStep.color} opacity-20`}
                  initial={{ scale: 1 }}
                  animate={{ scale: scale }}
                  transition={{ 
                    type: 'spring', 
                    damping: 15,
                    duration: currentStep.duration / 1000
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`h-40 w-40 rounded-full ${currentStep.color} shadow-lg flex items-center justify-center`}
                  initial={{ scale: 1 }}
                  animate={{ scale: scale }}
                  transition={{ 
                    type: 'spring', 
                    damping: 15,
                    duration: currentStep.duration / 1000
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAnimating(!isAnimating)}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium"
              >
                {isAnimating ? 'Pause' : 'Resume'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700"
              >
                {cycle > 3 ? 'Complete' : 'Stop'}
              </motion.button>
            </div>

            <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(cycle - 1 + (stepIndex + 1) / steps.length) / 3 * 100}%` }}
                transition={{ duration: currentStep.duration / 1000 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BreathingModal;