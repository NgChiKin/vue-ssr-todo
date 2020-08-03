import Vue from 'vue'

const app = new Vue({
  // el: '#app',
  template: '<div> test <b>ngchikin</b> {{text}}</div>',
  data: {
    text: 'shuai'
  },
  beforeCreate () {
    console.log(this.$el, this.$data, 'beforeCreate');
  },
  created () {
    console.log(this.$el, this.$data, 'Created');
  }, // 服务端渲染的时候只会调用这上面两个方法
  beforeMount () {
    console.log(this.$el, this.$data, 'beforeMount');
  },
  mounted () {
    console.log(this.$el, this.$data, 'mounted'); // 做一些跟document 有关的都放mounted里面
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate');
  },
  updated () {
    console.log(this, 'updated');
  },
  activated () {
    console.log(this, 'activated');
  },
  deactivated () {
    console.log(this, 'deactivated');
  }

})

app.$mount('#app')
