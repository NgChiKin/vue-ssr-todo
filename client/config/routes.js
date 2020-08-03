import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    // props: true, // 配置了这个这个id会作为 props 传进组件里 不需要用$route对象去获取
    components: {
      default: Todo
      // a: Login
    },
    name: 'app', // 可以根据这个name 进行路由跳转
    meta: { // 用来保存路由信息的
      title: 'this is app',
      description: 'wuzijian'
    },
    beforeEnter: (to, from, next) => {
      console.log('app route beforeEnter')
      next()
    }
  },
  {
    path: '/login',
    component: Login
  }
]
