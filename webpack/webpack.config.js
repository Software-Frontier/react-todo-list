const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  Dotenv = require('dotenv-webpack'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
  TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    index: {
      import: path.resolve(__dirname, '..', './client/index.tsx'),
      filename: 'js/[name].[contenthash].bundle.min.js',
    },
  },
  output: {
    path: path.resolve(__dirname, '..', './server/build/public'),
    clean: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e?)g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[hash].[ext]', outputPath: 'images' },
          },
        ],
      },
      {
        test: /\.(woff(2?)|eot|ttf|otf|svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.html/i,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './client/index.html'),
      filename: 'index.html',
      inject: 'head',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '..', './client/favicon.ico'),
      prefix: '',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './client/assets',
          to: 'assets',
        },
      ],
    }),
    new Dotenv(),
  ],
};
