import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Script } from "node:vm";

// Contract tests for the GitHub Pages standalone dashboard. Browser interaction
// is separately checked using Playwright on a mobile-sized viewport.
const html=readFileSync(join(import.meta.dirname,"../prototypes/splitcare-dashboards/index.html"),"utf8");
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
test("standalone prototype has syntactically valid JavaScript",()=>{
 assert.ok(script,"inline client script must exist");
 assert.doesNotThrow(()=>new Script(script));
});
test("member and admin dashboards remain navigable",()=>{
 for(const id of ["role","nav","screen","roleTitle","modalBody"].filter(x=>x!=="modalBody"))assert.match(html,new RegExp('id="'+id+'"'));
 for(const label of ["FAMILY ADMIN","FAMILY MEMBER","Review payments","My dashboard","Payment approvals"])assert.ok(html.includes(label),label);
});
test("prototype login never claims to authenticate",()=>{
 assert.match(html,/Preview only: sign-in not connected/);
 assert.match(html,/No credentials saved or sent/);
 assert.match(html,/No real accounts|no real accounts/i);
});
test("private Zelle recipient details remain absent",()=>{
 assert.match(html,/No recipient details in this public prototype/);
 assert.doesNotMatch(html,/\(561\)\s*385|385-5633/);
});
test("shader has graceful reduced-motion and low-power fallback",()=>{
 assert.match(html,/prefers-reduced-motion: reduce/);
 assert.match(html,/connection\?\.saveData/);
 assert.match(html,/powerPreference:"low-power"/);
 assert.match(html,/webglcontextlost/);
});
test("mobile layout guards against sideways scroll",()=>{
 assert.match(html,/overflow-x:clip/);
 assert.match(html,/max-width:830px/);
 assert.match(html,/min-width:0/);
});

test("Spin to Pay demo is accessible with preserved local monthly result",()=>{
 assert.match(html,/function wheelPage\(\)/);
 assert.match(html,/wheelSegments=\[1,2,1,0,1,3,1,2,1,1\]/);
 assert.match(html,/data-go="wheel"/);
 assert.match(html,/localStorage\.setItem\(wheelStore/);
 assert.match(html,/ONE SPIN PER PERSON PER MONTH/);
 assert.match(html,/Real SplitCare records are not changed/);
});
