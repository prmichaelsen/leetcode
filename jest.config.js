// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  rootDir: process.env.PWD,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testMatch: ["<rootDir>/**/*.spec.ts"],
  preset: "ts-jest",
  // disableSourceMapSupport: true,
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|json)$", "package.json"],
  coverageReporters: ["cobertura", "html", "text"],
};
