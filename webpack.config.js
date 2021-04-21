const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};