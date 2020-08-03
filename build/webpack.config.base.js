const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const createVueloader = require('./vue-loader.config')

const config = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: { // out的 pubcliPath路径作为 后面historyApiFallback的基础路径
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8000/'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: createVueloader(isDev)
    },
    {
      test: /\.jsx$/,
      loader: 'babel-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(gif|jpg|jpeg|png|svg)/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'reesource/[path][name].[hash:8].[ext]'
        }
      }]
    }
    ]
  }
}

module.exports = config
