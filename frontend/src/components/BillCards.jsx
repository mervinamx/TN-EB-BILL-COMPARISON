import { motion } from 'framer-motion';
import { FaCheckCircle, FaRupeeSign } from 'react-icons/fa';
import { useLang } from '../utils/lang';
import { formatCurrency } from '../utils/calculations';
import AnimatedNumber from './AnimatedNumber';

const BillCards = ({ units, dmkBill, tvkBill }) => {
  const { t } = useLang();
  const savings = Math.max(0, dmkBill - tvkBill);
  const percentSaved = dmkBill > 0 ? ((savings / dmkBill) * 100).toFixed(1) : 0;
  const hasSavings = savings > 0;
  const above500 = units > 500;

  return (
    <div id="bill-result" className="max-w-5xl mx-auto px-4 mt-8">
      {/* Main comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* DMK Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
          className="glass-card-red rounded-2xl p-6 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #CC0000 0, #CC0000 1px, transparent 0, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-display"
              style={{ background: 'linear-gradient(135deg, #CC0000, #880000)', boxShadow: '0 0 20px #CC000066' }}
            >
              ☀
            </div>
            <div>
              <div className="font-display text-xl tracking-widest text-red-400">DMK</div>
              <div className="text-xs text-gray-400 font-body">{t.currentTariff}</div>
            </div>
            <div className="ml-auto">
              <span className="text-xs font-body px-2 py-1 rounded border border-red-800 text-red-400">
                CURRENT
              </span>
            </div>
          </div>

          {/* Bill amount */}
          <div className="text-center mb-4">
            <div className="text-gray-400 text-sm font-body mb-1">{t.dmkBill}</div>
            <div
              className="font-mono font-bold text-5xl md:text-6xl"
              style={{ color: '#FF4444', textShadow: '0 0 20px #CC000066' }}
            >
              ₹<AnimatedNumber value={dmkBill} decimals={0} duration={600} />
            </div>
          </div>

          {/* Units info */}
          <div className="flex justify-center gap-4 text-sm font-body text-gray-400">
            <span>{units} units consumed</span>
          </div>

          {/* Free slab note */}
          {units <= 100 && (
            <div className="mt-3 text-center">
              <span className="text-green-400 font-body text-sm">✓ First 100 units FREE</span>
            </div>
          )}
          {units > 500 && (
            <div className="mt-3 text-center">
              <span className="text-yellow-500 font-body text-xs">100 units free subsidy applied</span>
            </div>
          )}
        </motion.div>

        {/* TVK Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
          className="glass-card-gold rounded-2xl p-6 relative overflow-hidden"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.05) 50%, transparent 60%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-display"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)', boxShadow: '0 0 20px #FFD70066' }}
            >
              ★
            </div>
            <div>
              <div className="font-display text-xl tracking-widest text-yellow-400">TVK</div>
              <div className="text-xs text-gray-400 font-body">{t.tvkScheme}</div>
            </div>
            <div className="ml-auto">
              <span
                className="text-xs font-body px-2 py-1 rounded"
                style={{ border: '1px solid #FFD700', color: '#FFD700' }}
              >
                PROPOSED
              </span>
            </div>
          </div>

          {/* Bill amount */}
          <div className="text-center mb-4">
            <div className="text-gray-400 text-sm font-body mb-1">{t.tvkBill}</div>
            <div
              className="font-mono font-bold text-5xl md:text-6xl"
              style={{ color: '#FFD700', textShadow: '0 0 20px #FFD70066' }}
            >
              ₹<AnimatedNumber value={tvkBill} decimals={0} duration={600} />
            </div>
          </div>

          {/* Units info */}
          <div className="flex justify-center gap-4 text-sm font-body text-gray-400">
            <span>{units} units consumed</span>
          </div>

          {/* Free slab note */}
          {units <= 500 && (
            <div className="mt-3 text-center">
              <span className="text-green-400 font-body text-sm">✓ First 200 units FREE</span>
            </div>
          )}

          {above500 && (
            <div className="mt-3 text-center">
              <span className="text-orange-400 font-body text-xs">{t.noSavings}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Savings banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="rounded-2xl p-6 text-center relative overflow-hidden"
        style={{
          background: hasSavings
            ? 'linear-gradient(135deg, rgba(0,200,80,0.1) 0%, rgba(0,100,40,0.05) 100%)'
            : 'rgba(255,255,255,0.02)',
          border: hasSavings ? '1px solid rgba(0,200,80,0.3)' : '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {hasSavings && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,200,80,0.08) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">
          {/* Savings amount */}
          <div>
            <div className="text-gray-400 text-sm font-body mb-1">{t.youSave}</div>
            <div
              className="font-mono font-bold text-4xl md:text-5xl"
              style={{
                color: hasSavings ? '#00FF88' : '#666',
                textShadow: hasSavings ? '0 0 20px rgba(0,255,136,0.4)' : 'none',
              }}
            >
              ₹<AnimatedNumber value={savings} decimals={0} duration={800} />
            </div>
          </div>

          {/* VS divider */}
          <div className="hidden md:flex flex-col items-center">
            {hasSavings ? (
              <>
                <FaCheckCircle size={32} color="#00FF88" />
                <div className="text-green-400 font-body text-sm mt-2">Savings Confirmed!</div>
              </>
            ) : (
              <div className="text-gray-500 font-display text-2xl">NO SAVINGS</div>
            )}
          </div>

          {/* Percentage saved */}
          <div>
            <div className="text-gray-400 text-sm font-body mb-1">{t.percentSaved}</div>
            <div
              className="font-mono font-bold text-4xl md:text-5xl"
              style={{
                color: hasSavings ? '#00FF88' : '#666',
                textShadow: hasSavings ? '0 0 20px rgba(0,255,136,0.4)' : 'none',
              }}
            >
              <AnimatedNumber value={parseFloat(percentSaved)} decimals={1} duration={800} suffix="%" />
            </div>
          </div>
        </div>

        {above500 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-orange-400 text-sm font-body mt-4"
          >
            ⚠ {t.above500Note}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default BillCards;
