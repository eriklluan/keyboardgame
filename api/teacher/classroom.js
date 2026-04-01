const crypto = require("crypto");
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
    const nome = String(body.nome || codigo)
      .trim()
      .slice(0, 64);

    if (!codigo) {
      sendJson(res, 400, { error: "codigo is required" });
      return;
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("turmas").upsert(
      {
        id: crypto.randomUUID(),
        codigo,
        nome,
      },
      { onConflict: "codigo" },
    );
    if (error) throw error;

    sendJson(res, 200, { codigo, nome });
  } catch (err) {
    sendJson(res, 500, { error: "Failed to create classroom", detail: err.message });
  }
};

