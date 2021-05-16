const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.jsx",

  mode: isEnvProduction ? "production" : "development",
  devtool: isEnvProduction ? false : "cheap-module-source-map",

  output: {
    path: path.resolve(__dirname, "dist"),

    chunkFilename: isEnvProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : "static/js/[name].chunk.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Ted Pennings",
      template: "public/index.html",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx", ".mjs", ".mdx", ".json"],

    alias: {
      "react-dom$": "react-dom/profiling",
      "scheduler/tracing": "scheduler/tracing-profiling",
    },
  },

  optimization: {
    minimize: isEnvProduction,
    minimizer: [new TerserPlugin()],
  },

  devServer: {
    public: "public",
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      // "oneOf" will traverse all following loaders until one will
      // match the requirements. When no loader matches it will fall
      // back to the "file" loader at the end of the loader list.
      {
        oneOf: [
          {
            test: /\.(jpe?g|png|webp)$/i,
            loader: require.resolve("responsive-loader"),
            options: {
              adapter: require("responsive-loader/sharp"),
              name: "static/media/[name].[hash:8].[ext]",
              sizes: [1024, 99999],
            },
          },
          {
            test: /\.(m?jsx?)$/,
            loader: require.resolve("babel-loader"),
            resolve: {
              fullySpecified: false,
            },
          },
          { test: /.mdx$/, use: ["babel-loader", "@mdx-js/loader"] },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(jsx?)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
};
