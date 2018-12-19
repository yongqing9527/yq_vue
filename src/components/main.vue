
<template>
  <rt-view>
    <rt-header>
        <rt-navbar class="demo-header">
          <span>首页</span>
        </rt-navbar>
    </rt-header>
    <rt-content class="cus-content" style="background:#F3F3F3">
      <component v-bind:is="currentTabComponent"></component>
    </rt-content>
    <rt-footer v-if="footerShown">
      <ul class="demo-footer">
        <li v-for="(item,index) in tabbarList" :key="index">
          <rt-icon :name="item.icon"></rt-icon>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </rt-footer>
  </rt-view>
</template>

<script>
/* eslint-disable */
import DemoIndex from './demoIndex';
export default {
  name: 'main',
  data () {
    return {

    }
  },
  components: {
    DemoIndex
  },
  computed: {
    currentTabComponent: function() {

    }
  },
  methods: {
    async apitest() {
      // 菜单栏数据
      let url = '/api/portalmenu/MobileMenu/'
      let res = await rt.get(url)
      this.listArr = res.SystemMenuList[0].Children
      console.log(this.listArr);

      // 销售额数据
      let url1 = '/api/dashboard/GetKpiList'
      let res1 = await rt.get(url1)
      res1.forEach((value,index) => {
        value.KpiValue.replace(/([0-9]+\.[0-9]+)/g,function($1){
          value.KpiNub = $1
        })
        value.KpiUnit = value.KpiValue.replace(/([0-9]+\.[0-9]+)/g,"")
      })
      this.GetKpiList = res1

      // 消息数据
      let url2 = '/api/dashboard/GetMessageList'
      let res2 = await rt.get(url2)
      this.GetMessageList = res2;

      // 重新new一下scroll
      this.scrollData = {
        loadComplete: util.newGuid()
      };
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.demo-footer {
  width: 100%;
  height: 44px;
  font-size: 11px;
}
.demo-footer li {
  width: 25%;
  height: 100%;
  float: left;
  text-align: center;
}
</style>
