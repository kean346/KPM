import assert from "node:assert/strict";
import { test } from "node:test";
import {
  seed,
  example,
  estimate,
  totals,
  submit,
  createQuote,
  confirmBooking,
  configSchema,
} from "../src/lib/model";
test("acceptance journey retains selections, snapshot, relationships and idempotent booking", () => {
  const d = seed(),
    id = submit(d, example);
  const e = d.enquiries.find((e) => e.id === id)!;
  assert.equal(e.estimate, 390000);
  assert.equal(e.config.date, "2026-11-21");
  assert.equal(e.config.balloons, false);
  const qid = createQuote(d, id);
  assert.equal(createQuote(d, id), qid);
  const q = d.quotes.find((q) => q.id === qid)!;
  q.items[0].price = 275000;
  assert.equal(totals(q.items), 415000);
  assert.equal(e.estimate, 390000);
  assert.throws(() => confirmBooking(d, qid));
  q.status = "Accepted";
  const bid = confirmBooking(d, qid);
  assert.equal(confirmBooking(d, qid), bid);
  assert.equal(d.bookings.length, 1);
  assert.equal(d.bookings[0].enquiryId, id);
  assert.equal(d.bookings[0].total, 415000);
  assert.equal(e.status, "Booked");
  assert.ok(d.clients.some((c) => c.id === e.clientId));
  const restored = JSON.parse(JSON.stringify(d));
  assert.equal(restored.bookings[0].id, bid);
});
test("pricing toggles and integer-cent tax/discount calculation", () => {
  const d = seed();
  assert.equal(
    totals(
      estimate({ ...example, flowers: false, candles: false }, d.packages),
    ),
    250000,
  );
  assert.equal(
    totals([{ name: "a", qty: 2, price: 10001 }], 1000, 500, 15),
    23577,
  );
});
test("validation rejects incomplete submissions", () => {
  assert.equal(
    configSchema.safeParse({ ...example, email: "bad", consent: false })
      .success,
    false,
  );
});
test("catalogue edits affect future estimates but not old snapshots", () => {
  const d = seed();
  const id = submit(d, example);
  d.packages[0].price = 500000;
  assert.equal(totals(estimate(example, d.packages)), 640000);
  assert.equal(d.enquiries.find((e) => e.id === id)!.estimate, 390000);
});
test("disabled catalogue services cannot be submitted from a stale draft", () => {
  const d = seed();
  d.packages.find((p) => p.name === "Floral styling")!.enabled = false;
  assert.throws(() => submit(d, example), /no longer available/);
  assert.equal(d.enquiries.length, 1);
});
