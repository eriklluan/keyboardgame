const assert = require("node:assert/strict");
const fs = require("fs");

test("index.html includes language toggle and new shortcuts", () => {
  const html = fs.readFileSync("index.html", "utf8");

  assert.match(html, /id="lang-pt-btn"/);
  assert.match(html, /id="lang-en-btn"/);

  const expectedShortcuts = [
    "Ctrl + S",
    "Ctrl + F",
    "F5",
    "Ctrl + R",
    "Win + .",
    "Ctrl + P",
    "F2",
    "Ctrl + T",
    "Ctrl + W",
    "Alt + D",
    "Win + 1/2/3...",
    "Ctrl + Shift + Esc",
    "Ctrl + Shift + T",
    "Win + X",
    "Win + Shift + Seta (←/→)",
    "Alt + Space",
  ];

  expectedShortcuts.forEach((shortcut) => {
    assert.match(html, new RegExp(shortcut.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });
});
