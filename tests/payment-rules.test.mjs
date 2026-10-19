import test from "node:test";
import assert from "node:assert/strict";
import { WHEEL_SLICES, multiplierForSlice, calculateMemberLedger } from "../src/payment-rules.mjs";

test("wheel keeps 10% free, 80% 1x, 9% 2x, and 1% 3x", () => {
  const counts=WHEEL_SLICES.reduce((acc,v)=>({...acc,[v]:(acc[v]||0)+1}),{});
  assert.deepEqual(counts,{0:10,1:80,2:9,3:1});
  assert.equal(multiplierForSlice(3),0);
  assert.equal(multiplierForSlice(99),3);
  assert.throws(()=>multiplierForSlice(100),RangeError);
});
test("3x payment is owed in full whether pending or confirmed", () => {
  for(const confirmed of [false,true]){
    const x=calculateMemberLedger(1000,[{month:"2026-10",multiplier:3,confirmed}],"2026-10");
    assert.equal(x.dueCents,3000);
    assert.equal(x.status,confirmed?"confirmed":"due");
  }
});
test("previous 2x or 3x payments never discount later months", () => {
  const rows=[{month:"2026-10",multiplier:3,confirmed:true},{month:"2026-11",multiplier:2,confirmed:true},{month:"2026-12",multiplier:1,confirmed:false}];
  assert.equal(calculateMemberLedger(1000,rows,"2026-10").dueCents,3000);
  assert.equal(calculateMemberLedger(1000,rows,"2026-11").dueCents,2000);
  assert.equal(calculateMemberLedger(1000,rows,"2026-12").dueCents,1000);
});
test("free month is waived; next month owes full normal amount", () => {
  const rows=[{month:"2026-10",multiplier:0,confirmed:true},{month:"2026-11",multiplier:1,confirmed:false}];
  assert.deepEqual([calculateMemberLedger(1000,rows,"2026-10").dueCents,calculateMemberLedger(1000,rows,"2026-10").status],[0,"waived"]);
  assert.equal(calculateMemberLedger(1000,rows,"2026-11").dueCents,1000);
});
test("rejects duplicate cycle and negative contribution", () => {
  const rows=[{month:"2026-10",multiplier:1,confirmed:true},{month:"2026-10",multiplier:3,confirmed:false}];
  assert.throws(()=>calculateMemberLedger(1000,rows,"2026-10"),/Duplicate/);
  assert.throws(()=>calculateMemberLedger(-100,[],"2026-10"),RangeError);
});
