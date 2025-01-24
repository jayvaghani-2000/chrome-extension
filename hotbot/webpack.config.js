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
    "snapchat-content": path.resolve(
      "src/content-script/snapchat/snapchat.tsx"
    ),
    "scrape-snapchat": path.resolve(
      "src/scripts/scrapper/snapchat/snapchat.ts"
    ),
    "scrape-pure": path.resolve("src/scripts/scrapper/pure/pure.ts"),
    spoof: path.resolve("src/scripts/spoof/main.ts"),
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
          {
            loader: "to-string-loader",
          },
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
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  output: {
    filename: outputFiles,
    path: path.resolve(__dirname, "dist"), // define path for output
  },
  // it will share modules, like same react module will share between each chunks
  optimization: {
    splitChunks: {
      chunks(chunk) {
        // exclude `my-excluded-chunk`
        return !["snapchat-content"].includes(chunk.name);
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

function outputFiles(name) {
  const chunkName = name.chunk.name;
  if (["scrape-pure", "scrape-snapchat", "spoof"].includes(chunkName)) {
    return "./scripts/[name]/[name].js";
  }
  if (["snapchat-content"].includes(chunkName)) {
    return "./content-script/[name]/[name].js";
  }
  return "./[name]/[name].js";
}
