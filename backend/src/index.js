import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import billRoutes from './routes/bill.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/tneb_bill';

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10kb' }));

// Rate limiter: max 100 requests per 15 min per IP
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
}));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/bill', billRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'tneb-bill-backend',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Database + Server Start ─────────────────────────────────────────────────
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅  MongoDB connected: ${MONGO_URI}`);
  } catch (err) {
    console.warn(`⚠️  MongoDB connection failed (${err.message}). Running without DB.`);
    // Continue running without DB — calculations still work
  }

  app.listen(PORT, () => {
    console.log(`🚀  Backend running on port ${PORT}`);
  });
};

startServer();
