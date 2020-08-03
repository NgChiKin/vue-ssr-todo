<template>
  <div id="app">
    <div id="cover"></div>
    <div id="loading" v-show="loading">
      <loading />
    </div>
    <div id="todo">
      <Header />
      <!-- <router-link to="/app">app</router-link>
      <router-link to="/login">login</router-link>-->
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <Footer></Footer>
      <router-view name="a" />
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
import Loading from './components/loading/loading.vue'
export default {
  metaInfo: {
    title: "wuzijian's Todo App",
  },
  components: {
    Header,
    Footer,
    Loading
  },
  mounted() {
    // console.log(this.$store);
    // this.updateCountSync({
    //   num: 5,
    //   time: 5000,
    // });
    // this['a/updateText']('wuzijain')
  },
  methods: {
    // ...mapActions(["updateCountSync"]),
    // ...mapMutations(['a/updateText'])
    // notify() {
    //   this.$notify({
    //     content: "text notify",
    //     btn: "close",
    //   });
    // },
  },
  computed: {
    ...mapState(['loading'])
    // ...mapState(['count']),
    // ...mapState({
    //   counter: 'count'
    // }),
    // ...mapState({
    //   counter: (state) => state.count,
    // }),
    // count() {
    //   return this.$store.state.count
    // },
    // fullName() {
    //   return this.$store.getters.fullName;
    // },
    // ...mapGetters({
    //   fullname: "fullName",
    //   // textPlus: 'a/plusText'
    // }),
    // aText() {
    //   return this.$store.state.a.text
    // }
  },
};
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.4;
  z-index: 0;
}

#todo {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0.9;
  z-index: 1;
}

#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
