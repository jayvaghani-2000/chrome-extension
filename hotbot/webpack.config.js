const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
    background: path.resolve("src/background/background.ts"),
    "content-script": path.resolve("src/content-script/content-script.tsx"),
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
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
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
    filename: "./[name]/[name].js",
    path: path.resolve(__dirname, "dist"), // define path for output
  },
  // it will share modules, like same react module will share between each chunks
  optimization: {
    splitChunks: {
      chunks(chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== "content-script";
      },
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
        filename: `./${i}/${i}.html`,
        chunks: [i],
      })
  );
}
