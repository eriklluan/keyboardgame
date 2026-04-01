function createMockSupabase(seed = {}) {
  const state = {
    users: Array.isArray(seed.users) ? [...seed.users] : [],
    turmas: Array.isArray(seed.turmas) ? [...seed.turmas] : [],
  };

  function pickColumns(row, columns) {
    if (!columns || columns === "*") return { ...row };
    const keys = columns.split(",").map((k) => k.trim());
    const out = {};
    keys.forEach((k) => {
      out[k] = row[k];
    });
    return out;
  }

  class Query {
    constructor(table) {
      this.table = table;
      this.filters = [];
      this.mode = "select";
      this.columns = "*";
      this.orderBy = null;
      this.limitCount = null;
      this.updateValues = null;
    }

    select(columns) {
      this.mode = "select";
      this.columns = columns || "*";
      return this;
    }

    order(column, options = {}) {
      this.orderBy = {
        column,
        ascending: options.ascending !== false,
      };
      return this;
    }

    limit(count) {
      this.limitCount = count;
      return Promise.resolve(this._read());
    }

    maybeSingle() {
      const result = this._read();
      const first = result.data.length > 0 ? result.data[0] : null;
      return Promise.resolve({ data: first, error: null });
    }

    insert(payload) {
      const rows = Array.isArray(payload) ? payload : [payload];
      rows.forEach((row) => {
        state[this.table].push({ ...row });
      });
      return Promise.resolve({ data: null, error: null });
    }

    upsert(payload, options = {}) {
      const rows = Array.isArray(payload) ? payload : [payload];
      const key = options.onConflict;
      rows.forEach((row) => {
        if (!key) {
          state[this.table].push({ ...row });
          return;
        }
        const idx = state[this.table].findIndex((r) => r[key] === row[key]);
        if (idx >= 0) {
          state[this.table][idx] = { ...state[this.table][idx], ...row };
        } else {
          state[this.table].push({ ...row });
        }
      });
      return Promise.resolve({ data: null, error: null });
    }

    update(values) {
      this.mode = "update";
      this.updateValues = { ...values };
      return this;
    }

    delete() {
      this.mode = "delete";
      return this;
    }

    eq(column, value) {
      if (this.mode === "update") {
        let updated = 0;
        state[this.table] = state[this.table].map((row) => {
          if (row[column] === value) {
            updated += 1;
            return { ...row, ...this.updateValues };
          }
          return row;
        });
        return Promise.resolve({ data: { updated }, error: null });
      }

      if (this.mode === "delete") {
        const before = state[this.table].length;
        state[this.table] = state[this.table].filter((row) => row[column] !== value);
        return Promise.resolve({
          data: { deleted: before - state[this.table].length },
          error: null,
        });
      }

      this.filters.push({ column, value });
      return this;
    }

    _read() {
      let rows = [...state[this.table]];
      this.filters.forEach((f) => {
        rows = rows.filter((r) => r[f.column] === f.value);
      });
      if (this.orderBy) {
        const { column, ascending } = this.orderBy;
        rows.sort((a, b) => {
          const av = a[column] ?? 0;
          const bv = b[column] ?? 0;
          return ascending ? av - bv : bv - av;
        });
      }
      if (typeof this.limitCount === "number") {
        rows = rows.slice(0, this.limitCount);
      }
      return {
        data: rows.map((r) => pickColumns(r, this.columns)),
        error: null,
      };
    }
  }

  return {
    state,
    from(table) {
      if (!state[table]) state[table] = [];
      return new Query(table);
    },
  };
}

module.exports = { createMockSupabase };
