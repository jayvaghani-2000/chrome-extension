const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
  },
  // module define additional rules as webpack builds, by default webpack handle js/json file so to mandle ts/tsx file we need to define rules
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/, // will consider, ts or tsx, x is optional due to ?
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
  // what files this moduel should apply to
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"), // define path for output
  },
  // it will share modules, like same react module will share between each chunks
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  // plugin is something which do not have anything to manupulate with files as like module
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
        title: "hotbot.ai",
        filename: `${i}.html`,
        chunks: [i],
      })
  );
}
