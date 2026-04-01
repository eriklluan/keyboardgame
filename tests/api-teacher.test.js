const assert = require("node:assert/strict");

const { createMockSupabase } = require("./helpers/mock-supabase");
const { invokeHandler, loadHandler } = require("./helpers/api-test-utils");

test("POST /api/teacher/classroom creates classroom", async () => {
  const mock = createMockSupabase();
  process.env.TEACHER_ACCESS_KEY = "";

  const handler = loadHandler("api/teacher/classroom.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      codigo: "lab-c",
      nome: "Laboratorio C",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  const payload = res.json();

  assert.equal(res.statusCode, 200);
  assert.equal(payload.codigo, "LAB-C");
  assert.equal(payload.nome, "Laboratorio C");
  assert.equal(mock.state.turmas.length, 1);
});

test("POST /api/teacher/reset enforces teacher key when configured", async () => {
  const mock = createMockSupabase({
    users: [
      { id: "u1", username: "A", turma: "LAB-A", pontos: 30 },
      { id: "u2", username: "B", turma: "LAB-A", pontos: 10 },
    ],
  });
  process.env.TEACHER_ACCESS_KEY = "secret-key";

  const handler = loadHandler("api/teacher/reset.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      codigo: "LAB-A",
      teacherKey: "wrong-key",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 401);
  assert.equal(res.json().error, "Invalid teacher key");
});

test("POST /api/teacher/reset clears class scores", async () => {
  const mock = createMockSupabase({
    users: [
      { id: "u1", username: "A", turma: "LAB-A", pontos: 30 },
      { id: "u2", username: "B", turma: "LAB-A", pontos: 10 },
      { id: "u3", username: "C", turma: "LAB-B", pontos: 99 },
    ],
  });
  process.env.TEACHER_ACCESS_KEY = "";

  const handler = loadHandler("api/teacher/reset.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      codigo: "lab-a",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().ok, true);

  const labA = mock.state.users.filter((u) => u.turma === "LAB-A");
  const labB = mock.state.users.find((u) => u.turma === "LAB-B");
  assert.deepEqual(
    labA.map((u) => u.pontos),
    [0, 0],
  );
  assert.equal(labB.pontos, 99);
});

test("POST /api/teacher/clear removes students from one classroom", async () => {
  const mock = createMockSupabase({
    turmas: [
      { id: "t1", codigo: "LAB-A", nome: "LAB-A" },
      { id: "t2", codigo: "LAB-B", nome: "LAB-B" },
    ],
    users: [
      { id: "u1", username: "A", turma: "LAB-A", pontos: 30 },
      { id: "u2", username: "B", turma: "LAB-A", pontos: 10 },
      { id: "u3", username: "C", turma: "LAB-B", pontos: 99 },
    ],
  });
  process.env.TEACHER_ACCESS_KEY = "";

  const handler = loadHandler("api/teacher/clear.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      codigo: "lab-a",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().deletedUsers, 2);
  assert.equal(res.json().deletedTurmas, 0);
  assert.equal(mock.state.users.length, 1);
  assert.equal(mock.state.users[0].turma, "LAB-B");
  assert.equal(mock.state.turmas.length, 2);
});

test("POST /api/teacher/clear can wipe all records with confirmation", async () => {
  const mock = createMockSupabase({
    turmas: [
      { id: "t1", codigo: "LAB-A", nome: "LAB-A" },
      { id: "t2", codigo: "LAB-B", nome: "LAB-B" },
    ],
    users: [
      { id: "u1", username: "A", turma: "LAB-A", pontos: 30 },
      { id: "u2", username: "B", turma: "LAB-B", pontos: 10 },
    ],
  });
  process.env.TEACHER_ACCESS_KEY = "";

  const handler = loadHandler("api/teacher/clear.js", {
    getSupabaseAdmin: () => mock,
    parseJson: async () => ({
      scope: "all",
      confirmation: "CLEAR ALL",
    }),
  });

  const res = await invokeHandler(handler, { method: "POST", headers: {} });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().deletedUsers, 2);
  assert.equal(res.json().deletedTurmas, 2);
  assert.equal(mock.state.users.length, 0);
  assert.equal(mock.state.turmas.length, 0);
});
