const path = require("path");
const NodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = (env = {}, argv) => {
  return {
    entry: "./src/index",
    mode: argv.mode || env.MODE || "development",
    target: "node",
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)?$/,
          use: {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(__dirname, "./babel.config.js"),
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      modules: [
        path.resolve(process.cwd(), "./src"),
        path.resolve(process.cwd(), "./node_modules"),
      ],
    },
    externals: [NodeExternals()],
    output: {
      filename: "index.js",
      path: path.resolve(process.cwd(), "dist"),
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configOverwrite: { include: [`./src/index.*`] },
        },
      }),
      new NodemonPlugin({
        script: `./dist/index.js`,
        watch: `./dist`,
        ext: "js,njk,json,ts,tsx",
      }),
    ],
  };
};
