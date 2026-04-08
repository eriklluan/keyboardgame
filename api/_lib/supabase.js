const { createClient } = require("@supabase/supabase-js");

let cachedClient = null;

function getSupabaseAdmin() {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL");
  }
  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

function parseJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function normalizeClassCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .slice(0, 24);
}

function safeUsername(value) {
  const name = String(value || "")
    .trim()
    .slice(0, 24);
  if (name) return name;
  return `Aluno-${Math.floor(Math.random() * 9000 + 1000)}`;
}

function requireTeacherKey(body, req) {
  const expected = process.env.TEACHER_ACCESS_KEY || "";
  if (!expected) return true;
  const provided = String(
    body.teacherKey || req.headers["x-teacher-key"] || "",
  ).trim();
  return provided === expected;
}

module.exports = {
  getSupabaseAdmin,
  normalizeClassCode,
  parseJson,
  requireTeacherKey,
  safeUsername,
  sendJson,
};
