import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Script } from "node:vm";
const html=readFileSync(join(import.meta.dirname,"../index.html"),"utf8");
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
test("live tracker parses and has one all-spins reset",()=>{
 assert.ok(js);
 assert.doesNotThrow(()=>new Script(js));
 assert.match(html,/id="resetAllSpins"/);
 assert.doesNotMatch(html,/id="resetCaro"|id="resetOctober"/);
});
test("editing and reset require password prompt",()=>{
 assert.match(js,/const requireAdminPassword=/);
 assert.match(js,/attempt!=="password1"/);
 assert.match(js,/if\(!edit&&!requireAdminPassword\(\)\)return/);
 assert.match(js,/resetAllSpins"\)\.onclick=\(\)=>\{/);
 assert.match(js,/if\(!requireAdminPassword\(\)\)return/);
});
test("reset removes every local spin while keeping verified payments",()=>{
 assert.match(js,/Object\.keys\(d\.spins\|\|\{\}\)/);
 assert.match(js,/delete d\.spins\[sk\]/);
 assert.match(js,/e\.verification==="waived"/);
 assert.match(js,/Manually verified payments and receipts will be kept/);
});

test("trip pot counts only paid extra from 2x and 3x spins",()=>{
 assert.match(js,/function tripExtra\(id,spin\)/);
 assert.match(js,/spin\.value<=1/);
 assert.match(js,/base\*\(spin\.value-1\)/);
 assert.match(js,/if\(d\.entries\?\.\[k\]\?\.paid\)/);
 assert.match(js,/confirmed=round\(confirmed\+extra\)/);
 assert.match(js,/pending=round\(pending\+extra\)/);
 assert.match(html,/id="tripTotal"/);
 assert.match(html,/id="tripFill"/);
 assert.match(html,/id="tripGoal"/);
});
