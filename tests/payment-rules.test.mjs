import test from "node:test";
import assert from "node:assert/strict";
import { WHEEL_SLICES, multiplierForSlice, calculateMemberLedger } from "../src/payment-rules.mjs";

test("wheel keeps 10% free, 60% 1x, 20% 2x, and 10% 3x", () => {
  const counts=WHEEL_SLICES.reduce((acc,v)=>({...acc,[v]:(acc[v]||0)+1}),{});
  assert.deepEqual(counts,{0:1,1:6,2:2,3:1});
  assert.equal(multiplierForSlice(3),0);
  assert.equal(multiplierForSlice(5),3);
  assert.throws(()=>multiplierForSlice(10),RangeError);
});
test("3x payment pending creates no credit", () => {
  const x=calculateMemberLedger(1000,[{month:"2026-10",multiplier:3,confirmed:false}],"2026-10");
  assert.deepEqual([x.dueCents,x.earnedCreditCents,x.status],[3000,0,"due"]);
});
test("confirmed 3x creates $20 in credit, covering two $10 months", () => {
  const rows=[{month:"2026-10",multiplier:3,confirmed:true},{month:"2026-11",multiplier:1,confirmed:true},{month:"2026-12",multiplier:1,confirmed:false}];
  const nov=calculateMemberLedger(1000,rows,"2026-11"),dec=calculateMemberLedger(1000,rows,"2026-12");
  assert.deepEqual([nov.creditAvailableCents,nov.creditAppliedCents,nov.dueCents],[2000,1000,0]);
  assert.deepEqual([dec.creditAvailableCents,dec.creditAppliedCents,dec.dueCents],[1000,1000,0]);
});
test("pending month does not consume previous credit", () => {
  const rows=[{month:"2026-10",multiplier:3,confirmed:true},{month:"2026-11",multiplier:1,confirmed:false},{month:"2026-12",multiplier:1,confirmed:false}];
  assert.equal(calculateMemberLedger(1000,rows,"2026-12").creditAvailableCents,2000);
});
test("free month is waived; does not consume credit", () => {
  const rows=[{month:"2026-10",multiplier:3,confirmed:true},{month:"2026-11",multiplier:0,confirmed:true},{month:"2026-12",multiplier:1,confirmed:false}];
  const nov=calculateMemberLedger(1000,rows,"2026-11");
  assert.deepEqual([nov.dueCents,nov.creditAppliedCents,nov.status],[0,0,"waived"]);
  assert.equal(calculateMemberLedger(1000,rows,"2026-12").creditAvailableCents,2000);
});
test("rejects duplicate cycle and negative contribution", () => {
  const rows=[{month:"2026-10",multiplier:1,confirmed:true},{month:"2026-10",multiplier:3,confirmed:false}];
  assert.throws(()=>calculateMemberLedger(1000,rows,"2026-10"),/Duplicate/);
  assert.throws(()=>calculateMemberLedger(-100,[],"2026-10"),RangeError);
});
