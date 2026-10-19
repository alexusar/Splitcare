/** Planning-stage domain rules. Not yet integrated into the live site. Money is integer cents. */
export const WHEEL_SLICES = Object.freeze(Array.from({length:100},(_,i)=>i<10?0:i<90?1:i<99?2:3));
export function multiplierForSlice(index) {
  if (!Number.isInteger(index) || index < 0 || index >= WHEEL_SLICES.length) throw new RangeError("Invalid wheel slice index");
  return WHEEL_SLICES[index];
}
export function calculateMemberLedger(baseCents, records, targetMonth) {
  if (!Number.isSafeInteger(baseCents) || baseCents < 0) throw new RangeError("Invalid base contribution in cents");
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(targetMonth)) throw new RangeError("Invalid month");
  const byMonth = new Map();
  for (const record of records) {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(record.month)) throw new RangeError("Invalid cycle month");
    if (![0,1,2,3].includes(record.multiplier)) throw new RangeError("Invalid multiplier");
    if (byMonth.has(record.month)) throw new Error("Duplicate monthly record");
    byMonth.set(record.month, record);
  }
  if (!byMonth.has(targetMonth)) byMonth.set(targetMonth, {month:targetMonth,multiplier:1,confirmed:false});
  let availableCreditCents = 0, target = null;
  for (const month of [...byMonth.keys()].sort()) {
    const r = byMonth.get(month);
    const creditAppliedCents = r.multiplier === 0 ? 0 : Math.min(availableCreditCents, baseCents);
    const dueCents = r.multiplier * baseCents - creditAppliedCents;
    const earnedCreditCents = r.confirmed && r.multiplier > 1 ? (r.multiplier - 1) * baseCents : 0;
    if (month === targetMonth) target = {
      month, multiplier:r.multiplier, baseCents, dueCents, creditAvailableCents:availableCreditCents,
      creditAppliedCents, earnedCreditCents,
      status:r.multiplier===0?"waived":r.confirmed?"confirmed":"due"
    };
    if (r.confirmed && r.multiplier !== 0) availableCreditCents = availableCreditCents - creditAppliedCents + earnedCreditCents;
  }
  return target;
}
