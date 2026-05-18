import { motion } from 'framer-motion';
import { useLang } from '../utils/lang';
import { FaBolt } from 'react-icons/fa';

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative text-center py-16 px-4 overflow-hidden">
      {/* Animated gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #CC0000 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
            top: '-10%',
            right: '-5%',
            animation: 'float 8s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float 10s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Scanline effect */}
      <div className="scanline" />

      {/* Lightning bolt icon */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="inline-block mb-4"
      >
        <div className="relative">
          <FaBolt
            size={64}
            className="text-yellow-400"
            style={{ filter: 'drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 40px #FF8C00)' }}
          />
          {/* Pulse rings */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-yellow-400"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2 + i * 0.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest mb-2"
        style={{
          background: 'linear-gradient(135deg, #CC0000 0%, #FF6666 25%, #FFD700 50%, #FF8C00 75%, #CC0000 100%)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient-x 4s ease infinite',
        }}
      >
        {t.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-body text-lg md:text-xl text-gray-300 mb-4 tracking-wider"
      >
        {t.subtitle}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-body text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed"
      >
        {t.heroDesc}
      </motion.p>

      {/* Tariff badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4 mt-8"
      >
        {[
          { label: '1–200 units (New)', value: 'FREE', color: '#00FF88' },
          { label: '201–400 units', value: '₹4.70/unit', color: '#FFD700' },
          { label: '401–500 units', value: '₹6.30/unit', color: '#FF8C00' },
          { label: '501–600 units', value: '₹8.40/unit', color: '#FF6644' },
          { label: '601–800 units', value: '₹9.45/unit', color: '#FF4444' },
          { label: '801–1000 units', value: '₹10.50/unit', color: '#DD2222' },
          { label: 'Above 1000', value: '₹11.55/unit', color: '#CC0000' },
        ].map((slab, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -2 }}
            className="glass-card rounded-lg px-3 py-2 text-center"
          >
            <div className="text-xs text-gray-400 font-body">{slab.label}</div>
            <div className="font-mono font-bold text-sm" style={{ color: slab.color }}>
              {slab.value}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
