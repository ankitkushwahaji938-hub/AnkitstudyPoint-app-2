import React, { useState, useEffect } from 'react';
import {
  Home,
  BookOpen,
  Gamepad2,
  Wrench,
  Timer,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Data Types
type TabType = 'home' | 'notes' | 'quiz' | 'tools' | 'timer';

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Built-in Quiz Data
const QUIZZES: Quiz[] = [
  {
    id: '1',
    question: 'What is the therapeutic effect of Paracetamol?',
    options: ['Antibiotic', 'Antipyretic & Analgesic', 'Antihistamine', 'Anticoagulant'],
    correctAnswer: 1,
    explanation: 'Paracetamol works as an antipyretic (fever reducer) and analgesic (pain reliever).'
  },
  {
    id: '2',
    question: 'What is the normal IV drip rate in drops per minute?',
    options: ['10-20 drops/min', '20-30 drops/min', '30-50 drops/min', '50-100 drops/min'],
    correctAnswer: 2,
    explanation: 'The normal IV drip rate is typically 30-50 drops per minute depending on the IV set.'
  },
  {
    id: '3',
    question: 'Which drug is used for blood pressure control?',
    options: ['Aspirin', 'Amlodipine', 'Ibuprofen', 'Omeprazole'],
    correctAnswer: 1,
    explanation: 'Amlodipine is a calcium channel blocker used to treat hypertension.'
  },
  {
    id: '4',
    question: 'What does NSAID stand for?',
    options: ['Non-Steroidal Anti-Inflammatory Drug', 'Non-Structural Anti-Immune Disease', 'Non-Stimulant Anti-Infective Drug', 'None of above'],
    correctAnswer: 0,
    explanation: 'NSAID = Non-Steroidal Anti-Inflammatory Drug. Examples: Ibuprofen, Diclofenac.'
  },
  {
    id: '5',
    question: 'What is the recommended dose of Amoxicillin for adults?',
    options: ['250-500mg once daily', '250-500mg three times daily', '1-2g daily', '5g daily'],
    correctAnswer: 1,
    explanation: 'Amoxicillin is usually prescribed 250-500mg three times daily for bacterial infections.'
  }
];

// Built-in Study Notes
const STUDY_NOTES = [
  {
    title: 'Basic Pharmacology',
    content: `Basic Pharmacology - Important Concepts

1. Definition
Pharmacology is the science dealing with drugs and their actions on the body.

2. Branches
- Pharmacodynamics: What drug does to body
- Pharmacokinetics: What body does to drug

3. Drug Administration Routes
- Oral (PO) - Most common
- Intramuscular (IM)
- Intravenous (IV)
- Topical
- Rectal

4. Side Effects vs Adverse Reactions
- Side effects are predictable
- Adverse reactions are unexpected harmful effects

5. Drug Interactions
Important when patient takes multiple drugs`
  },
  {
    title: 'Common Antibiotics',
    content: `Important Antibiotics for Pharmacy Students

1. Penicillins
- Amoxicillin, Ampicillin
- Beta-lactam antibiotics
- Good for bacteria

2. Cephalosporins
- Ceftriaxone
- Similar to penicillins
- Used for serious infections

3. Macrolides
- Erythromycin
- Used for respiratory infections
- Better absorption

4. Fluoroquinolones
- Ciprofloxacin
- Broad spectrum
- Used for UTIs and respiratory infections`
  }
];

// Built-in Tools
interface Tool {
  id: string;
  title: string;
  description: string;
}

const PHARMA_TOOLS: Tool[] = [
  {
    id: 'bmi',
    title: 'BMI Calculator',
    description: 'Calculate Body Mass Index'
  },
  {
    id: 'iv-drip',
    title: 'IV Drip Calculator',
    description: 'Calculate drops per minute'
  },
  {
    id: 'dose',
    title: 'Dose Calculator',
    description: 'Calculate medication dose'
  }
];

// Tool Calculators
function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (weight && height) {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      const result = w / (h * h);
      setBmi(Math.round(result * 10) / 10);
    }
  };

  const getBMICategory = (value: number) => {
    if (value < 18.5) return 'Underweight';
    if (value < 25) return 'Normal Weight';
    if (value < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        onClick={calculateBMI}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Calculate BMI
      </button>
      {bmi && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{bmi}</p>
          <p className="text-gray-600 dark:text-gray-300">{getBMICategory(bmi)}</p>
        </div>
      )}
    </div>
  );
}

function IVDripCalculator() {
  const [volume, setVolume] = useState('');
  const [time, setTime] = useState('');
  const [dropFactor, setDropFactor] = useState('15');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (volume && time && dropFactor) {
      const drops = (parseFloat(volume) * parseFloat(dropFactor)) / parseFloat(time);
      setResult(Math.round(drops * 10) / 10);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Volume (mL)"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <input
        type="number"
        placeholder="Time (minutes)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <select
        value={dropFactor}
        onChange={(e) => setDropFactor(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="10">10 drops/mL (Macro)</option>
        <option value="15">15 drops/mL (Standard)</option>
        <option value="20">20 drops/mL (Macro)</option>
        <option value="60">60 drops/mL (Micro)</option>
      </select>
      <button
        onClick={calculate}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Calculate
      </button>
      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{result} drops/min</p>
        </div>
      )}
    </div>
  );
}

