import { motion } from 'framer-motion';
import { FaBolt, FaMoon, FaSun, FaLanguage } from 'react-icons/fa';
import { useLang } from '../utils/lang';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { t, lang, toggle: toggleLang } = useLang();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/5"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaBolt
            className="text-yellow-400"
            size={20}
            style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
          />
          <span className="font-display text-lg tracking-widest text-white hidden sm:block">
            TN EB BILL
          </span>
          <span
            className="text-xs font-body px-2 py-0.5 rounded ml-1"
            style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}
          >
            DMK vs TVK
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-body
                       bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white
                       border border-white/10 transition-all duration-200"
          >
            <FaLanguage size={14} />
            <span className="hidden sm:inline">
              {lang === 'en' ? t.tamil : t.english}
            </span>
          </motion.button>

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 
                       hover:text-white border border-white/10 transition-all duration-200"
          >
            {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
