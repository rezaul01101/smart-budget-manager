/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  rootDir: "src",

  testMatch: ["**/__tests__/**/*.test.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "../coverage",

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/config/",
    "/generated/"
  ],

  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
