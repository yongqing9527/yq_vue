
<template>
  <rt-view>
    <rt-header>
        <rt-navbar>
          <span>{{ title }}</span>
          <rt-button text round size="small" slot="right" @click="edit">编辑</rt-button>
        </rt-navbar>
    </rt-header>
    <rt-content class="cus-content">
      <rt-scroller :data="scrollData" :moreData="moreData" pull-down-refresh="true"
        @pulling-down="loadData" :pull-up-load="hasData" @pulling-up="loadMore">
        <slot name="listHeader"></slot>
          <div v-if="hasData">
            <swiper
              style="background: #ddd"
              height="180px"
              dots-class="custom-bottom"
              :duration= 500
              dots-position="center">
              <swiper-item class="swiper-demo-img" v-for="(item, index) in brr" :key="index">
                <img :src="item.img">
              </swiper-item>
            </swiper>
            <ul class='tit-ul'>
              <li v-for="(item, index) in arr" :key="index" @click="click(index)" :class="[index == lisIndex ? 'active' : '']">
                {{ item.title }}
              </li>
            </ul>
            <ul>
              <li v-for="(item,index) in arr" :key="index" v-show="lisIndex == index">
                {{ item.content }}
                <ul>
                  <li v-for="index in nub" :key="index">{{ index }}</li>
                </ul>
              </li>
            </ul>
          </div>
        <rt-empty v-else></rt-empty>
      </rt-scroller>
    </rt-content>
    <rt-footer v-if="footerShown">
      <rt-tabbar :tab-list="tabbarList" v-model="tabSelected" style="position:fixed;"></rt-tabbar>
    </rt-footer>
  </rt-view>
</template>

<script>
/* eslint-disable */
import { Swiper, SwiperItem } from 'vux'
// import { AssertionError } from 'assert';
import * as util from "../../node_modules/vue-xmobile/src/libs/util";
import rtScroller from "../../node_modules/vue-xmobile/src/components/rtScroller";
import rtEmpty from "../../node_modules/vue-xmobile/src/components/rtEmpty";
// import { setTimeout } from 'timers';
export default {
  name: 'HelloWorld',
  data () {
    return {
      nub: 20,
      arr: Array,
      brr: Array,
      lisIndex: 0,
      title: String,
      footerShown: true,
      tabSelected: 1,
      scrollData: null,
      moreData: 1, // -1 第一页空行 0 非第一页空行 1 等于页大小 2 小于页大小
      tabbarList: [{
          name: "首页",
          title: "首页",
          icon: "fa fa-eye",
          iconActive: "fa fa-eye",
        },
        {
          name: "次页",
          title: "次页",
          icon: "fa fa-eye",
          iconActive: "fa fa-eye"
        },
        {
          name: "尾页",
          title: "尾页",
          icon: "fa fa-eye",
          iconActive: "fa fa-eye",
        }
      ]
    }
  },
  components: {
    Swiper, SwiperItem, rtScroller, rtEmpty
  },
  computed: {
    hasData() {
      // let hasArr = [this.arr, this.brr]
      // hasArr.forEach(length =>{
      //   console.log(length)
      // })
      return this.arr.length > 0;
    }
  },
  methods: {
    edit() {
      this.$router.push({
        name: 'edit-list'
      });
    },
    click (index) {
      this.lisIndex = index
      this.title = this.arr[index].title
    },
    loadData () {
      this.apitest();
    },
    loadMore () {
      setTimeout(() =>{
        this.nub += 15;
      },1000)
      this.scrollData = {
          loadComplete: util.newGuid()
        };
    },
    fetch (page) {
      return this.getDataList(page.pageIndex).then(resp => {
        return resp;
      });
    },
    getDataList(index) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let retArray = [];
          for (let i = 1; i <= 15; i++) {
            retArray.push(15 * (index - 1) + i);
          }
          resolve(retArray);
        }, 1000);
      });
    },
    async apitest(){
      let url = '/get'
      let res = await rt.get(url)
      this.arr = res
      this.title = res[0].title

      let url1 = '/get/list'
      let res1 = await rt.get(url1)
      this.brr = res1

      this.scrollData = {
        loadComplete: util.newGuid()
      };
    }
  },
  mounted () {
    this.apitest()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@deep-selecter : ~">>>";

.cus-content @{deep-selecter} .rt-list{
    padding: 10px 15px;
    background: #fff;
    margin-bottom: 10px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.tit-ul li{
  display: inline-block;
}
li {
  margin: 0 10px;
  &.active {
    color: #42b983;
  }
}
a {
  color: #42b983;
  border: 1px dashed



}
</style>
