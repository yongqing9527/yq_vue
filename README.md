# yq_vue
## vue-cli  2.0 版本
      npm install vue-cli -g
      vue init webpack my-project
## vue-cli  3.0 版本
      npm install -g @vue/cli
      vue create hello-world
      
## 预处理

    npm install sass-loader node-sass style-loader --save-dev
    // 页面引用
    <style lang="scss">
      @import './login.scss';
    </style>
    //webpack配置
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }

## vue-cli 中如何插入jquery
1.安装jquery包

    npm install jquery -–save-dev
2.修改2处webpack.base.conf.js文件

    // 第一处引用webpack
    const webpack = require('webpack');
    //第二处配置jQuery插件
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: 'jQuery'
      })
    ]
3.需要的页面中，直接 

    import $ from 'jquery'
4.不要用  $(this)  这个和jquery不一样，获取不到你想要的this

5.最好不要再vue-cli中使用jquery，会在编译中发生意外的行为， ------警告，其实也能用
# vue 引入ico
* 把 favicon.ico 放入根目录下
* 在webpack.dev.conf.js中加入
    
      new HtmlWebpackPlugin({      //自动生成html文件,比如编译后文件的引入
        filename: 'index.html',    //生成的文件名
        template: 'index.html',    //模板
        inject: true,
        favicon: './favicon.ico'   //加入这一行
      }),
* <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico"/>
# mescroll.js 下拉上拉
      npm install --save mescroll.js 
      // main.js引入
      import 'mescroll.js/mescroll.min.css'
      // .vue 页面
      <!--mescroll滚动区域的基本结构-->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
         <!--内容...-->
      </mescroll-vue>
      import MescrollVue from 'mescroll.js/mescroll.vue'
      link：https://github.com/mescroll/mescroll
# swiper 轮播图
      npm install vue-awesome-swiper --save
      // main.js 引入
      import VueAwesomeSwiper from 'vue-awesome-swiper'
      Vue.use(VueAwesomeSwiper)
      // .vue 文件
      <!-- slides -->
        <swiper-slide>I'm Slide 1</swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>//
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
      // 引用
      import { swiper, swiperSlide } from 'vue-awesome-swiper'
      components: { swiper, swiperSlide }
      <swiper :options="swiperOption" ref="mySwiper">
      //配置
      swiperOption: {}
      文档：https://www.swiper.com.cn/api/autoplay/295.html
# $http请求

    npm install vue-resource --save-dev
    //main.js引入
    import VueResource from 'vue-resource'
    Vue.use(VueResource)
    
    this.$http({
        url: '',
        method: 'post',
        body: {
          'ProcessCode': 'MD'
        }
     }).then((text) => {
        console.log(text);
     })
     参考： https://www.jianshu.com/p/ed9e98731d96
# $axios请求      推荐  
        
    npm i axios --save-dev
    // main.js 引入
    import axios from 'axios'
    Vue.prototype.$axios = axios
    
    this.$axios({
        url: '',
        method: 'post',
        data: {
          'ProcessCode': 'MD'
        },
        responseType: 'json',
    }).then((text) => {
        console.log(text.data);
    })
    参考： https://www.kancloud.cn/yunye/axios/234845
    封装： https://github.com/zaofeng/just_for_base
    
# echarts依赖
      1. npm install echarts -S
      2. main.js 引入
      import echarts from 'echarts'
      Vue.prototype.$echarts = echarts
      参考： https://blog.csdn.net/mr_wuch/article/details/70225364
      
# vue-cli 引入组件
* 新建一个.vue 文件写入内容
* 在要引入的页面中写入

      <baHeader></baHeader>
      import baHeader from '../public/header'
      components: {
        baMaHeader
      },
* 组件传值
       
      // 父组件 应用
      <baMaFooter :flag1 = 'flags'></baMaFooter>
      //子组件 在components后面写，和data平级
      props: ['flag1', 'flag2', 'flag3', 'flag4']
如何在子组件中改变父组件的值

    // 父组件 应用
     <baMaSearch :actives = "searchFlag" v-on:noSearch="back($event)"/>
       methods: {
        back: function (sflag) {
          this.searchFlag = sflag   // 接收这个参数，改变父组件data的值
        }
       }
    //子组件
     <input type="button" value="取消" @click="back">
       methods: {
        back: function () {
          this.$emit('noSearch', false)  // 派出$emit 自定义事件 让父组件接受一个参数
        }
       }
# vue打包 注意
* config >> index.js

      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsSubDirectory: 'static',
      assetsPublicPath: './',
* build >>  utils.js

      if (options.extract) {
        return ExtractTextPlugin.extract({
          use: loaders,
          publicPath: '../../',
          fallback: 'vue-style-loader'
        })
      } else {
        return ['vue-style-loader'].concat(loaders)
      }
* 开启 mode: 'history' 以后，打包也会空白

      Apache安装：https://jingyan.baidu.com/article/d8072ac47baf0eec95cefdca.html
      nginx
      // https://router.vuejs.org/zh/guide/essentials/history-mode.html
# vue-cli2如何使用vue-xmobile
      npm install vue-xmobile --save-dev
1. webpack.base.conf.js 中

2.config >> index.js 中


# vue常用的库
## 1. ElemeFE/element
    
    link：https://github.com/ElemeFE/element
    官网：http://element-cn.eleme.io/#/zh-CN
##  2. bailicangdu/vue2-elm

    link：https://github.com/bailicangdu/vue2-elm
    仿照饿了么页面写的项目，可供学习参考
## 3. iview/iview

    link：https://github.com/iview/iview
    官网：https://www.iviewui.com/
    一套基于 Vue.js 的高质量UI 组件库
    iView Admin GitHub：https://github.com/iview/iview-admin
## 4. airyland/vux

    link：https://github.com/airyland/vux
    官网：https://vux.li/
    一个凑合的 Vue.js 移动端 UI 组件库
## 5. ElemeFE/mint-ui

    link：https://github.com/ElemeFE/mint-ui
    官网：http://mint-ui.github.io/docs/#/zh-cn2
    基于 Vue.js 的移动端组件库。
    
## 6. vue-bulma/vue-admin

    link：https://github.com/vue-bulma/vue-admin
    官网：https://admin.vuebulma.com
    Vue管理面板框架
## 7. museui/muse-ui

    link：https://github.com/museui/muse-ui
    官网：https://museui.github.io
    基于 Vue 2.0 优雅的 Material Design UI 组件库
## 8.vuematerial/vue-material

    link：https://github.com/vuematerial/vue-material
    官网：https://vuematerial.io/
    个人觉得不咋滴
## 9. PanJiaChen/vue-element-admin

    link：https://github.com/PanJiaChen/vue-element-admin
    和2一样，是一个简单的后天项目，学习可以参考
## 10.ghosh/uiGradients

    link：https://github.com/ghosh/uiGradients
    官网：http://uigradients.com/
