const { merge } = require('webpack-merge'),
  ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'),
  config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    index: 'index.html',
    open: {
      app: ['chrome'],
    },
    liveReload: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
      },
    },
    overlay: true,
    noInfo: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
