import model from 'model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  if (err.code === 401) {
    notify({
      content: '你得先登录啊!'
    })
    bus.$emit('auth') // 事件订阅
  }
}

// 异步代码放 actions里面 处理异步的修改数据的方法
// 可以简单理解为 有数据请求 修改数据的可以放在 actions里s
export default {
  updateCountSync(store, data) {
    setTimeout(() => {
      store.commit('updatedCount', data.num)
    }, data.time);
  },
  fetchTodos({
    commit
  }) {
    commit('startLoading')
    return model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },

  addTodo({
    commit
  }, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做'
        })
      })
      .catch((err) => {
        commit('endLoading')
        notify({
          content: '添加失败'
        })
        handleError(err)
      })
  },

  updateTodo({
    commit
  }, {
    id,
    todo
  }) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(() => {
        commit('endLoading')
        commit('updateTodo', {
          id,
          todo
        })
        notify({
          content: todo.completed ? '多了一件完成的事' : '少了一件完成的事'
        })
      })
      .catch((err) => {
        commit('endLoading')
        handleError(err)
      })
  },

  deleteTodo({
    commit
  }, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('endLoading')
        commit('deleteTodo', id)
        notify({
          content: '你又少一件要做的事情'
        })
      })
      .catch((err) => {
        commit('endLoading')
        handleError(err)
      })
  },

  deleteAllCompleted({
    commit,
    state
  }) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    commit('startLoading')
    model.deleteAllCompleted(ids)
      .then(data => {
        commit('endLoading')
        commit('deleteAllCompleted')
        notify({
          content: '清理了一下~~~~'
        })
      })
      .catch((err) => {
        commit('endLoading')
        handleError(err)
      })
  },

  login({
    commit
  }, {
    username,
    password
  }) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
        })
        .catch(err => {
          handleError(err)
          reject(err)
        })
    })
  }
}
