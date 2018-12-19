
<template>
  <rt-view>
    <rt-header>
        <rt-navbar class="demo-header">
          <span>首页</span>
        </rt-navbar>
    </rt-header>
    <rt-content class="cus-content" style="background:#F3F3F3">
      <rt-scroller :data="scrollData" :moreData="moreData" pull-down-refresh="true"
        @pulling-down="loadData">
        <slot name="listHeader"></slot>
          <div v-if="hasData">
            <!-- echart图表 -->
            <div class="demo-echart">
              <rt-button-tab class="demo-echart-button" :tab-list="tabList" @on-item-click="onItemClick"></rt-button-tab>
              <div class="demo-echart-legend"><span>销售额，单位：万元</span></div>
              <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
            </div>
            <!-- 销售额 -->
            <div class="demo-cont-list">
              <ul class="demo-list-sale">
                <li v-for="(item,index) in GetKpiList" :key="index">
                  <p>{{ item.KpiName }}</p>
                  <span><strong>{{ item.KpiNub }}</strong>{{ item.KpiUnit }}</span>
                </li>
              </ul>
              <div class="demo-list-sale-more">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAArCAYAAADPGFBSAAAKBklEQVRoQ+1Ze2xUZRb/ne/eO3Pn0dLSltY+oKUtFCoQBAoiCKyixgooi481KDExi3/g7iY8lDVm0RhilN1saKAS3azG3c2G3UVBlDU+WNfVjeK6K4KworxaaEuf0+m087j3ns13p52W0tqZaSuQ7E1uMsmc7zvnd37nnO985xIuw5N2fO9yYfIuqdpSaG1b2Yp9l8EM0OVQOvbo63Ug5HTrrm+Zeuc1l8OO/4P/vr2ednzfCmFZL9hhL8QjbWXL9w7HBt692xXQ9WdB9BAJ4WLgCDNXeysrXyIia7C9LwvzwwHaf+2FLVtyXDNnvkmqep3h8xmR+jqQqrIjL79d6PpRJlqVcvvtjQPpvKrBN2xav9JRXLJTyx+f3XHsKDqPHYMQCkgICCHgLCpqdk8tP+NR1aV0220t/R1wVYI/v359plCpCopyn2fufITq69D68UcQihJ9hYg6gAS0jAy/Z07FR55g8A665x6zrwOuOvCSbSbsBChbHZcNffIU1L/5BqxAwAaudDuAKOoAIoIjJ8fnuW7WNk9l5TNXJfi6zY9mkemoAtG9PQCck6eAFQX1bx+AoqpQFNUOe6HIsJfhT7CdQATXtGm17ty8H+jLlp3oWX9VMF/3+Ma7iXkHgKy+zLlnV6D966/RfuSwDV4o0gEy7BWQdIDNfrcDVDXsvXHRH1NXrlxzVYCXbAvLuYOBuweq1p4Fi9D4wUF01db0Mh/Le+mEXuZBBGfB+GZ96tSbvMuWfSH3u2KZH4ztmBNUFd75C3Fu7x5EfD4oqgZFlTnfG/oy5O3iRwQJXghheW9cVJWyatXPrkjwQ7EdC1mnE7LS1+zfBw4GQYYBQYiC7w79aNXvZd8ufsUT60X5tLKxS5f6rijm6x/bcB8zqoiQOVQjRLoOT8X1iKRnA6pmFzY2DXAoBKE7oI3xoH3Pn2HU1MSqvgQrdL3Du3jJOu8dd7xyRYCv37BhHAuuJqKVQ4GOMa9p8Fy/AJG0LEB12ABBwv5bLxkPxeOG6fejaeszQGenHQEyyyX77oqK36Q98ODD3wmet2wRaCxKpx1rmuM1KlE5yTYYVYiD7Yv2JoJ3wSJExmQADlc3+ChAd3mJbHFt8Y733kFg375Y3tuhX1R0oSG/oOAS8MGNLxcLppsJtBTES4jET9TnHvh9oqCGkk+G7f57uufdADM9C9A9IKHYRU2+7vJSkKrY4lagA41PPgFYbDtAvkp6er1r3vWrSLJrBib+EMDNFmMpEYpiShisOtRraOv9DUOBSeT/+o3rfwSi7Qmz3U+Ja8ZMcHYe2J0CKKqd9xK8a3IRhO6MSbds/zUiJ092g5eJr1gpNy/9qc18ZOPLGwDx3ABH32Ht+QdnJALsu2RPbdyY4xZWNYPuHIk9nSWTICZMhOlNAylaLPSdE3KhpqXGVPj3vo7Og+9FQ787770LFm6Nhf2ADmD+lbZtzfqRMLT+sQ33A9gOIGMk9pN7aPkF0Eomw0jNAMmKbxc9gpqRBmd+73Co8x8fwv+n3RflvWv6jNcuyvn+DjAtvl3/5ZoDwzF2pNnuawu53fDMnouwBK85e/NeVeGeWhx1BoCuQ5/C97tXYzkvI8A5afKJSwperwM4rHqCY2nL2s5kwY8G25cUvTnzYI3Niua97Om7896Rlw0tM90WD/ztIPx7/tJ73hPgLC7tHPCosx3AolLb9uCSZIC37dyZHvG1HDTb2kasXgxmh2NiMdTCEhipY0F9ih4UAVdJod3wtFTvRPjYV73dHgBnaengvT0//ttCevah08mA91VXrwuer63icCiZ5QmtEV4vXNfNgTEmC9B6mp1oYbO6Agh/cQihL7+IDTd6+nx90qTRudj4XnzxF8EzJ7dwJJIQkGSFXTNnA1k5sDxj7LxnmeeHP0fXoY8gTNPu9fsON+z7ffm1LaPS3vp27VoXqj9XZXUmXS4S8oOc6DinlMNIz0akqQnt7/8VZvOF7xxueOfO+2RUwLdUV19r+X1fGs1NCYFIWlh2dbMrEPR3oOHAfnugMdRwI/WWW18fFfASRGv1jndDZ8/cBGvQsXnSWAdaqGZmwVk2Fef374Vh3++7x1oDDDfUtDFN7vkLXh018C27do3njva3I81NbjbMbHm0jijaATbTy6eBVQ11B/aDLB50uOGePr3VmZe/etTA97WNAarZtO4aYekTMK3lDcXQMkRIBYIK0KmAAwKwhm8KaRpcs+Yg3NqKpg8OgpgvGW6oKSn+1MVL2jzZ2cXD15ggnWfeufd9TVWXqJrMy94xU/gbx43WvzxhkFXIJApBmECMCSAUMlBIgDseVcKbAnnhMfztaP3nxzA7OmLjbM3t6fDOv4EUj+cpb2Xl898r+M8+Yy2rZfV2VeVHouAVKHLMJAgRR/GsI6k//2pxIUJEJE+rix453kLYUQjBhbCdw1HngOTvQoC8PQtESipc5dMATUO4oR5GaysUr7dDz8sXLMS/vbW1S2jt2siIg//sPGeyaVYQaDqIywAUA5CDgxwGnHrLu0hrfAWqpkKVzNszdsLZrKcRVu2v1hJ4K5jPMdFpAp8goiPEyuff5OHIPUQXfXXpAVy7eXOGCIdt5xBRIbk9E9xTpswUbu88CCEnGxEw/6HLNB/NWrHCL9cNGzwz06EaY6EicBcgbgW4TOb4YCGqBf6L9LPPQHMoUO1pqz1VxdlxTyGsDvmZ3k/ABwC9wULsmZ1LQ56lJ956y1kA5HeFQs3pd93V1teupMHv3s1K6QLzIWbexKDSePLR9rYZQMbxH0NzSOZ78/7cuCcR0gri3UZ6NwTGbmbj6VkF+jdxL+wjmBT4T0915DgcztcYNC9epcwMy2IwA2O/3QAdTdC68162nyeztsESHjsFojfR+EwjIMiER2fmqi/Fa0uPXHwa+u16uM44yIzF8SizmBGJWDboiMkIBC04Ov6D4sAuODXLLnqnHXeiwXELXA6C2yE/Msj5O0FTo/fxoR6y6wQvnp6r/X0o2WGH/dEGMwJGdDw6xBMMmzDMaPG+0G4gbEQXaJYPXus0giIHXSI7tktmioCuRUG7dQXCHj3F9TxRnqNsjUuyWyjunftuerzRfBWM1fEoksyHwhbCBkP+7goxQgbDtOyBqs2yHKlrCuByCDjUaNhLB8TLvLzECSFmTcqkY/HY1COTFPhTp1g3U63tBDwcb3LKnDdMwLQYMhBY5n/34qgDoqBVheyzP/6HzpJprp44Tvsw/jVRyUS0XLJ3jY8rLIs3EWG5jORElQ9T/lsw7VS78EJuLiV1dx4W+B7ja9s5Q4G5HEy3CEELAeQNE9ily8k+2j5ni983YO7PS9U+GagTTETviIDvr7AxwLkKMIPJKiOgmEB2hwci+QFyDMApABx91lkgChDDbwEtYG4EUS0snIbACbJwtNGNo6VEIzoX+x9/kEHEBBv9kgAAAABJRU5ErkJggg==" alt="">
                <swiper direction="vertical" :show-dots="false" class="swiper-demo-ul" auto height="36px" :interval=2000>
                  <swiper-item class="swiper-demo-li" v-for="(item,index) in GetMessageList" :key="index">
                    <a :href='item.Url' >{{ item.Content }}</a>
                  </swiper-item>
                </swiper>
                <div class="sale-more">更多</div>
              </div>
            </div>
            <!-- 菜单列表 -->
            <div class="demo-cont-list">
              <ul>
                <li v-for="(item,index) in listArr" :key="index">
                  <!-- <img src="../assets/img/icon.png" alt=""> -->
                  <img :src="listImg[index]" alt="">
                  <p>{{ item.MenuName }}</p>
                </li>
              </ul>
            </div>
          </div>
        <rt-empty v-else></rt-empty>
      </rt-scroller>
    </rt-content>
    <rt-footer v-if="footerShown">
      <ul class="demo-footer">
        <li v-for="(item,index) in tabbarList" :key="index" @click="togglePage(index)" :class="[index == footerIndex ? 'active' : '']">
          <rt-icon :name="item.icon" width="23" height="23"></rt-icon>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </rt-footer>
  </rt-view>
