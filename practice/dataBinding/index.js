import Vue from 'vue'

const app = new Vue({
  template: `
    <div>
      {{isActive ? 'ngchikin' : 'wuzijian'}}
    </div>
  `,
  data: {
    text: 1,
    isActive: true
  }
})

app.$mount('#app')
