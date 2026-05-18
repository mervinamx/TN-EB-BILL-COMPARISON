import mongoose from 'mongoose';

const billCalculationSchema = new mongoose.Schema(
  {
    units: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    dmkBill: {
      type: Number,
      required: true,
      min: 0,
    },
    tvkBill: {
      type: Number,
      required: true,
      min: 0,
    },
    savings: {
      type: Number,
      required: true,
      min: 0,
    },
    percentSaved: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    userAgent: {
      type: String,
      default: '',
    },
    ip: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for analytics queries
billCalculationSchema.index({ units: 1 });
billCalculationSchema.index({ createdAt: -1 });

const BillCalculation = mongoose.model('BillCalculation', billCalculationSchema);

export default BillCalculation;
