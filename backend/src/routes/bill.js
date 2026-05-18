import { Router } from 'express';
import BillCalculation from '../models/BillCalculation.js';
import { calculateCurrentBill, calculateTVKBill } from '../controllers/calculations.js';

const router = Router();

/**
 * POST /api/bill/calculate
 * Body: { units: number }
 * Returns: { units, dmkBill, tvkBill, savings, percentSaved }
 */
router.post('/calculate', async (req, res) => {
  try {
    const { units } = req.body;

    // Validate
    if (units === undefined || units === null) {
      return res.status(400).json({ error: 'units is required' });
    }

    const u = parseInt(units, 10);
    if (isNaN(u) || u < 0 || u > 99999) {
      return res.status(400).json({ error: 'units must be between 0 and 99999' });
    }

    const dmkBill = calculateCurrentBill(u);
    const tvkBill = calculateTVKBill(u);
    const savings = Math.max(0, dmkBill - tvkBill);
    const percentSaved = dmkBill > 0 ? parseFloat(((savings / dmkBill) * 100).toFixed(2)) : 0;

    const result = { units: u, dmkBill, tvkBill, savings, percentSaved };

    // Save to DB (non-blocking)
    BillCalculation.create({
      ...result,
      userAgent: req.headers['user-agent'] || '',
      ip: req.ip || '',
    }).catch(() => {}); // silently ignore DB errors

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('Calculate error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/bill/stats
 * Returns basic analytics: total calculations, avg units, most common range
 */
router.get('/stats', async (req, res) => {
  try {
    const [total, avgResult] = await Promise.all([
      BillCalculation.countDocuments(),
      BillCalculation.aggregate([
        {
          $group: {
            _id: null,
            avgUnits: { $avg: '$units' },
            avgSavings: { $avg: '$savings' },
            totalSavings: { $sum: '$savings' },
          },
        },
      ]),
    ]);

    const stats = avgResult[0] || { avgUnits: 0, avgSavings: 0, totalSavings: 0 };

    return res.json({
      success: true,
      data: {
        totalCalculations: total,
        avgUnits: Math.round(stats.avgUnits || 0),
        avgSavings: Math.round(stats.avgSavings || 0),
        totalSavings: Math.round(stats.totalSavings || 0),
      },
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/bill/history?limit=10
 * Returns recent calculations
 */
router.get('/history', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '10'), 50);
    const records = await BillCalculation.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('units dmkBill tvkBill savings percentSaved createdAt')
      .lean();

    return res.json({ success: true, data: records });
  } catch (err) {
    console.error('History error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
