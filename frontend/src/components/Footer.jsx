import { FaBolt, FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer className="border-t border-white/5 mt-16 py-8 text-center">
    <div className="flex items-center justify-center gap-2 mb-2">
      <FaBolt className="text-yellow-400" size={14} />
      <span className="font-display text-sm tracking-widest text-gray-400">TN EB BILL COMPARISON</span>
    </div>
    <p className="text-gray-600 text-xs font-body">
      Unofficial comparison tool. Tariff data based on publicly available TN EB rates.
    </p>
    <p className="text-gray-700 text-xs font-body mt-1">
      Not affiliated with any political party. For informational purposes only.
    </p>
  </footer>
);

export default Footer;
