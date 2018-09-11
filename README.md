# yq_vue
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
