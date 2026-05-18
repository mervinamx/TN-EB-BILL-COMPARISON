import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBolt, FaCalculator, FaRedo } from 'react-icons/fa';
import { useLang } from '../utils/lang';

const UnitInput = ({ onCalculate }) => {
  const { t } = useLang();
  const [units, setUnits] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === '' || (/^\d+$/.test(val) && parseInt(val) <= 99999)) {
      setUnits(val);
      setError('');
      if (val && parseInt(val) > 0) {
        onCalculate(parseInt(val));
      } else {
        onCalculate(null);
      }
    }
  };

  const handleReset = () => {
    setUnits('');
    setError('');
    onCalculate(null);
  };

  const presets = [50, 100, 200, 350, 500, 750, 1000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Electric border glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isFocused
              ? 'linear-gradient(90deg, rgba(204,0,0,0.15) 0%, rgba(255,215,0,0.15) 50%, rgba(204,0,0,0.15) 100%)'
              : 'transparent',
            transition: 'background 0.3s ease',
          }}
        />

        <label className="block text-center font-body font-semibold text-gray-300 text-lg mb-4 tracking-wider">
          ⚡ {t.inputLabel}
        </label>

        {/* Input */}
        <div className="relative mb-4">
          <input
            type="number"
            min="0"
            max="99999"
            value={units}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t.inputPlaceholder}
            className="input-electric w-full px-6 py-5 text-3xl md:text-4xl"
            style={{
              fontSize: '2.5rem',
              letterSpacing: '0.1em',
            }}
          />
          {/* Units label */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-body text-lg">
            Units
          </div>

          {/* Glow effect when focused */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: '0 0 30px rgba(255,215,0,0.2), 0 0 60px rgba(255,215,0,0.1)',
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-sm text-center mb-3 font-body"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Quick preset buttons */}
        <div className="mb-4">
          <p className="text-gray-500 text-xs text-center mb-2 font-body tracking-wider uppercase">
            Quick Select
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {presets.map((preset) => (
              <motion.button
                key={preset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setUnits(String(preset));
                  onCalculate(preset);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-mono font-bold transition-all duration-200
                  ${units === String(preset)
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
              >
                {preset}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Reset button */}
        {units && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 
                         hover:text-gray-200 border border-white/10 hover:border-white/20 
                         transition-all duration-200 text-sm font-body"
            >
              <FaRedo size={12} />
              {t.reset}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default UnitInput;
