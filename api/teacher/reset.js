const {
  getSupabaseAdmin,
  normalizeClassCode,
  parseJson,
  requireTeacherKey,
  sendJson,
} = require("../_lib/supabase");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const body = await parseJson(req);
    if (!requireTeacherKey(body, req)) {
      sendJson(res, 401, { error: "Invalid teacher key" });
      return;
    }

    const codigo = normalizeClassCode(body.codigo);
    if (!codigo) {
      sendJson(res, 400, { error: "codigo is required" });
      return;
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("users").update({ pontos: 0 }).eq("turma", codigo);
    if (error) throw error;

    sendJson(res, 200, { ok: true, codigo });
  } catch (err) {
    sendJson(res, 500, { error: "Failed to reset class scores", detail: err.message });
  }
};

