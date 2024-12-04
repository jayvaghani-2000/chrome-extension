const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/test.tsx",
  //webpack just complie js / json, tsx and files needs to be handle like this
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
