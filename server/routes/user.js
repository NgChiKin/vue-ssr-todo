const Router = require('koa-router')

const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body

  if (user.username === 'wuzijian' && user.password === 'wuzijian') {
    ctx.session.user = {
      username: 'wuzijian'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'wuzijian'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: '密码错误'
    }
  }
})

module.exports = userRouter
