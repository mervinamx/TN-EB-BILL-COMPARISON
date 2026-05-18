/**
 * Server-side bill calculation logic (Bi-monthly)
 * Mirrors the frontend utils/calculations.js for validation
 *
 * Existing Tariff (> 500 units, 100 units free):
 *   1–100    → FREE
 *   101–400  → ₹4.70
 *   401–500  → ₹6.30
 *   501–600  → ₹8.40
 *   601–800  → ₹9.45
 *   801–1000 → ₹10.50
 *   >1000    → ₹11.55
 *
 * TVK New Scheme (≤ 500 units, 200 units free):
 *   1–200   → FREE
 *   201–400 → ₹4.70
 *   401–500 → ₹6.30
 *   > 500   → falls back to existing tariff
 */

export const calculateCurrentBill = (units) => {
  if (units <= 0) return 0;
  if (units <= 100) return 0;

  let bill = 0;

  if (units > 100) bill += Math.min(units - 100, 300) * 4.70;  // 101–400
  if (units > 400) bill += Math.min(units - 400, 100) * 6.30;  // 401–500
  if (units > 500) bill += Math.min(units - 500, 100) * 8.40;  // 501–600
  if (units > 600) bill += Math.min(units - 600, 200) * 9.45;  // 601–800
  if (units > 800) bill += Math.min(units - 800, 200) * 10.50; // 801–1000
  if (units > 1000) bill += (units - 1000) * 11.55;            // >1000

  return bill;
};

export const calculateTVKBill = (units) => {
  if (units <= 0) return 0;
  if (units <= 200) return 0;

  if (units <= 500) {
    let bill = 0;
    if (units > 200) bill += Math.min(units - 200, 200) * 4.70; // 201–400
    if (units > 400) bill += Math.min(units - 400, 100) * 6.30; // 401–500
    return bill;
  }

  return calculateCurrentBill(units);
};
