const {
  addWebpackPlugin,
  override,
  fixBabelImports
} = require("customize-cra");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addWebpackPlugin(new MonacoWebpackPlugin({ languages: ["json"] }))
);
