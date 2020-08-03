const Router = require('koa-router')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs') // 不把文件写入到磁盘上面,直接写在内存
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

const NativeModule = require('module')
const vm = require('vm')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err

  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, 'server-entry.js')

  try {
    const m = {
      exports: {}
    }
    const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
    const wrapper = NativeModule.wrap(bundleStr)
    const script = new vm.Script(wrapper, {
      filename: 'server-entry.js',
      displayErrors: true
    })
    const result = script.runInThisContext()
    result.call(m.exports, m.exports, require, m)
    bundle = m.exports.default
  } catch (err) {
    console.log('compile js error:' + err);
  }

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
    .createRenderer({
      inject: false, // 不用注入
      clientManifest
    })
  // 以上代码的功能仅是实现 创建 服务端渲染 的基础

  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()

router.get('/(.*)', handleSSR)

module.exports = router
