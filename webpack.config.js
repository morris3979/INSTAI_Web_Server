const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  mode: "production",
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'js/[name].bundle.js',
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: ['cache-loader', 'thread-loader', 'babel-loader']
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 100000,
        name: 'assets/img/[name].[ext]'
      }
    }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx', ".css", ".scss", ".json"],
  },
  performance: {
    hints: "warning",
    hints: "error",
    hints: false,
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: "inline-source-map",
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: outputDirectory
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new DashboardPlugin(),
    new SimpleProgressWebpackPlugin({
      format: 'compact',
    }),
  ]
};
