const path = require("path");

module.exports = {
  entry: {
    index: path.join(__dirname, "src/frontend/src/main.js")
  },
  output: {
    path: path.join(__dirname, "src/frontend/dist/scripts"),
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
      }
    ]
  },
  mode: "development"
}