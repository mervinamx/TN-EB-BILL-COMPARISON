/**
 * Tamil Nadu EB Bill Calculation Logic (Bi-monthly)
 *
 * ── For consumers using ≤ 500 units (TVK New Scheme — 200 free units) ──
 *   1 – 200  → FREE
 *   201–400  → ₹4.70 / unit
 *   401–500  → ₹6.30 / unit
 *
 * ── For consumers using > 500 units (Existing Tariff — 100 free units) ──
 *   1 – 100   → FREE
 *   101–400   → ₹4.70 / unit
 *   401–500   → ₹6.30 / unit
 *   501–600   → ₹8.40 / unit
 *   601–800   → ₹9.45 / unit
 *   801–1000  → ₹10.50 / unit
 *   Above 1000 → ₹11.55 / unit
 */

// ── Existing Tariff (above-500 consumers, 100 units free) ─────────────────
export const calculateCurrentBill = (units) => {
  if (units <= 0) return 0;
  if (units <= 100) return 0; // first 100 FREE

  let bill = 0;

  // 101 – 400  → ₹4.70
  if (units > 100) {
    const u = Math.min(units - 100, 300);
    bill += u * 4.70;
  }

  // 401 – 500  → ₹6.30
  if (units > 400) {
    const u = Math.min(units - 400, 100);
    bill += u * 6.30;
  }

  // 501 – 600  → ₹8.40
  if (units > 500) {
    const u = Math.min(units - 500, 100);
    bill += u * 8.40;
  }

  // 601 – 800  → ₹9.45
  if (units > 600) {
    const u = Math.min(units - 600, 200);
    bill += u * 9.45;
  }

  // 801 – 1000 → ₹10.50
  if (units > 800) {
    const u = Math.min(units - 800, 200);
    bill += u * 10.50;
  }

  // Above 1000 → ₹11.55
  if (units > 1000) {
    bill += (units - 1000) * 11.55;
  }

  return bill;
};

// ── TVK New Scheme (≤ 500 units: 200 free; > 500: existing tariff) ─────────
export const calculateTVKBill = (units) => {
  if (units <= 0) return 0;
  if (units <= 200) return 0; // first 200 FREE

  if (units <= 500) {
    let bill = 0;

    // 201–400 → ₹4.70
    if (units > 200) {
      const u = Math.min(units - 200, 200);
      bill += u * 4.70;
    }

    // 401–500 → ₹6.30
    if (units > 400) {
      const u = Math.min(units - 400, 100);
      bill += u * 6.30;
    }

    return bill;
  }

  // Above 500 → falls back to existing tariff (100 units free)
  return calculateCurrentBill(units);
};

// ── Slab breakdown for existing tariff (> 500 consumers) ──────────────────
export const getSlabBreakdown = (units) => {
  const slabs = [];
  if (units <= 0) return slabs;

  slabs.push({
    label: '1 – 100 units',
    units: Math.min(units, 100),
    rate: 0,
    amount: 0,
    isFree: true,
  });

  if (units > 100) {
    const u = Math.min(units - 100, 300);
    slabs.push({ label: '101 – 400 units', units: u, rate: 4.70, amount: u * 4.70, isFree: false });
  }
  if (units > 400) {
    const u = Math.min(units - 400, 100);
    slabs.push({ label: '401 – 500 units', units: u, rate: 6.30, amount: u * 6.30, isFree: false });
  }
  if (units > 500) {
    const u = Math.min(units - 500, 100);
    slabs.push({ label: '501 – 600 units', units: u, rate: 8.40, amount: u * 8.40, isFree: false });
  }
  if (units > 600) {
    const u = Math.min(units - 600, 200);
    slabs.push({ label: '601 – 800 units', units: u, rate: 9.45, amount: u * 9.45, isFree: false });
  }
  if (units > 800) {
    const u = Math.min(units - 800, 200);
    slabs.push({ label: '801 – 1000 units', units: u, rate: 10.50, amount: u * 10.50, isFree: false });
  }
  if (units > 1000) {
    const u = units - 1000;
    slabs.push({ label: 'Above 1000 units', units: u, rate: 11.55, amount: u * 11.55, isFree: false });
  }

  return slabs;
};

// ── TVK slab breakdown ─────────────────────────────────────────────────────
export const getTVKSlabBreakdown = (units) => {
  if (units <= 0) return [];

  if (units <= 500) {
    const slabs = [];

    slabs.push({
      label: '1 – 200 units (FREE)',
      units: Math.min(units, 200),
      rate: 0,
      amount: 0,
      isFree: true,
    });

    if (units > 200) {
      const u = Math.min(units - 200, 200);
      slabs.push({ label: '201 – 400 units', units: u, rate: 4.70, amount: u * 4.70, isFree: false });
    }
    if (units > 400) {
      const u = Math.min(units - 400, 100);
      slabs.push({ label: '401 – 500 units', units: u, rate: 6.30, amount: u * 6.30, isFree: false });
    }

    return slabs;
  }

  // Above 500 → same slabs as existing tariff
  return getSlabBreakdown(units);
};

export const getChartData = (units) => {
  const points = [];
  const step = Math.max(10, Math.ceil(units / 20));

  for (let u = 0; u <= units + step; u += step) {
    const dmk = calculateCurrentBill(u);
    const tvk = calculateTVKBill(u);
    points.push({
      units: u,
      DMK: dmk,
      TVK: tvk,
      Savings: Math.max(0, dmk - tvk),
    });
  }

  return points;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
