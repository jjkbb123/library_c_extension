const path = require("path");
const HtmlWwebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
        chunks: "all",
    },
  },
  devServer: {
    static: "./dist",
    hot: true,
    proxy: {
      "/cascade": "http://10.80.75.3:8081/",
      "/flowable-web": "https://192.168.22.19:8803"
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: (bounld) => {
          if (bounld?.descriptionData?.name === "antd") {
            return ["style-loader", "css-loader"];
          }
          return [MiniCssExtractPlugin.loader, "css-loader"];
        },
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(xls|xlsx|png|svg|gif)$/i,
        type: "asset",
        // use: ["file-loader"],
        generator: {
          filename: "static/[hash][ext]",
          publicPath: "assets/",
          outputPath: "cdn-assets/",
        },
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        // loader: require.resolve("babel-loader"),
        include: [path.resolve(__dirname, "src")],
        use: [
          // {
          //   loader: "thread-loader",
          //   options: {
          //     workers: 3,
          //   },
          // },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWwebpackPlugin({
      title: "test_css",
      minify: true,
      template: "./src/template.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      utils: path.resolve(__dirname, 'src/utils/'),
    }
  },
};
