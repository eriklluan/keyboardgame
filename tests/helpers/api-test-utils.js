const path = require("path");

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    end(payload) {
      this.body = payload || "";
    },
    json() {
      try {
        return JSON.parse(this.body || "{}");
      } catch (_e) {
        return {};
      }
    },
  };
}

function loadHandler(handlerRelativePath, libOverrides = {}) {
  const libPath = path.resolve(__dirname, "../../api/_lib/supabase.js");
  const handlerPath = path.resolve(__dirname, "../../", handlerRelativePath);

  delete require.cache[handlerPath];
  const lib = require(libPath);
  Object.assign(lib, libOverrides);

  return require(handlerPath);
}

async function invokeHandler(handler, req) {
  const res = createMockRes();
  await handler(req, res);
  return res;
}

module.exports = {
  invokeHandler,
  loadHandler,
};
