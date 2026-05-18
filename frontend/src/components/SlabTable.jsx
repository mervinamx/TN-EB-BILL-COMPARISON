import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '../utils/lang';
import { getSlabBreakdown, getTVKSlabBreakdown, formatCurrency } from '../utils/calculations';

const SlabTable = ({ units, dmkBill, tvkBill }) => {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState('dmk');

  const dmkSlabs = getSlabBreakdown(units);
  const tvkSlabs = getTVKSlabBreakdown(units);
  const slabs = activeTab === 'dmk' ? dmkSlabs : tvkSlabs;
  const totalBill = activeTab === 'dmk' ? dmkBill : tvkBill;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 mt-6"
    >
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Tab header */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('dmk')}
            className={`flex-1 py-4 font-body font-semibold text-sm tracking-wider transition-all duration-300
              ${activeTab === 'dmk'
                ? 'bg-red-900/30 text-red-400 border-b-2 border-red-500'
                : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            🔴 DMK — {t.currentTariff}
          </button>
          <button
            onClick={() => setActiveTab('tvk')}
            className={`flex-1 py-4 font-body font-semibold text-sm tracking-wider transition-all duration-300
              ${activeTab === 'tvk'
                ? 'bg-yellow-900/30 text-yellow-400 border-b-2 border-yellow-500'
                : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            🟡 TVK — {t.tvkScheme}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 text-xs font-body uppercase tracking-wider">
                  {t.slab}
                </th>
                <th className="text-center py-3 px-4 text-gray-400 text-xs font-body uppercase tracking-wider">
                  {t.units}
                </th>
                <th className="text-center py-3 px-4 text-gray-400 text-xs font-body uppercase tracking-wider">
                  {t.rate}
                </th>
                <th className="text-right py-3 px-4 text-gray-400 text-xs font-body uppercase tracking-wider">
                  {t.amount}
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {slabs.map((slab, i) => (
                  <motion.tr
                    key={`${activeTab}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-300 font-body text-sm">
                      {slab.label}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-sm text-gray-200">
                      {slab.units}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-sm">
                      {slab.isFree ? (
                        <span className="text-green-400 font-bold">{t.free}</span>
                      ) : (
                        <span className="text-gray-200">₹{slab.rate}/unit</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-sm">
                      {slab.isFree ? (
                        <span className="text-green-400">₹0</span>
                      ) : (
                        <span
                          style={{ color: activeTab === 'dmk' ? '#FF6666' : '#FFD700' }}
                        >
                          ₹{slab.amount.toFixed(0)}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
            <tfoot>
              <tr className="border-t border-white/20">
                <td colSpan={3} className="py-4 px-4 text-right font-body font-semibold text-gray-300">
                  {t.total}
                </td>
                <td className="py-4 px-4 text-right font-mono font-bold text-xl"
                  style={{
                    color: activeTab === 'dmk' ? '#FF4444' : '#FFD700',
                    textShadow: activeTab === 'dmk' ? '0 0 10px #CC000066' : '0 0 10px #FFD70066',
                  }}
                >
                  ₹{totalBill.toFixed(0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default SlabTable;
