const path = require("path");
const mode = process.env.NODE_ENV;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode,
  entry: {
    main: path.join(__dirname, "./client/index.js"),
    // main: path.join(__dirname, "./build/bundle.js"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "http://localhost:8080/build/",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: "/build/",
    port: 8080,
    proxy: {
      "/callback": "http://localhost:3000",
      "/api": "http://localhost:3000",
      "/verify": "http://localhost:3000",
      "/game": "http://localhost:3000",
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
