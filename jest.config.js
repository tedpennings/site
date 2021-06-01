// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  roots: [
    "<rootDir>/src",
    // Exclude cypress tests
  ],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ["node_modules"],

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node", "mdx"],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  slowTestThreshold: 5,

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "\\.m?jsx?$": "jest-esm-transformer",
  },

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,
};
