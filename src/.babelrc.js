const plugins = [
  [
    "babel-plugin-transform-imports",
    {
      "@material-ui/styles": {
        transform: "@material-ui/styles/esm/${member}",
        preventFullImport: true,
      },
      "@material-ui/core/styles": {
        transform: "@material-ui/core/esm/styles/${member}",
        preventFullImport: true,
      },
      "@material-ui/core": {
        transform: "@material-ui/core/esm/${member}",
        preventFullImport: true,
      },
      "@material-ui/icons": {
        transform: "@material-ui/icons/esm/${member}",
        preventFullImport: true,
      },
      "@material-ui/lab": {
        // Use "transform: '@material-ui/icons/${member}'," if your bundler does not support ES modules
        transform: "@material-ui/lab/esm/${member}",
        preventFullImport: true,
      },
    },
  ],
];

module.exports = { plugins };
