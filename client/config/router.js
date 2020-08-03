import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/', // 能通过自己路由跳转,直接输入是无效的
    linkActiveClass: 'active-link', // 这样可以写全局的class 去指定链接被激活的时候的样式 这个匹配的是包含当前的路由地址包含这个
    linkExactActiveClass: 'exact-active-link', // 这个是完全配对
    scrollBehavior(to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
    // parseQuery(query) {},
    // stringifyQuery(obj) {}
    fallback: true
  })
}
