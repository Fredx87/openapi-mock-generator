// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const wp = require("@cypress/webpack-preprocessor");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = on => {
  const options = {
    webpackOptions: {
      mode: "development",
      devtool: "eval-source-map",
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [
          new TsconfigPathsPlugin({
            configFile: `${__dirname}/../tsconfig.json`
          })
        ]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    }
  };
  on("file:preprocessor", wp(options));

  on("task", require("@cypress/code-coverage/task"));
};
