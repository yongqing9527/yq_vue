<template>
  <rt-view>
    <rt-header>
        <rt-navbar>
          <span>{{ title }}</span>
          <rt-button text round size="small" slot="right" @click="edit">编辑</rt-button>
        </rt-navbar>
    </rt-header>
    <rt-content>

    </rt-content>
    <rt-footer v-if="footerShown">
      <rt-tabbar :tab-list="tabbarList" v-model="tabSelected"></rt-tabbar>
    </rt-footer>
  </rt-view>
</template>

<script>
/* eslint-disable */
export default {
  name: 'page1',
  data() {
    return {
      title: '列表',
      tabbarList: [{
          name: "首页",
          title: "首页",
          icon: "fa fa-eye",
          iconActive: "fa fa-eye"
        },
        {
          name: "次页",
          title: "次页",
          icon: "fa fa-eye",
          iconActive: "fa fa-eye",
          // component: () => import("./page2")
        },
        {
          name: "尾页",
          title: "尾页",
          icon: "fa fa-eye",
          iconActive: "fa fa-eye",
          // component: () => import("./page3")
        }
      ]
    }
  },
  methods: {
     edit() {
      this.$router.push({
        name: 'edit-list'
      });
    },
  }
}
</script>

