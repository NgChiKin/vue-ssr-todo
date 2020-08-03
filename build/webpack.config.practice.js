const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const {
  merge
} = require('webpack-merge')
const {
  VueLoaderPlugin
} = require('vue-loader')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  // historyFallback: {

  // } // vue 没有映射的地址 做一个啥
  hot: true
}

const defaultPlugin = [
  new webpack.DefinePlugin({
    process_env: {
      NODE_ENV: '"development"'
    }
  }), new VueLoaderPlugin(), new HtmlPlugin({
    template: path.join(__dirname, './template.html')
  })
]

const config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            // modules: {
            //   localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            // }
          }
        },
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
  devServer,
  resolve: {
    alias: {
      // eslint-disable-next-line quote-props
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugin.concat([
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
