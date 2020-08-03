import Vue from 'vue'

new Vue({
  el: '#app',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Name: {{fullName}}</p>
      <p>Number: {{Number}}</p>
      <input type="text" v-model="Number" />
      <p><input type="text" v-model="name" /></p>
    </div>
  `,
  data: {
    firstName: 'zijian',
    lastName: 'wu',
    Number: 0,
    fullName: ''
  },
  methods: {
    getName () {
      console.log('getName invoked');
      return this.firstName + ' ' + this.lastName
    }
  },
  computed: { // 不会每次渲染dom 都被执行
    name: {
      get () {
        console.log('new name');
        return this.firstName + ' ' + this.lastName
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    firstName: {
      handler (n, o) {
        this.fullName = n + ' ' + this.lastName
      },
      immediate: true // 绑定后立即执行
    }
  }
})
