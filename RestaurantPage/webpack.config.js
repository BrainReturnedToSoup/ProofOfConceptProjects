const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[contenthash].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|png|gif)$/i,
        use: "asset/resource",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "./dist",
        path.resolve(__dirname, './dist'),
      ]
    }),
  ],
};
