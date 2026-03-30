/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  Wrench, 
  Youtube, 
  Timer, 
  Bookmark, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  X,
  Menu,
  Bell,
  Search,
  Plus,
  Star,
  Download,
  Info,
  Calendar,
  Droplets,
  Pill,
  LayoutGrid,
  FlaskConical,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { PHARMA_TOOLS, BLOG_URL, QUIZ_URL, TIMER_URL, YOUTUBE_RAW_URL, ABOUT_URL } from './constants';
import { TabType, Bookmark as BookmarkType } from './types';

const IconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Pill: <Pill className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  FlaskConical: <FlaskConical className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentUrl, setCurrentUrl] = useState(BLOG_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [progress, setProgress] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => setIsOffline(true));

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });

    window.addEventListener('appinstalled', () => {
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    });

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  // Handle URL changes based on tab
  useEffect(() => {
    setIsLoading(true);
    setProgress(10);
    switch (activeTab) {
      case 'home': setCurrentUrl(BLOG_URL); break;
      case 'notes': setCurrentUrl(`${BLOG_URL}search/label/Notes`); break;
      case 'quiz': setCurrentUrl(QUIZ_URL); break;
      case 'tools': setCurrentUrl(PHARMA_TOOLS[3].url); break; // Tools Hub
      case 'youtube': setCurrentUrl(YOUTUBE_RAW_URL); break;
      case 'timer': setCurrentUrl(TIMER_URL); break;
    }
  }, [activeTab]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setProgress(100);
    setTimeout(() => setProgress(0), 500);
  };

  const toggleBookmark = () => {
    const newBookmark: BookmarkType = {
      id: Date.now().toString(),
      title: "Page " + currentUrl.split('/').pop(),
      url: currentUrl,
      timestamp: Date.now()
    };

    const exists = bookmarks.find(b => b.url === currentUrl);
    let updated;
    if (exists) {
      updated = bookmarks.filter(b => b.url !== currentUrl);
    } else {
      updated = [...bookmarks, newBookmark];
    }
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ankit Study Point',
        text: 'Check out this educational resource!',
        url: currentUrl,
      });
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert('Link copied to clipboard!');
    }
  };

  const goBack = () => {
    if (iframeRef.current) {
      // In a real WebView this would be different, but for iframe we try
      try {
        window.history.back();
      } catch (e) {
        setShowExitConfirm(true);
      }
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6"
        >
          <BookOpen className="w-16 h-16 text-white" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-800"
        >
          Ankit Study Point
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-500 mt-2"
        >
          Your Complete Study Platform
        </motion.p>
        <div className="absolute bottom-12 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-blue-600"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-screen bg-gray-50 font-sans overflow-hidden transition-colors duration-300", isDarkMode && "dark bg-gray-900")}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg text-gray-800 dark:text-white truncate max-w-[120px]">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> : <Star className="w-5 h-5 text-gray-500" />}
          </button>
          <button 
            onClick={() => {
              setCurrentUrl(BLOG_URL);
              setActiveTab('home');
              if (iframeRef.current) iframeRef.current.src = BLOG_URL;
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Go to Home"
          >
            <RotateCcw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          {showInstallBtn && (
            <button 
              onClick={handleInstall}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md hover:bg-blue-700 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
          )}
          <button onClick={toggleBookmark} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Bookmark className={cn("w-5 h-5", bookmarks.find(b => b.url === currentUrl) ? "fill-blue-600 text-blue-600" : "text-gray-500 dark:text-gray-400")} />
          </button>
          <button onClick={handleShare} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="h-1 w-full bg-gray-100 absolute top-[57px] z-40">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-600"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isOffline ? (
            <motion.div 
              key="offline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-gray-900 z-20"
            >
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">No Internet Connection</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Please check your connection and try again to access study materials.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow-lg shadow-blue-200 dark:shadow-none"
              >
                Retry Connection
              </button>
            </motion.div>
          ) : activeTab === 'youtube' ? (
            <motion.div 
              key="youtube-tab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 text-center"
            >
              <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <Youtube className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Watch on YouTube</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
                YouTube blocks direct embedding of channel pages for security. Click below to watch our latest educational videos.
              </p>
              <a 
                href={YOUTUBE_RAW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-100 dark:shadow-none flex items-center gap-3 hover:bg-red-700 transition-all"
              >
                <Youtube className="w-6 h-6" />
                Open @rxvibeak
              </a>
              <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-bold text-gray-400 uppercase">Subscribers</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">Join Us</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-bold text-gray-400 uppercase">Content</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">Pharma Tips</p>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'tools' ? (
            <motion.div 
              key="tools-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 overflow-y-auto p-4 pb-24 bg-gray-50 dark:bg-gray-900"
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-600 rounded-2xl p-6 text-white mb-2 shadow-lg">
                  <h2 className="text-2xl font-bold">Pharma Tools</h2>
                  <p className="opacity-80 text-sm mt-1">Essential calculators and checkers for pharmacy students.</p>
                </div>
                {PHARMA_TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setCurrentUrl(tool.url);
                      setActiveTab('home'); // Switch to home to show the webview
                    }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {IconMap[tool.icon]}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white">{tool.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tool.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-white dark:bg-gray-900">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-blue-100 dark:border-gray-800 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-xs text-gray-400 mt-3 font-medium">Loading content...</p>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={currentUrl}
                className="w-full h-full border-none"
                onLoad={handleIframeLoad}
                title="Content View"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('timer')}
          className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center z-40"
        >
          <Timer className="w-7 h-7" />
        </motion.button>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2 flex items-center justify-around z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === 'notes'} 
          onClick={() => setActiveTab('notes')} 
          icon={<BookOpen className="w-6 h-6" />} 
          label="Notes" 
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === 'quiz'} 
          onClick={() => setActiveTab('quiz')} 
          icon={<Gamepad2 className="w-6 h-6" />} 
          label="Quiz" 
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === 'tools'} 
          onClick={() => setActiveTab('tools')} 
          icon={<Wrench className="w-6 h-6" />} 
          label="Tools" 
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === 'youtube'} 
          onClick={() => setActiveTab('youtube')} 
          icon={<Youtube className="w-6 h-6" />} 
          label="YouTube" 
          isDarkMode={isDarkMode}
        />
      </nav>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Exit App?</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Are you sure you want to close Ankit Study Point?</p>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => window.close()}
                  className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-bold"
                >
                  Exit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, isDarkMode }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, isDarkMode: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all duration-300",
        active ? "text-blue-600 scale-110" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
      )}
    >
      <div className={cn(
        "p-1 rounded-lg transition-colors",
        active ? "bg-blue-50 dark:bg-blue-900/30" : "bg-transparent"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
