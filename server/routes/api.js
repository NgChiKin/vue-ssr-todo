const Router = require('koa-router')

const apiRouter = new Router({
  prefix: '/api'
})

const successRespones = data => {
  return {
    success: true,
    data
  }
}

const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

apiRouter.use(validateUser)

apiRouter
  .get('/todos', async ctx => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successRespones(todos)
  })
  .post('/todo', async ctx => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successRespones(data)
  })
  .put('/todo/:id', async ctx => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successRespones(data)
  })
  .delete('/todo/:id', async ctx => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successRespones(data)
  })
  .post('/delete/completed', async ctx => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successRespones(data)
  })

module.exports = apiRouter
