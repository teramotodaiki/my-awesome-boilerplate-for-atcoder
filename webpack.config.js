const { resolve } = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  target: 'node',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_module/, use: 'babel-loader' }]
  },
  plugins: [
    // To run test after building
    new WebpackShellPlugin({
      onBuildExit: ['npm test']
    }),
    // To add ./input and ./answer into watching target
    function() {
      this.plugin('emit', function(compilation, callback) {
        compilation.fileDependencies.push(
          resolve(__dirname, 'input'),
          resolve(__dirname, 'answer')
        );
        callback();
      });
    }
  ]
};
