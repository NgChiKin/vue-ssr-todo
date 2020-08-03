import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'], // 要双向绑定必须要加value 但有时候还要双向绑定还要value属性props就用model属性.
  template: `
    <div>
      <input type="text" @input="handelInput" :value="value1"/>
    </div>
  `,
  methods: {
    handelInput(e) {
      this.$emit('change', e.target.value)
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
    <comp-one v-model="value"/>
  </div>`,
  data() {
    return {
      value: 123
    }
  }
})
