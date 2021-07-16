const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env = {}, argv) => {
  return {
    entry: ["core-js/stable", "./src/index"],
    mode: argv.mode || env.MODE || "development",
    // target: ["web", "es5"],
    target: "web",
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
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "url-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [{ loader: "url-loader" }],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      modules: [
        path.resolve(process.cwd(), "./src"),
        path.resolve(process.cwd(), "./node_modules"),
      ],
      alias: {
        "@src": path.resolve(process.cwd(), "./src"),
      },
    },
    output: {
      publicPath: "/",
      filename: "index.js",
      path: path.resolve(process.cwd(), "dist"),
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configOverwrite: {
            include: [`./src/index.*`],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: `./src/public/index.html`,
      }),
    ],
    devServer: {
      transportMode: "ws",
      historyApiFallback: true,
      hot: true,
      inline: true,
      host: argv.host || env.HOST || "0.0.0.0",
      port: argv.port || env.PORT || 3000,
      proxy: {
        // "^/api/*": {
        //   target: "http://localhost:8080/api/",
        //   secure: false,
        // },
      },
    },
  };
};
