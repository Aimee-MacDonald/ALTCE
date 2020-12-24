const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    index: path.join(__dirname, "src/frontend/src/main.js")
  },
  output: {
    path: path.join(__dirname, "src/frontend/dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      }, {
        test: /\.(sa|c)ss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"},
          {loader: "postcss-loader"},
          {
            loader: "sass-loader",
            options: {implementation: require("sass")}
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    })
  ],
  mode: "development"
}