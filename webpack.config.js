const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const PACKAGE = require('./package.json')
const banner = PACKAGE.name + ' - ' + PACKAGE.version

module.exports = {
  output: {
    library: 'consolere',
    libraryTarget: 'umd',
    filename: 'connector.js',
    globalObject: 'self'
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  name: 'connector',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  entry: './lib/index.js',
  mode: process.env.NODE_ENV || 'development',
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      CONSOLE_VERSION: JSON.stringify(PACKAGE.version),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
}
