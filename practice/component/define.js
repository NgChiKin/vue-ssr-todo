import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: '<div><span>propOne: {{propOne}}</span> This is {{text}} component <span v-show="active">测试props</span></div>',
  data () {
    return {
      text: 'ngchikin`s'
    }
  }
}

// Vue.component('CompOne', component)

new Vue({
  components: {
    CompOne: component
  },
  el: '#app',
  template: `
  <div>
    123
    <comp-one :active="true" prop-one="wuzijian"/>
    <comp-one :active="false"/>
  </div>`
})
