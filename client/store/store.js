import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 'nghickin'
    //     },
    //     mutations: {
    //       updateText(state, s) {
    //         state.text = s
    //       }
    //     },
    //     getters: {
    //       plusText(state, getters, rootState) {
    //         return state.text + rootState.count
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       value: 18
    //     }
    //   }
    // }
  })

  if (module.hot) { // 开启 vuex的热更替模块
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
