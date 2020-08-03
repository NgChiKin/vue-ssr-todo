const Router = require('koa-router')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs') // 不把文件写入到磁盘上面,直接写在内存
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err

  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated');
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'watting ...'
    return
  }
  const {
    data: clientManifest
  } = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  const renderer = VueServerRender
    .createBundleRenderer(bundle, {
      inject: false, // 不用注入
      clientManifest
    })
  // 以上代码的功能仅是实现 创建 服务端渲染 的基础

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('/(.*)', handleSSR)

module.exports = router
