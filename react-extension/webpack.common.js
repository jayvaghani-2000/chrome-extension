const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
    background: path.resolve("src/background/background.ts"),
    contentScript: path.resolve("src/content-script/contentScript.ts"),
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        type: "asset/resource",
        test: /\.(jpg|jpeg|png|ttf|woff|svg)$/,
      },
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
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
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
