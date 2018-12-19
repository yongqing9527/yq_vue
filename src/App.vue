<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      route: state => state.route,
      direction: state => state.navigator.direction
    }),
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "../node_modules/vue-xmobile/src/style/index";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #F3F3F3;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
