import createApp from './create-app'
import bus from './util/bus'

const {
  app,
  router,
  store
} = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('auth', () => { // actions.js 里面的事件, 实现事件订阅 低耦合
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#app')
})
