import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: '<div><span>propOne: {{propOne}}</span> This is {{text}} component <span v-show="active">测试props</span></div>',
  data() {
    return {
      text: 'ngchikin`s'
    }
  },
  mounted() {}
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  extends: component,
  data() {
    return {
      text: 'wuzijian'
    }
  },
  mounted() {
    console.log(this.$parent.$options.name);
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#app',
//   propsData: {
//     active: true
//   },
//   data () {
//     return {
//       text: 'abc'
//     }
//   },
//   mounted () {
//     console.log('CompVue change');
//   }
// })

new Vue({ // 在new 一个vue的时候 才能指定一个 parent对象
  parent: parent,
  name: 'Root',
  components: {
    Comp: component2
  },
  el: '#app',
  template: `
    <comp />
  `,
  mounted() {
    console.log(this.$parent.$options.name);
  }
})
