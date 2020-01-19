const { addWebpackPlugin, override } = require("customize-cra");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = override(
  addWebpackPlugin(new MonacoWebpackPlugin({ languages: ["json"] }))
);
