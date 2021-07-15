const path = require("path");

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
    externals: {
      react: "react",
      "react-dom": "react-dom",
    },
    output: {
      filename: "index.js",
      path: path.resolve(process.cwd(), "dist"),
      library: "webpackNumbers",
      libraryTarget: "umd",
    },
  };
};
