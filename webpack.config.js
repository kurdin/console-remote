module.exports = {
  output: {
    library: 'consolere',
    libraryTarget: 'umd',
    filename: 'connector.js',
    globalObject: 'self',
  },
  name: 'connector',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  entry: './lib/index.js',
  mode: process.env.NODE_ENV || 'development',
};
