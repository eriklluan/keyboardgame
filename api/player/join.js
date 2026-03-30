const crypto = require("crypto");
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
    const turma = normalizeClassCode(body.turma);
    const username = safeUsername(body.username);
    const playerId = String(body.playerId || crypto.randomUUID()).slice(0, 64);

    if (!turma) {
      sendJson(res, 400, { error: "Classroom code is required" });
      return;
    }

    const supabase = getSupabaseAdmin();

    const { error: turmaError } = await supabase.from("turmas").upsert(
      {
        id: crypto.randomUUID(),
        codigo: turma,
        nome: body.className || turma,
      },
      { onConflict: "codigo" },
    );
    if (turmaError) throw turmaError;

    const { data: existing, error: existingError } = await supabase
      .from("users")
      .select("id, pontos")
      .eq("id", playerId)
      .maybeSingle();
    if (existingError) throw existingError;

    if (existing) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ username, turma })
        .eq("id", playerId);
      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase.from("users").insert({
        id: playerId,
        username,
        pontos: 0,
        turma,
      });
      if (insertError) throw insertError;
    }

    sendJson(res, 200, {
      id: playerId,
      username,
      turma,
    });
  } catch (err) {
    sendJson(res, 500, { error: "Failed to join classroom", detail: err.message });
  }
};

