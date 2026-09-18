module.exports = {
  process(code, filename) {
    return {
      code,
      map: {
        version: 3,
        file: filename,
        // Match ts-jest's absolute, slash-normalized source paths.
        sources: [filename.replace(/\\/g, "/")],
        sourcesContent: [code],
        names: [],
        // Identity map: column zero of each generated line to its source line.
        mappings: code
          .split("\n")
          .map((_, i) => (i === 0 ? "AAAA" : "AACA"))
          .join(";"),
      },
    };
  },
};
