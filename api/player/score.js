const {
  getSupabaseAdmin,
  normalizeClassCode,
  parseJson,
  safeUsername,
  sendJson,
} = require("../_lib/supabase");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const body = await parseJson(req);
    const supabase = getSupabaseAdmin();

    const playerId = String(body.playerId || "").trim();
    const turma = normalizeClassCode(body.turma);
    const username = safeUsername(body.username);
    const points = Math.max(0, Number(body.points || 0));

    if (!playerId || !turma) {
      sendJson(res, 400, { error: "playerId and turma are required" });
      return;
    }

    const { data: classroom, error: turmaError } = await supabase
      .from("turmas")
      .select("codigo")
      .eq("codigo", turma)
      .maybeSingle();
    if (turmaError) throw turmaError;
    if (!classroom) {
      sendJson(res, 404, { error: "Classroom not found. Ask the teacher to create it first." });
      return;
    }

    const { data: current, error: currentError } = await supabase
      .from("users")
      .select("id, pontos")
      .eq("id", playerId)
      .maybeSingle();
    if (currentError) throw currentError;

    if (!current) {
      sendJson(res, 404, { error: "Player not found. Join the classroom first." });
      return;
    }

    const total = Number(current.pontos || 0) + points;
    const { error: updateError } = await supabase
      .from("users")
      .update({ pontos: total, username, turma })
      .eq("id", playerId);
    if (updateError) throw updateError;

    sendJson(res, 200, { total });
  } catch (err) {
    sendJson(res, 500, { error: "Failed to submit score", detail: err.message });
  }
};

