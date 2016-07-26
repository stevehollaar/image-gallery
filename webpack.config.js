module.exports = {
  entry: './js/main.js',
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
  },
  resolve: {
    root: [__dirname + '/js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
    ],
  },
};
