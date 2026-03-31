import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, Home, ChevronLeft } from 'lucide-react';
import { LOCAL_QUIZZES, Question } from '../data/quizzes';
import { cn } from '../lib/utils';

export default function LocalQuiz() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentCategory = LOCAL_QUIZZES.find(c => c.id === selectedCategory);
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (!currentCategory) return;
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (!selectedCategory) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl">
          <h2 className="text-3xl font-bold">Local Quizzes</h2>
          <p className="opacity-80 mt-2">Test your knowledge offline with these built-in pharmacy quizzes.</p>
        </div>
        <div className="grid gap-4">
          {LOCAL_QUIZZES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between group"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{category.description}</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-3 uppercase tracking-wider">
                  {category.questions.length} Questions
                </p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-blue-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / (currentCategory?.questions.length || 1)) * 100);
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700"
        >
          <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Quiz Completed!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">You scored</p>
          <div className="text-6xl font-black text-blue-600 my-6">{percentage}%</div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {score} out of {currentCategory?.questions.length} correct
          </p>
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => handleCategorySelect(selectedCategory)}
              className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Retry
            </button>
            <button
              onClick={resetQuiz}
              className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Categories
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={resetQuiz} className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Question {currentQuestionIndex + 1} / {currentCategory?.questions.length}
        </div>
        <div className="w-6" />
      </div>

      <div className="mb-8">
        <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / (currentCategory?.questions.length || 1)) * 100}%` }}
            className="h-full bg-blue-600"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 leading-tight">
        {currentQuestion?.question}
      </h2>

      <div className="space-y-4">
        {currentQuestion?.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctAnswer;
          const isSelected = index === selectedOption;
          
          let stateClass = "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300";
          if (isAnswered) {
            if (isCorrect) stateClass = "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400";
            else if (isSelected) stateClass = "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400";
          } else if (isSelected) {
            stateClass = "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
              className={cn(
                "w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between group",
                stateClass
              )}
            >
              <span>{option}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            {currentQuestion?.explanation && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-sm mb-6">
                <span className="font-bold block mb-1">Explanation:</span>
                {currentQuestion.explanation}
              </div>
            )}
            <button
              onClick={handleNext}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              {currentQuestionIndex < (currentCategory?.questions.length || 0) - 1 ? 'Next Question' : 'Finish Quiz'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
