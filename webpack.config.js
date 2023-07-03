const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    main: [
       './js/js.js',
        './js/config.js',
        './js/forum.js',
        './js/login.js',
        './js/register.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name][ext]'
  },
 module: {
   rules: [
     {
       test: /\.css$/i,
       use: ['style-loader', 'css-loader'],
     },
     {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'images/resource',
      },
   ],
 },
 devServer: {
  static: "./dist"
  },
 plugins: [
  new HtmlWebpackPlugin({
    template: "index.html",
    filename: "index.html"
}),
  new HtmlWebpackPlugin({
    template: "about.html",
    filename: "about.html"
  }),
  new HtmlWebpackPlugin({
    template: "contact.html",
    filename: "contact.html"
  }),
  new HtmlWebpackPlugin({
    template: "login.html",
    filename: "login.html"
  }),
  new HtmlWebpackPlugin({
    template: "forum.html",
    filename: "forum.html"
  }),
  new HtmlWebpackPlugin({
    template: "register.html",
    filename: "register.html"
  }),
]
};