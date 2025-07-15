import React, { useState } from 'react';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

const questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself?",
  "Trouble concentrating on things?",
  "Moving or speaking slowly or being fidgety?",
  "Thoughts of self-harm or feeling you'd be better off dead?"
];

const options = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day"
];

const DiagnoseYourself = () => {
  const [answers, setAnswers] = useState(Array(9).fill(null));
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (qIndex, value) => {
    const updated = [...answers];
    updated[qIndex] = parseInt(value);
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      toast.error('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('/diagnose', { answers });
      setResult(res.data);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeverityColor = (score) => {
    if (score <= 4) return 'bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700';
    if (score <= 9) return 'bg-yellow-100 dark:bg-yellow-900/50 border-yellow-300 dark:border-yellow-700';
    if (score <= 14) return 'bg-orange-100 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700';
    return 'bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-700';
  };

  const getSeverityText = (score) => {
    if (score <= 4) return 'Minimal depression';
    if (score <= 9) return 'Mild depression';
    if (score <= 14) return 'Moderate depression';
    if (score <= 19) return 'Moderately severe depression';
    return 'Severe depression';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">Mental Health Assessment</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            This PHQ-9 questionnaire assesses depression severity. Answer honestly for the most accurate results.
          </p>
        </div>

        {/* Questionnaire */}
        <div className="space-y-6 mb-10">
          {questions.map((q, i) => (
            <div key={i} className="bg-white dark:bg-gray-700/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <p className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                  {i + 1}
                </span>
                {q}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((opt, j) => (
                  <label 
                    key={j} 
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${answers[i] === j ? 
                      'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 
                      'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'}`}
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={j}
                      onChange={() => handleChange(i, j)}
                      checked={answers[i] === j}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-200">
                      {opt} <span className="text-gray-500 dark:text-gray-400">({j})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center mb-16">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-all ${isSubmitting ? 
              'bg-blue-400 dark:bg-blue-700 cursor-not-allowed' : 
              'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'} 
            text-white flex items-center justify-center mx-auto min-w-[200px]`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Your Results
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div id="result-section" className={`mt-8 p-6 rounded-xl border ${getSeverityColor(result.score)} shadow-lg mb-16`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                  Assessment Results: <span className="capitalize">{getSeverityText(result.score)}</span>
                </h2>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your score: {result.score}/27</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{Math.round((result.score / 27) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${result.score <= 4 ? 'bg-green-500' : result.score <= 9 ? 'bg-yellow-500' : result.score <= 14 ? 'bg-orange-500' : 'bg-red-500'}`} 
                      style={{ width: `${(result.score / 27) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{result.suggestion}</p>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Interpretation Guide:</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start"><span className="text-green-500 mr-2">•</span> 0-4: Minimal depression</li>
                      <li className="flex items-start"><span className="text-yellow-500 mr-2">•</span> 5-9: Mild depression</li>
                      <li className="flex items-start"><span className="text-orange-500 mr-2">•</span> 10-14: Moderate depression</li>
                      <li className="flex items-start"><span className="text-red-500 mr-2">•</span> 15-19: Moderately severe depression</li>
                      <li className="flex items-start"><span className="text-red-600 mr-2">•</span> 20-27: Severe depression</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnoseYourself;