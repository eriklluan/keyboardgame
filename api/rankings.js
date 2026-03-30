const {
  getSupabaseAdmin,
  normalizeClassCode,
  sendJson,
} = require("./_lib/supabase");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const supabase = getSupabaseAdmin();
    const turma = normalizeClassCode(req.query?.turma);

    const { data: globalData, error: globalError } = await supabase
      .from("users")
      .select("id, username, pontos, turma")
      .order("pontos", { ascending: false })
      .limit(50);
    if (globalError) throw globalError;

    let classData = [];
    if (turma) {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, pontos, turma")
        .eq("turma", turma)
        .order("pontos", { ascending: false })
        .limit(50);
      if (error) throw error;
      classData = data || [];
    }

    sendJson(res, 200, {
      global: globalData || [],
      turma: classData,
    });
  } catch (err) {
    sendJson(res, 500, {
      error: "Failed to load rankings",
      detail: err.message,
    });
  }
};

