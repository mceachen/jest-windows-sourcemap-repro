const { normalize } = require("node:path");

test("the mapped stack frame identifies the test file", () => {
  const frame = new Error().stack.split("\n")[1];
  const filename = frame.match(/\((.+):\d+:\d+\)$/)?.[1];
  expect(filename).toBeDefined();
  expect(normalize(filename)).toBe(normalize(__filename));
});
