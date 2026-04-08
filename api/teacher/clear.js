const {
  getSupabaseAdmin,
  normalizeClassCode,
  parseJson,
  requireTeacherKey,
  sendJson,
} = require("../_lib/supabase");

function toBoolean(value) {
  if (typeof value === "boolean") return value;
  return String(value || "").trim().toLowerCase() === "true";
}

async function deleteRowsByIds(supabase, table, key, ids) {
  let deleted = 0;

  for (const id of ids) {
    const { error } = await supabase.from(table).delete().eq(key, id);
    if (error) throw error;
    deleted += 1;
  }

  return deleted;
}

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

    const scope = String(body.scope || "class").trim().toLowerCase();
    const deleteClassroom = toBoolean(body.deleteClassroom);
    const supabase = getSupabaseAdmin();

    if (scope === "all") {
      const confirmation = String(body.confirmation || body.confirm || "")
        .trim()
        .toUpperCase();

      if (confirmation !== "CLEAR ALL") {
        sendJson(res, 400, {
          error: 'confirmation must be "CLEAR ALL" when scope is "all"',
        });
        return;
      }

      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("id");
      if (usersError) throw usersError;

      const { data: turmas, error: turmasError } = await supabase
        .from("turmas")
        .select("codigo");
      if (turmasError) throw turmasError;

      const deletedUsers = await deleteRowsByIds(
        supabase,
        "users",
        "id",
        (users || []).map((row) => row.id),
      );
      const deletedTurmas = await deleteRowsByIds(
        supabase,
        "turmas",
        "codigo",
        (turmas || []).map((row) => row.codigo),
      );

      sendJson(res, 200, {
        ok: true,
        scope: "all",
        deletedUsers,
        deletedTurmas,
      });
      return;
    }

    const codigo = normalizeClassCode(body.codigo);
    if (!codigo) {
      sendJson(res, 400, { error: "codigo is required" });
      return;
    }

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id")
      .eq("turma", codigo)
      .limit(1000);
    if (usersError) throw usersError;

    const deletedUsers = await deleteRowsByIds(
      supabase,
      "users",
      "id",
      (users || []).map((row) => row.id),
    );

    let deletedTurmas = 0;
    if (deleteClassroom) {
      const { error: deleteClassroomError } = await supabase
        .from("turmas")
        .delete()
        .eq("codigo", codigo);
      if (deleteClassroomError) throw deleteClassroomError;
      deletedTurmas = 1;
    }

    sendJson(res, 200, {
      ok: true,
      scope: "class",
      codigo,
      deletedUsers,
      deletedTurmas,
    });
  } catch (err) {
    sendJson(res, 500, {
      error: "Failed to clear database records",
      detail: err.message,
    });
  }
};
