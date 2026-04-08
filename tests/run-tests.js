const tests = [];

global.test = (name, fn) => {
  tests.push({ name, fn });
};

require("./api-player.test.js");
require("./api-rankings.test.js");
require("./api-teacher.test.js");
require("./frontend-smoke.test.js");

(async () => {
  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      await t.fn();
      passed += 1;
      console.log(`PASS ${t.name}`);
    } catch (err) {
      failed += 1;
      console.error(`FAIL ${t.name}`);
      console.error(err && err.stack ? err.stack : err);
    }
  }

  console.log(`\nTest summary: ${passed} passed, ${failed} failed, ${tests.length} total`);

  if (failed > 0) {
    process.exitCode = 1;
  }
})();
