import Vue from 'vue'

const app = new Vue({
  // el: '#app',
  template: '<div ref="ng">this is ngchikin {{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})

app.$mount('#app')

// let i = 0
setInterval(() => { // 异步渲染 例如下面 连续三个 每次跳转就是 加3, 因为是返回的最后结果,而不会一步一步的返回
  app.text++
  app.text++
  app.text++
  // i++
  // app.obj.a = i
  // app.$set(app.obj, 'a', i)
  // app.$forceUpdate()  vue是响应式框架, 设置了原来没有得属性, 那么不会被渲染,后面变得值,也不会变,所以用强制刷新
}, 2000)

// vue 实例的属性
// console.log(app.$data)
// console.log(app.$props);
// console.dir(app.$el); // 打印的就是节点
// console.log(app.$options);

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// } // 是有用的 只有 原来的值发生了一次变化
// console.log(app.$root === app); // true
// console.log(app.$children);
// console.log(app.$slots);
// console.log(app.$scopedSlots);
// console.log(app.$refs);
// console.log(app.$isServer);

// 实例的方法

// const unWatch = app.$watch('text', (n, o) => {
//   console.log(n + ':' + o);
// }) // 跟watch属性一样

// setTimeout(() => {
//   unWatch() // 注销
// }, 2000);

// app.$on('test', (a, b) => {
//   console.log('test' + a + ' ' + b);
// }) // 监听事件

// app.$emit('test', 10, 15) // 得同时作用在同个对象 不会冒泡

// app.$once('test', (a, b) => { // 只监听一次
//   console.log('test' + a + ' ' + b);
// })
// setInterval(() => {
//   app.$emit('test', 10, 15)
// }, 1000);

// app.$forceUpdate() // 强制vue重新渲染, 重载
