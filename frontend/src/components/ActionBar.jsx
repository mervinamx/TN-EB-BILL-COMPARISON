import { motion } from 'framer-motion';
import { FaFilePdf, FaShareAlt, FaWhatsapp, FaDownload } from 'react-icons/fa';
import { useLang } from '../utils/lang';
import toast from 'react-hot-toast';

const ActionBar = ({ units, dmkBill, tvkBill }) => {
  const { t } = useLang();
  const savings = Math.max(0, dmkBill - tvkBill);

  const handleExportPDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');

      toast.loading('Generating PDF...', { id: 'pdf' });

      const element = document.getElementById('bill-result');
      if (!element) {
        toast.error('No result to export yet', { id: 'pdf' });
        return;
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#0d0d0d',
        scale: 2,
        logging: false,
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.setFillColor(13, 13, 13);
      pdf.rect(0, 0, 210, 297, 'F');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 20, imgWidth, imgHeight);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Tamil Nadu EB Bill Comparison | DMK vs TVK', 10, 290);
      pdf.save(`TN-EB-Bill-${units}units.pdf`);

      toast.success('PDF exported!', { id: 'pdf' });
    } catch (err) {
      console.error(err);
      toast.error('PDF export failed', { id: 'pdf' });
    }
  };

  const shareText = `⚡ TN EB Bill Comparison\n\n📊 Units: ${units}\n🔴 DMK Bill: ₹${dmkBill}\n🟡 TVK Bill: ₹${tvkBill}\n💚 Savings: ₹${savings}\n\nCalculate yours at: ${window.location.href}`;

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TN EB Bill Comparison',
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success('Copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 mt-6"
    >
      <div className="flex flex-wrap justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-body font-semibold text-sm
                     bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-900/50 transition-all"
        >
          <FaFilePdf /> {t.exportPDF}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-body font-semibold text-sm
                     bg-green-900/30 text-green-400 border border-green-800 hover:bg-green-900/50 transition-all"
        >
          <FaWhatsapp /> WhatsApp
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-body font-semibold text-sm
                     bg-blue-900/30 text-blue-400 border border-blue-800 hover:bg-blue-900/50 transition-all"
        >
          <FaShareAlt /> {t.share}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ActionBar;
