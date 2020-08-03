const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  merge
} = require('webpack-merge')
const {
  VueLoaderPlugin
} = require('vue-loader')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'styles.[chunkhash:8].css',
    chunkFilename: 'styles.[chunkhash:8].css'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': 'server'
  }),
  new VueLoaderPlugin()
]

if (isDev) {
  plugins.push(new VueServerPlugin())
}

const config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build') // 因为代码是在node运行 所以只需要require就能获取得到
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }]
  },
  plugins
})

config.resolve = {
  alias: { // alians 可以根据key 映射 文件真正路径
    // eslint-disable-next-line quote-props
    'model': path.join(__dirname, '../client/model/server.model.js')
  }
}

module.exports = config
