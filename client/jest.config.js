// jest.config.js
const nextJest = require('next/jest')

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>"],
  modulePaths: [
    "<rootDir>",
    "<rootDir>/src",
  ],
  moduleDirectories: [
    "node_modules"
  ],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest"
  },

  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `tests` or `spec`.
  testRegex: "(/tests/.*|(\\.|/)(tests|spec))\\.[t|j]sx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  testEnvironment: "jsdom",

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/pages/**',
  ],
  collectCoverage: false,
  coverageProvider: 'v8',
};

module.exports = createJestConfig(customJestConfig)
