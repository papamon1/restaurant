// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
import Vue from 'vue'
import Vuex from 'vuex'

import restaurants from './restaurants'
import products from './products'
import extras from './extras'
import cart from './cart'
import categories from './categories'
import orders from './orders'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    restaurants,
    products,
    extras,
    cart,
    categories,
    orders
  },
  mutations: {
    setItems (state, {resource, items}) {
      state[resource].items = items
    },
    setItem (state, {resource, item}) {
      state[resource].item = item
    },
    addItemToArray (state, {item, index, resource}) {
      Vue.set(state[resource].items, index, item)
    }
  }
})

export default Store
