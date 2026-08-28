import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { LangProvider } from './utils/lang';
import { calculateCurrentBill, calculateTVKBill } from './utils/calculations';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import UnitInput from './components/UnitInput';
import BillCards from './components/BillCards';
import SlabTable from './components/SlabTable';
import BillChart from './components/BillChart';
import ActionBar from './components/ActionBar';
import Footer from './components/Footer';

function App() {
  const [units, setUnits] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('tneb-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('tneb-theme', darkMode ? 'dark' : 'light');
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const dmkBill = units !== null ? calculateCurrentBill(units) : 0;
  const tvkBill = units !== null ? calculateTVKBill(units) : 0;

  const handleCalculate = async (val) => {
  setUnits(val);

  // Don't send empty/zero values
  if (val === null || val <= 0) {
    return;
  }

  try {
    const response = await fetch('/api/bill/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        units: val,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Bill API error:', data);
      return;
    }

    console.log('✅ Bill saved to MongoDB:', data);
  } catch (error) {
    console.error('❌ Backend connection error:', error);
  }
};

  return (
    <LangProvider>
      <div
        className={`theme-shell ${darkMode ? 'theme-dark' : 'theme-light'}`}
        style={{ minHeight: '100vh', transition: 'background-color 0.3s ease, color 0.3s ease' }}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: darkMode ? '#1a1a1a' : '#f8fafc', color: darkMode ? '#fff' : '#111827', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)'}` },
          }}
        />

        {/* Particles */}
        <ParticleBackground />

        {/* Global gradient overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 40% at 20% 20%, rgba(204,0,0,0.04) 0%, transparent 60%), ' +
              'radial-gradient(ellipse 80% 40% at 80% 20%, rgba(255,215,0,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10">
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} />

          <main>
            <HeroSection />
            <UnitInput onCalculate={handleCalculate} />

            <AnimatePresence>
              {units !== null && units > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <BillCards units={units} dmkBill={dmkBill} tvkBill={tvkBill} />
                  <SlabTable units={units} dmkBill={dmkBill} tvkBill={tvkBill} />
                  <BillChart units={units} />
                  <ActionBar units={units} dmkBill={dmkBill} tvkBill={tvkBill} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </div>
    </LangProvider>
  );
}

export default App;
