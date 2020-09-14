const settings = {
  presets: [
    "@babel/preset-react",
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
};

module.exports = settings;
