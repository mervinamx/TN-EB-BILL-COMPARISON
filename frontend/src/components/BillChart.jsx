import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { useLang } from '../utils/lang';
import { getChartData } from '../utils/calculations';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-white/20">
        <p className="text-gray-300 font-body text-sm mb-2">{label} units</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-mono">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-gray-400">{entry.name}:</span>
            <span style={{ color: entry.color }} className="font-bold">₹{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BillChart = ({ units }) => {
  const { t } = useLang();
  const [chartType, setChartType] = useState('bar');
  const data = getChartData(units);

  const chartTypes = [
    { id: 'bar', label: 'Bar' },
    { id: 'area', label: 'Area' },
    { id: 'line', label: 'Line' },
  ];

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 20, left: 10, bottom: 5 },
    };

    const axes = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="units"
          stroke="#555"
          tick={{ fill: '#888', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          label={{ value: 'Units', position: 'insideBottom', offset: -2, fill: '#666', fontSize: 12 }}
        />
        <YAxis
          stroke="#555"
          tick={{ fill: '#888', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          tickFormatter={(v) => `₹${v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 14, paddingTop: 12 }}
        />
      </>
    );

    if (chartType === 'bar') {
      return (
        <BarChart {...commonProps}>
          {axes}
          <Bar dataKey="DMK" fill="#CC0000" radius={[4, 4, 0, 0]} opacity={0.85}
            style={{ filter: 'drop-shadow(0 0 4px #CC000088)' }} />
          <Bar dataKey="TVK" fill="#FFD700" radius={[4, 4, 0, 0]} opacity={0.85}
            style={{ filter: 'drop-shadow(0 0 4px #FFD70088)' }} />
          <Bar dataKey="Savings" fill="#00FF88" radius={[4, 4, 0, 0]} opacity={0.7} />
        </BarChart>
      );
    }

    if (chartType === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="dmkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#CC0000" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#CC0000" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="tvkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD700" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF88" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
            </linearGradient>
          </defs>
          {axes}
          <Area type="monotone" dataKey="DMK" stroke="#CC0000" fill="url(#dmkGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="TVK" stroke="#FFD700" fill="url(#tvkGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="Savings" stroke="#00FF88" fill="url(#savGrad)" strokeWidth={2} />
        </AreaChart>
      );
    }

    return (
      <LineChart {...commonProps}>
        {axes}
        <Line type="monotone" dataKey="DMK" stroke="#CC0000" strokeWidth={2.5} dot={false}
          style={{ filter: 'drop-shadow(0 0 3px #CC0000)' }} />
        <Line type="monotone" dataKey="TVK" stroke="#FFD700" strokeWidth={2.5} dot={false}
          style={{ filter: 'drop-shadow(0 0 3px #FFD700)' }} />
        <Line type="monotone" dataKey="Savings" stroke="#00FF88" strokeWidth={2} dot={false} strokeDasharray="5 3" />
      </LineChart>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 mt-6"
    >
      <div className="glass-card rounded-2xl p-6">
        {/* Chart header */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <h3 className="font-display text-xl tracking-widest text-gray-200">
            {t.chartTitle}
          </h3>
          {/* Chart type toggle */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1">
            {chartTypes.map(ct => (
              <button
                key={ct.id}
                onClick={() => setChartType(ct.id)}
                className={`px-3 py-1.5 rounded text-sm font-body transition-all duration-200
                  ${chartType === ct.id
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                {ct.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend labels */}
        <div className="flex flex-wrap gap-4 mb-4">
          {[
            { color: '#CC0000', label: 'DMK Tariff', glow: '#CC000066' },
            { color: '#FFD700', label: 'TVK Scheme', glow: '#FFD70066' },
            { color: '#00FF88', label: 'Savings', glow: '#00FF8866' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-sm font-body text-gray-400">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: l.color, boxShadow: `0 0 6px ${l.glow}` }}
              />
              {l.label}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Current unit marker */}
        <div className="mt-4 text-center text-sm font-body text-gray-500">
          Showing bill progression from 0 to{' '}
          <span className="text-yellow-400 font-mono font-bold">{units} units</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BillChart;
