const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const pkg = require('./package.json');
console.log(pkg.name);

module.exports = function webpackConfig (env = {}) {
  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './index.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${pkg.name}.js`,
      library: `${pkg.name}`,
      libraryTarget: 'umd',
    },
    devtool: "source-map",
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    // externals: Object.keys(pkg.dependencies),
    externals: [
      'WsSerialPortClient'
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          // exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'babel-loader',
          }]
        },
        {
          'test': /\.tsx?$/,
          use: [{
            loader: 'ts-loader',
          }],
          'exclude': [/node_modules/, nodeModulesPath]
        },
        {
          test: /\.(png|jpg|gif|ico|svg)$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'url-loader',
            // options: {
            //   limit: 1024,
            //   name: 'asset/[name].[hash:7].[ext]',
            // }
          }],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({filename: "../dev/index.html"})
    ],
  };
};
