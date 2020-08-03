const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const {
  merge
} = require('webpack-merge')
const {
  VueLoaderPlugin
} = require('vue-loader')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  // historyFallback: {

  // } // vue 没有映射的地址 做一个啥
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  historyApiFallback: {
    index: '/index.html' // htmlPlugin 生成的html的位置
  },
  hot: true,
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  }
};
const defaultPlugin = [
  new webpack.DefinePlugin({
    process_env: {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }), new VueLoaderPlugin(), new HtmlPlugin({
    template: path.join(__dirname, './template.html')
  }),
  new VueClientPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
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
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
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
    plugins: defaultPlugin.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash:8].css',
        chunkFilename: 'styles.[chunkhash:8].css'
      })
    ]),
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }
  })
}

config.resolve = {
  alias: {
    // eslint-disable-next-line quote-props
    'model': path.join(__dirname, '../client/model/client.model.js')
  }
}

module.exports = config