function DoseCalculator() {
  const [concentration, setConcentration] = useState('');
  const [dose, setDose] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (concentration && dose) {
      const volume = parseFloat(dose) / parseFloat(concentration);
      setResult(Math.round(volume * 100) / 100);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Concentration (mg/mL)"
        value={concentration}
        onChange={(e) => setConcentration(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <input
        type="number"
        placeholder="Required Dose (mg)"
        value={dose}
        onChange={(e) => setDose(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        onClick={calculate}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Calculate
      </button>
      {result && (
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{result} mL</p>
        </div>
      )}
    </div>
  );
}

// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      alert('Study time completed! Take a break! 📚');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6"
        >
          <BookOpen className="w-16 h-16 text-white" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          Ankit Study Point
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between z-20">
        <h1 className="text-xl font-bold">Ankit Study Point</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 hover:bg-blue-700 rounded-lg transition"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-2">Welcome! 👋</h2>
                <p className="opacity-90">Master pharmacy concepts here.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('quiz')}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-purple-500"
                >
                  <p className="text-sm font-bold dark:text-white">📝 Quizzes</p>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('tools')}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-green-500"
                >
                  <p className="text-sm font-bold dark:text-white">🔧 Tools</p>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('notes')}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-blue-500"
                >
                  <p className="text-sm font-bold dark:text-white">📚 Notes</p>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('timer')}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-red-500"
                >
                  <p className="text-sm font-bold dark:text-white">⏱️ Timer</p>
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notes' && (
            <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Study Notes</h2>
              {STUDY_NOTES.map((note, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{note.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line line-clamp-4">{note.content}</p>
                  <button className="mt-3 text-blue-600 text-sm font-semibold">Read More →</button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Pharmacy Quizzes</h2>
              {selectedQuiz && !quizSubmitted ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedQuiz(null)}
                    className="text-blue-600 flex items-center gap-2 mb-4 dark:text-blue-400"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  {QUIZZES.map(quiz => {
                    if (quiz.id !== selectedQuiz) return null;
                    return (
                      <div key={quiz.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{quiz.question}</h3>
                        <div className="space-y-3">
                          {quiz.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => setQuizAnswers({ ...quizAnswers, [quiz.id]: idx })}
                              className={cn(
                                'w-full p-3 rounded-lg border-2 text-left font-semibold transition',
                                quizAnswers[quiz.id] === idx
                                  ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                                  : 'border-gray-200 dark:border-gray-700 dark:text-white'
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setQuizSubmitted(true)}
                          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
                        >
                          Submit Answer
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : quizSubmitted ? (
                <div className="space-y-4">
                  <button
                    onClick={() => { setSelectedQuiz(null); setQuizSubmitted(false); setQuizAnswers({}); }}
                    className="text-blue-600 flex items-center gap-2 mb-4 dark:text-blue-400"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  {QUIZZES.map(quiz => {
                    if (quiz.id !== selectedQuiz) return null;
                    const isCorrect = quizAnswers[quiz.id] === quiz.correctAnswer;
                    return (
                      <div key={quiz.id} className={cn(
                        'p-6 rounded-xl',
                        isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                      )}>
                        <div className="flex items-center gap-2 mb-3">
                          {isCorrect ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-red-600" />
                          )}
                          <span className={cn('font-bold text-lg', isCorrect ? 'text-green-600' : 'text-red-600')}>
                            {isCorrect ? 'Correct! ✅' : 'Incorrect ❌'}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300"><strong>💡 Explanation:</strong> {quiz.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {QUIZZES.map((quiz) => (
                    <motion.button
                      key={quiz.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedQuiz(quiz.id)}
                      className="w-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-left hover:shadow-md transition dark:text-white"
                    >
                      <p className="font-semibold">{quiz.question.slice(0, 50)}...</p>
                      <p className="text-xs text-gray-500 mt-1">Tap to attempt →</p>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'tools' && (
            <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Pharma Tools</h2>
              {selectedTool ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="text-blue-600 flex items-center gap-2 dark:text-blue-400"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    {selectedTool === 'bmi' && <BMICalculator />}
                    {selectedTool === 'iv-drip' && <IVDripCalculator />}
                    {selectedTool === 'dose' && <DoseCalculator />}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {PHARMA_TOOLS.map((tool) => (
                    <motion.button
                      key={tool.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTool(tool.id)}
                      className="w-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition dark:text-white"
                    >
                      <div className="text-left">
                        <p className="font-semibold">{tool.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'timer' && (
            <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-8">
                <div className="text-7xl font-bold text-blue-600 font-mono dark:text-blue-400">{formatTime(timerSeconds)}</div>
                <input
                  type="number"
                  placeholder="Minutes"
                  min="1"
                  max="120"
                  disabled={timerRunning}
                  onChange={(e) => setTimerSeconds(parseInt(e.target.value) * 60 || 0)}
                  className="border px-4 py-2 rounded-lg text-center dark:bg-gray-800 dark:border-gray-700 dark:text-white w-40"
                />
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={cn(
                    'px-8 py-3 rounded-lg font-bold text-white transition',
                    timerRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  )}
                >
                  {timerRunning ? '⏸️ Stop' : '▶️ Start'}
                </button>
                {timerRunning && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">Keep studying! Focus on your pharmacy concepts.</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around z-30">
        {[
          { tab: 'home' as TabType, icon: '🏠', label: 'Home' },
          { tab: 'notes' as TabType, icon: '📚', label: 'Notes' },
          { tab: 'quiz' as TabType, icon: '📝', label: 'Quiz' },
          { tab: 'tools' as TabType, icon: '🔧', label: 'Tools' },
          { tab: 'timer' as TabType, icon: '⏱️', label: 'Timer' },
        ].map(({ tab, icon, label }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-3 flex flex-col items-center justify-center gap-1 transition',
              activeTab === tab ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
            )}
          >
            <span className="text-xl">{icon}</span>
            <span className="text-xs font-bold">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
