<template>
  <section class="real-app">
    <div class="tabs-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab v-for="tab in status" :key="tab" :label="tab" :index="tab" />
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus
      placeholder="I want to do someting?"
      @keyup.enter="handleAdd"
    />
    <Item v-for="item in filterdToods" :key="item.id" :todo="item" @del="deleteTodo" @toggle="toggleTodoState"/>
    <helper :filter="filter" :todos="todos" @clearAllCompleted="clearAllCompleted" />
  </section>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import Item from "./item.vue";
import helper from "./helper.vue";
let id = 0;
export default {
  metaInfo: {
    title: 'The Todo App'
  },
  beforeRouteEnter (to, from, next) {
    console.log('todo beforeEnter');
    next()
  },
  components: {
    Item,
    helper,
  },
  mounted() {
    if (this.todos && this.todos.length <= 0) {
      this.fetchTodos()
    }
  },
  asyncData({ store, router }) {
    if (store.state.user) {
      return store.dispatch('fetchTodos')
    }
    router.replace('/login')
    return Promise.resolve()
  },
  data() {
    return {
      filter: "all",
      status: ["all", "active", "completed"]
    };
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
      ]),
    handleAdd(e) {
      const content = e.target.value.trim()
      if(!content){
        this.$notify({
          content: '要输入内容哦!'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = "";
    },
    clearAllCompleted() {
      this.deleteAllCompleted()
    },
    handleChangeTab(index) {
      this.filter = index
    },
    toggleTodoState(todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    }
  },
  computed: {
    ...mapState(['todos']),
    filterdToods() {
      if (this.filter === "all") return this.todos;
      const completed = this.filter === "completed";
      return this.todos.filter((value) => completed === value.completed);
    },
  },
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.tabs-container
  background-color #fff
  padding 0 15px
</style>
