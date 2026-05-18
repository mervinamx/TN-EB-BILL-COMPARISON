import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    title: 'TN EB Bill Comparison',
    subtitle: 'DMK Current Tariff vs TVK 200-Units Free Scheme',
    heroDesc: 'Enter your monthly electricity consumption and instantly see how much you save under the TVK proposed scheme.',
    inputLabel: 'Enter Units Consumed',
    inputPlaceholder: 'e.g. 350',
    calculate: 'Calculate Bill',
    reset: 'Reset',
    currentTariff: 'Current Tariff',
    tvkScheme: 'TVK Scheme',
    youSave: 'You Save',
    percentSaved: '% Saved',
    dmkBill: 'DMK Bill Amount',
    tvkBill: 'TVK Bill Amount',
    slabBreakdown: 'Slab Breakdown',
    slab: 'Slab',
    units: 'Units',
    rate: 'Rate',
    amount: 'Amount',
    free: 'FREE',
    total: 'Total',
    chartTitle: 'Bill Comparison Chart',
    savings: 'Savings',
    exportPDF: 'Export PDF',
    share: 'Share',
    noSavings: 'No additional savings above 500 units',
    above500Note: 'Above 500 units: TVK scheme = Current tariff (no extra benefit)',
    unitsLabel: 'Units',
    amountLabel: '₹ Amount',
    darkMode: 'Dark',
    lightMode: 'Light',
    tamil: 'தமிழ்',
    english: 'English',
    monthlyUnits: 'Monthly Units',
    perUnit: '/unit',
    billFor: 'Bill for',
  },
  ta: {
    title: 'TN மின்சார கட்டண ஒப்பீடு',
    subtitle: 'DMK தற்போதைய கட்டணம் vs TVK 200 யூனிட் இலவச திட்டம்',
    heroDesc: 'உங்கள் மாதாந்திர மின்சார பயன்பாட்டை உள்ளிடுங்கள், TVK திட்டத்தில் எவ்வளவு சேமிக்கலாம் என்பதை உடனடியாக அறியுங்கள்.',
    inputLabel: 'பயன்படுத்திய யூனிட்களை உள்ளிடுங்கள்',
    inputPlaceholder: 'எ.கா. 350',
    calculate: 'கட்டணம் கணக்கிடு',
    reset: 'மீட்டமை',
    currentTariff: 'தற்போதைய கட்டணம்',
    tvkScheme: 'TVK திட்டம்',
    youSave: 'நீங்கள் சேமிக்கிறீர்கள்',
    percentSaved: '% சேமிப்பு',
    dmkBill: 'DMK கட்டண தொகை',
    tvkBill: 'TVK கட்டண தொகை',
    slabBreakdown: 'கட்டண விவரம்',
    slab: 'படி',
    units: 'யூனிட்',
    rate: 'விலை',
    amount: 'தொகை',
    free: 'இலவசம்',
    total: 'மொத்தம்',
    chartTitle: 'கட்டண ஒப்பீடு விளக்கப்படம்',
    savings: 'சேமிப்பு',
    exportPDF: 'PDF ஏற்றுமதி',
    share: 'பகிர்',
    noSavings: '500 யூனிட்டுக்கு மேல் கூடுதல் சேமிப்பு இல்லை',
    above500Note: '500 யூனிட்டுக்கு மேல்: TVK திட்டம் = தற்போதைய கட்டணம்',
    unitsLabel: 'யூனிட்',
    amountLabel: '₹ தொகை',
    darkMode: 'இருள்',
    lightMode: 'ஒளி',
    tamil: 'தமிழ்',
    english: 'English',
    monthlyUnits: 'மாதாந்திர யூனிட்',
    perUnit: '/யூனிட்',
    billFor: 'கட்டணம்',
  }
};

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const toggle = () => setLang(l => l === 'en' ? 'ta' : 'en');

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
