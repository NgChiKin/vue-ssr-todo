export default {
  fullName(state) {
    return state.lastName + ' ' + state.firstName
  }
} // 完全可以理解为组件内的 computed属性
