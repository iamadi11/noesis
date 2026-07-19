// ponytail: one runnable check for the janitor's only branchy logic (column mapping).
// Run: node lib/columns.test.ts   (Node 22.18+/24 strips TS types natively)
import assert from "node:assert";
import { assembleAddress, normalizeQuery } from "./columns.ts";

// single full-address column is preferred verbatim
assert.equal(assembleAddress({ location: "1600 Pennsylvania Ave NW, Washington DC" }).address,
  "1600 Pennsylvania Ave NW, Washington DC");

// assembled from parts, in order, skipping blanks
assert.equal(
  assembleAddress({ Street: "5 Elm St", City: "Boston", State: "MA", Zip: "02110" }).address,
  "5 Elm St, Boston, MA, 02110");

// header synonyms + mixed case/underscores
assert.equal(
  assembleAddress({ address1: "9 Oak", town: "Reno", province: "NV", postal_code: "89501" }).address,
  "9 Oak, Reno, NV, 89501");

// exact "st" matches state, does NOT grab "street"
assert.equal(assembleAddress({ st: "CA", street: "1 A St" }).parts.state, "CA");
assert.equal(assembleAddress({ st: "CA", street: "1 A St" }).parts.street, "1 A St");

// no recognizable address fields -> empty (row will be flagged unmapped, never dropped)
assert.equal(assembleAddress({ policy_id: "X9", premium: 1200 }).address, "");

// cache key is stable across whitespace/case
assert.equal(normalizeQuery("  5 Elm  St ,  Boston "), "5 elm st , boston");

console.log("columns.test.ts: all assertions passed");
