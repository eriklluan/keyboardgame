const assert = require("node:assert/strict");

const { createMockSupabase } = require("./helpers/mock-supabase");
const { invokeHandler, loadHandler } = require("./helpers/api-test-utils");

test("POST /api/player/join joins existing classroom and creates user", async () => {
  const mock = createMockSupabase({
    turmas: [{ id: "t1", codigo: "LAB-A", nome: "Laboratorio A" }],
  });
  const handler = loadHandler("api/player/join.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      playerId: "u1",
      username: "Erik",
      turma: "lab-a",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  const payload = res.json();

  assert.equal(res.statusCode, 200);
  assert.equal(payload.id, "u1");
  assert.equal(payload.username, "Erik");
  assert.equal(payload.turma, "LAB-A");
  assert.equal(mock.state.turmas.length, 1);
  assert.equal(mock.state.users.length, 1);
  assert.equal(mock.state.users[0].pontos, 0);
});

test("POST /api/player/join rejects unknown classroom", async () => {
  const mock = createMockSupabase();
  const handler = loadHandler("api/player/join.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      playerId: "u1",
      username: "Erik",
      turma: "lab-a",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 404);
  assert.equal(res.json().error, "Classroom not found. Ask the teacher to create it first.");
  assert.equal(mock.state.users.length, 0);
  assert.equal(mock.state.turmas.length, 0);
});

test("POST /api/player/join rejects missing turma", async () => {
  const mock = createMockSupabase();
  const handler = loadHandler("api/player/join.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      playerId: "u1",
      username: "Erik",
      turma: "",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "Classroom code is required");
});

test("POST /api/player/score accumulates points for existing user", async () => {
  const mock = createMockSupabase({
    turmas: [{ id: "t1", codigo: "LAB-A", nome: "LAB-A" }],
    users: [{ id: "u1", username: "Erik", turma: "LAB-A", pontos: 15 }],
  });

  const handler = loadHandler("api/player/score.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      playerId: "u1",
      username: "Erik",
      turma: "lab-a",
      points: 25,
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().total, 40);
  assert.equal(mock.state.users[0].pontos, 40);
});

test("POST /api/player/score rejects unknown classroom", async () => {
  const mock = createMockSupabase();

  const handler = loadHandler("api/player/score.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      playerId: "u2",
      username: "Lia",
      turma: "LAB-X",
      points: 10,
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 404);
  assert.equal(res.json().error, "Classroom not found. Ask the teacher to create it first.");
});

test("POST /api/player/score rejects player that has not joined", async () => {
  const mock = createMockSupabase({
    turmas: [{ id: "t1", codigo: "LAB-X", nome: "LAB-X" }],
  });

  const handler = loadHandler("api/player/score.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      playerId: "u2",
      username: "Lia",
      turma: "LAB-X",
      points: 10,
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 404);
  assert.equal(res.json().error, "Player not found. Join the classroom first.");
  assert.equal(mock.state.users.length, 0);
});
