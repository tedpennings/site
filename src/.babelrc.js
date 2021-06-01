const env = {
  test: {
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  },
};

const plugins = [
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/core",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/icons",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "icons",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/styles",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "styles",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/labs",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "labs",
  ],
];

module.exports = { env, plugins };
