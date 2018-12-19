/* eslint-disable */
import {UPDATE_CART_LIST, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from './mutation-type.js'
import Vuex from 'vuex'
import Vue from 'vue'
import VueXmobile from 'vue-xmobile'

Vue.use(Vuex)

const store = VueXmobile.getStore()

const cart = {
  state: {
    dataList: [] // 购物车列表数据
  },
  getters: {
    cartCount (state) {
      let count = 0
      state.dataList.forEach(data => {
        count = count + data.ShoppingCartList.length
      })
      return count
    }
  },

  mutations: {
    [UPDATE_CART_LIST] (state, dataList) {
      state.dataList = dataList
    }
  },
  actions: {
    async [UPDATE_CART_LIST] ({commit}) {
      let url = '/api/ShoppingCart/GetShoppingCartList/'
      let res = await rt.get(url)
      let dataList = res.map(item => {
        item.currentIndex = -1
        item.ShoppingCartList.forEach(product => {
          product.checked = false
        })
        return item
      })
      commit(UPDATE_CART_LIST, dataList)
    },
    async [ADD_PRODUCT] ({dispatch}, product) {
      let url = '/api/ShoppingCart/CreateShoppingCart/'
      await rt.post(url, product)
      dispatch(UPDATE_CART_LIST)
    },
    async [UPDATE_PRODUCT] () { },
    async [DELETE_PRODUCT] ({dispatch}, ids) {
      let url = 'api/ShoppingCart/DeleteShoppingCart?id=' + ids.toString()
      await rt.post(url)
      dispatch(UPDATE_CART_LIST)
    }
  }
}

store.registerModule('cart', cart)

export default store
