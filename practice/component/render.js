import Vue from 'vue'

const component = {
//   template: `
//   <div :style="style">
//       <slot value="789" aaa="1111"></slot>
//   </div>
// `,
  props: ['prop1'],
  render(createElement) {
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => this.$emit('click')
      // }
    }, [
      this.$slots.default,
      this.prop1
    ])
  },
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
  el: '#app',
  data() {
    return {
      value: '123'
    }
  },
  methods: {
    handleClick() {
      console.log('clicked');
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,
  render(createElement) {
    return createElement('comp-one', {
      ref: 'comp',
      props: {
        prop1: this.value
      },
      // on: {
      //   click: this.handleClick
      // }
      nativeOn: {
        click: this.handleClick
      }
    },
    [
      createElement('span', {
        ref: 'span'
      }, this.value)
    ])
  }
})
