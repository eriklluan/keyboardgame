const assert = require("node:assert/strict");

const { createMockSupabase } = require("./helpers/mock-supabase");
const { invokeHandler, loadHandler } = require("./helpers/api-test-utils");

test("GET /api/rankings returns ordered global ranking", async () => {
  const mock = createMockSupabase({
    users: [
      { id: "u1", username: "A", turma: "LAB-A", pontos: 30 },
      { id: "u2", username: "B", turma: "LAB-B", pontos: 60 },
      { id: "u3", username: "C", turma: "LAB-A", pontos: 10 },
    ],
  });

  const handler = loadHandler("api/rankings.js", {
    getSupabaseAdmin: () => mock,
  });

  const res = await invokeHandler(handler, { method: "GET", query: {} });
  const payload = res.json();

  assert.equal(res.statusCode, 200);
  assert.equal(payload.global.length, 3);
  assert.deepEqual(
    payload.global.map((u) => u.id),
    ["u2", "u1", "u3"],
  );
});

test("GET /api/rankings filters classroom when turma provided", async () => {
  const mock = createMockSupabase({
    users: [
      { id: "u1", username: "A", turma: "LAB-A", pontos: 30 },
      { id: "u2", username: "B", turma: "LAB-B", pontos: 60 },
      { id: "u3", username: "C", turma: "LAB-A", pontos: 10 },
    ],
  });

  const handler = loadHandler("api/rankings.js", {
    getSupabaseAdmin: () => mock,
  });

  const res = await invokeHandler(handler, {
    method: "GET",
    query: { turma: "lab-a" },
  });
  const payload = res.json();

  assert.equal(res.statusCode, 200);
  assert.equal(payload.turma.length, 2);
  assert.deepEqual(
    payload.turma.map((u) => u.id),
    ["u1", "u3"],
  );
});

test("GET /api/rankings rejects non-GET", async () => {
  const mock = createMockSupabase();
  const handler = loadHandler("api/rankings.js", {
    getSupabaseAdmin: () => mock,
  });

  const res = await invokeHandler(handler, { method: "POST", query: {} });
  assert.equal(res.statusCode, 405);
  assert.equal(res.json().error, "Method not allowed");
});
