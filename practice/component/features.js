import Vue from 'vue'

const childComponent = {
  template: '<div>this child component {{data.value}}</div>',
  inject: ['yeye', 'data'],
  mounted() {
    // console.log(this.$parent.$options.name);
    console.log(this.yeye);
    console.log(this.value);
  }
}

const component = {
  // template: `
  //   <div :style="style">
  //     <div class="hearder">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="hearder">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `, //  <slot>插槽, 不加的话,vue组件显示不出来 <slot name=""> 具名插槽
  name: 'comp',
  components: {
    ChildComp: childComponent
  },
  template: `
  <div :style="style">
      <slot value="789" aaa="1111"></slot>
      <child-comp />
  </div>
`,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: '456'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  provide() { // 在执行provide属性时, 实例还没有生成, 只能通过函数的方式,在创建过程中访问,才能得到this
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  el: '#app',
  data() {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <comp-one>
        <span slot-scope="item">{{item.value}}</span>
      </comp-one>
      <input type="text" v-model="value"/>
    </div>
  `
})
