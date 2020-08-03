module.exports = (isDev) => {
  return {
    perserveWhitepace: true, // 空格会影响 节点判断 或者样式
    extractCSS: !isDev, // 把点vue文件的 css样式单独打包到一个文件
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 类名 , 方便定义class名称 一目了然的定位
      camelCase: true // 驼峰原则命名
    } // hotReload: false // 默认不用配置,根据环境变量生成
  }
}