</template>

<script>
/* eslint-disable */
// import { AssertionError } from 'assert';
import { Swiper, SwiperItem } from 'vux'
import * as util from "../../node_modules/vue-xmobile/src/libs/util";
import rtScroller from "../../node_modules/vue-xmobile/src/components/rtScroller";
import rtEmpty from "../../node_modules/vue-xmobile/src/components/rtEmpty";
import icon from '@/assets/img/icon.png';
import icon1 from '@/assets/img/icon1.png';
import icon2 from '@/assets/img/icon2.png';
import icon3 from '@/assets/img/icon3.png';
// import { setTimeout } from 'timers';
export default {
  name: 'demoIndex',
  data () {
    return {
      tabList: [{ name: "月度销售额" }, { name: "年度销售达成" }],
      title: String,
      ecDate: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ecDate1: ['100', '120', '180', '90', '200', '170', '180', '110', '90', '360', '220', '310'],
      listArr: Array,
      listImg: [ icon, icon1, icon2, icon3],
      GetKpiList: Array,
      GetMessageList: Array,
      footerShown: true,
      footerIndex: 0,
      scrollData: null,
      moreData: 1,
      tabbarList: [{
          name: "首页",
          title: "首页",
          icon: "training-home",
          iconActive: "training-home",
        },
        {
          name: "产品",
          title: "产品",
          icon: "training-product",
          iconActive: "training-product"
        },
        {
          name: "购物车",
          title: "购物车",
          icon: "training-cart",
          iconActive: "training-cart",
        },
        {
          name: "我",
          title: "我",
          icon: "training-mine",
          iconActive: "training-mine",
        }
      ]
    }
  },
  components: {
    rtScroller, rtEmpty, Swiper, SwiperItem,
  },
  computed: {
    hasData() {
      return this.listArr.length > 0;
    }
  },
  methods: {
    onItemClick(tabIndex) {

    },
    togglePage(index) {
      this.footerIndex = index
    },
    loadData () {
      // 下拉刷新
      this.apitest();
    },
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
    },
    demoBar() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: '25%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: this.ecDate,
          axisLine: {
            lineStyle: {
              width: 0,
              color: '#fff'
            }
          },
          "axisLabel":{
            textStyle: {
              fontSize : 10
            },
            interval: 0,
            rotate: 30
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          textStyle: {
            fontSize : 12
          },
          axisLine: {
            lineStyle: {
              width: 0,
              color: '#fff'
            }
          },
          "axisLabel":{
            textStyle: {
              fontSize : 10
            },
          },
          splitLine: {
            lineStyle: {
              color: '#417792'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '销售额',
          type: 'bar',
          data: this.ecDate1,
          barMaxWidth: 13,
          itemStyle : {
            normal : {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#016EA6'
              }, {
                offset: 1,
                color: '#0099FE'
              }]),
              lineStyle:{
                color:'#0099FE'
              }
            }
          },
        }]
      });
    }
  },
  mounted () {
    this.apitest()
    this.demoBar()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@deep-selecter : ~">>>";
@demo-header-bg: #000000;
@demo-header-color: #fff;

.demo-header {
  background: @demo-header-bg;
}
.demo-header @{deep-selecter} .rt-navbar-content{
  color: @demo-header-color;
  font-size: 14px;
  font-weight: 500;
}
.demo-header @{deep-selecter} svg {
  fill: @demo-header-color !important;
}
.demo-echart {
  width: 100%;
  height: 360px;
  overflow: hidden;
  background: -webkit-linear-gradient(bottom, #013c5a 0%, #055882 100%);
  background: linear-gradient(0deg, #013c5a 0%, #055882 100%);
  position: relative;
}
.demo-echart-button {
  width: 240px;
  height: 28px;
  position: absolute;
  top: 15px;
  left: 50%;
  margin-left: -120px;
  z-index: 10;
}
.demo-echart-button @{deep-selecter} a {
  background: transparent;
  color: #0099ff;
  font-size: 12px;
}
.demo-echart-button @{deep-selecter} a.vux-button-tab-item-first:after,.demo-echart-button @{deep-selecter} a.vux-button-tab-item-last:after {
  border: 2px solid #0099ff
}
.demo-echart-legend {
  position: absolute;
  right: 12px;
  top: 50px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABdElEQVQ4T42TvUsDQRDFf3O5InYGDIh9gmUQrWwsbawjmGArKP4HwiEWgggiCrYiitYWSadNGqOQVKIBGxGFhGinRXIje1+5RCVes9zsvPfmzcwK8W/OsZmcyOOyBDoDjAIfIFVEznh4Oefa6YQQibCrx1k0cQFuDkxYY7TiR0Rq0M1zuPxoLn3w+mUGq1MBTZs0FTWZMYKeBtDEtWfZX2gIzpXNp1ZBc30WDEHA7RXhcSmIGOIaIzIjbNwUsDj5oeSpD7oz4KAgpShs1kvAfJ/qrz/x0j3WsrB130QYGw4eyFBawvZTBzQRXcWs/oiFNrwipCvsPDdRoxz4CU391e2oem0Ju68lkH94HjQmZWGvXQA9GVp2HGvUu1r055yaMuuX680mnEf8DNB+T+q076Z9B0dfGTpuBUj/o+tNbGuWlWSjN7yDryyWdeFv2uBqRm2u4bp51pKx3Q7lHLUZ7y6CeVUyDaSAd9Bb4JS3xDmORK/qGx1qfkVsps7nAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-size: 8px;
  background-position: left top 7px;
  padding-left: 15px;
  font-size: 10px;
  color: #ffffff;
  line-height: 26px;
}
.demo-cont-list {
  margin: 0 auto 13px;
  background-color: #ffffff;
  border-radius: 5px;
  width: 95%;
  height: auto;
  position: relative;
  top: -55px;
}
.demo-cont-list>ul {
  height: 75px;
  display: flex;
  justify-content: space-around;

}
.demo-cont-list>ul li {
  font-size: 12px;
  color: #888888;
  text-align: center;
}
.demo-cont-list>ul li img {
  display: block;
  width: 32px;
  height: 32px;
  margin: 12px auto 9px;
}
ul.demo-list-sale {
  height: 45px;
  padding: 20px 0;
  border-bottom: 2px solid #F3F3F3;
  display: flex;
  align-items: center;
}
ul.demo-list-sale li {
  width: 50%;
  height: 100%;
}
ul.demo-list-sale li p {
  font-size: 11px;
  color: #555555;
}
ul.demo-list-sale li span {
  color: #888;
  font-weight: bold;
  font-size: 12px;
}
ul.demo-list-sale li span strong {
  font-size: 17px;
  color: #FF5E4C;
}
.demo-list-sale-more {
  height: 36px;
  padding: 0 65px;
  position: relative;
}
.demo-list-sale-more img {
  width: 32px;
  position: absolute;
  top: 7px;
  left: 12px;
}
.swiper-demo-li {
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  line-height: 36px;
}
.demo-list-sale-more .swiper-demo-li a {
  color: #555555;
}
.sale-more {
  width: 50px;
  height: 60%;
  border-left: 1px solid #cccccc;
  position: absolute;
  right: 0;
  top: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  font-size: 12px;
}
.demo-footer {
  width: 100%;
  height: 40px;
  font-size: 11px;
  padding-top: 4px;
}
.demo-footer li {
  width: 25%;
  height: 100%;
  float: left;
  text-align: center;
  color: #a2a2a2;
  line-height: 13px;
}
.demo-footer li.active {
  color: #0099ff;
}
</style>
