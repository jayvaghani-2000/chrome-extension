const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
  },
  //webpack just complie js / json, tsx and files needs to be handle like this
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader",'postcss-loader'],
      },
      {
        type: "asset/resource",
        test:/\.(jpg|jpeg|png|ttf|woff|svg)$/
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "./[name]/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    ...getHtmlPlugins(["popup", "options"]),
  ],
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (i) =>
      new HtmlPlugin({
        title: "React Exntension",
        filename: `./${i}/${i}.html`,
        chunks: [i],
      })
  );
}
