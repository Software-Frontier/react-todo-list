const { merge } = require('webpack-merge'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].min.css' }),
    new CleanWebpackPlugin(),
  ],
});
