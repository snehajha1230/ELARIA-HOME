import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const groundingSteps = [
  { key: 'see', title: '5 Things You Can See', count: 5, prompt: 'Look around and name things you can see.' },
  { key: 'feel', title: '4 Things You Can Feel', count: 4, prompt: 'Notice physical sensations: touch, temperature, texture.' },
  { key: 'hear', title: '3 Things You Can Hear', count: 3, prompt: 'Focus on nearby and distant sounds.' },
  { key: 'smell', title: '2 Things You Can Smell', count: 2, prompt: 'Take a slow breath and identify scents around you.' },
  { key: 'taste', title: '1 Thing You Can Taste', count: 1, prompt: 'Notice any current taste in your mouth.' }
];

const createInitialValues = () =>
  groundingSteps.reduce((acc, step) => {
    acc[step.key] = Array(step.count).fill('');
    return acc;
  }, {});

const AntiStress = ({ onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(createInitialValues);
  const [isComplete, setIsComplete] = useState(false);

  const step = groundingSteps[currentStep];
  const currentItems = values[step.key];
  const progress = useMemo(
    () => ((currentStep + (isComplete ? 1 : 0)) / groundingSteps.length) * 100,
    [currentStep, isComplete]
  );

  const closeModal = () => {
    if (onClose) {
      onClose();
      return;
    }
    navigate('/support');
  };

  const updateItem = (index, value) => {
    setValues(prev => ({
      ...prev,
      [step.key]: prev[step.key].map((item, i) => (i === index ? value : item))
    }));
  };

  const canProceed = currentItems.every(item => item.trim().length > 0);

  const handleNext = () => {
    if (!canProceed) return;

    if (currentStep === groundingSteps.length - 1) {
      setIsComplete(true);
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(prev => prev - 1);
  };

  const resetExercise = () => {
    setValues(createInitialValues());
    setCurrentStep(0);
    setIsComplete(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-[#e2e8f0] dark:border-[#334155] overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1e293b] dark:text-white">Anti-Stress Grounding (5-4-3-2-1)</h2>
                <p className="text-sm text-[#64748b] dark:text-gray-300 mt-1">
                  Fill each step mindfully. This stays on screen only and is not saved.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-[#64748b] dark:text-gray-300 hover:text-[#1e293b] dark:hover:text-white text-lg"
                aria-label="Close anti-stress activity"
              >
                x
              </button>
            </div>

            <div className="mt-5 w-full h-2 rounded-full bg-[#e2e8f0] dark:bg-[#334155] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4a6bff] to-[#7c3aed]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>

            {!isComplete ? (
              <div className="mt-6">
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wide text-[#7c3aed] dark:text-[#c4b5fd] font-semibold">
                    Step {currentStep + 1} of {groundingSteps.length}
                  </p>
                  <h3 className="text-xl font-semibold text-[#1e293b] dark:text-white">{step.title}</h3>
                  <p className="text-sm text-[#64748b] dark:text-gray-300 mt-1">{step.prompt}</p>
                </div>

                <div className="space-y-3">
                  {currentItems.map((item, index) => (
                    <input
                      key={`${step.key}-${index}`}
                      type="text"
                      value={item}
                      onChange={e => updateItem(index, e.target.value)}
                      placeholder={`Enter ${index + 1}`}
                      className="w-full px-4 py-3 rounded-xl border border-[#dbe3ef] dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#1e293b] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                    />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="px-4 py-2 rounded-lg border border-[#d1d9e6] dark:border-[#475569] text-[#475569] dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#4a6bff] to-[#7c3aed] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === groundingSteps.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-semibold text-[#1e293b] dark:text-white">Great job grounding yourself.</h3>
                <p className="text-[#64748b] dark:text-gray-300 mt-2">
                  You completed the full 5-4-3-2-1 activity. Take one deep breath before continuing.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetExercise}
                    className="px-5 py-2 rounded-lg border border-[#cbd5e1] dark:border-[#475569] text-[#334155] dark:text-gray-100"
                  >
                    Do Again
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#4a6bff] to-[#7c3aed] text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AntiStress;
