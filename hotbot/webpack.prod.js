const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [],
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateStringArray: true,
    }),
  ],
});
