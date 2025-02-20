const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    library: 'printJS',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[contenthash].js',
    filename: 'print.js',
    // sourceMapFilename: 'print.map',
    // sourceMapFilename: '[name].[contenthash].map',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'print.css'
    })
  ],
  optimization: {
    minimizer: [
      // new OptimizeCssAssetsPlugin({
      //   assetNameRegExp: /\.css$/g,
      //   canPrint: false
      // }),
      new CssMinimizerPlugin({}),
      new TerserPlugin({
        // cache: false,
        parallel: true,
        // sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          mangle: true,
          ie8: true,
          safari10: true
        }
      })
    ]
  }
}
