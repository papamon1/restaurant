import Vue from 'vue'
import * as type from './types'

export default {  
  [type.ADD_CART_ELEMENT] (state, action) {    
    state.isFetching = false
    let index=state.items.length
    Vue.set(state.items, index, action.payload)
    state.error = null
    return action.payload
  },

  [type.REMOVE_CART_ELEMENT] (state, action) {        
    Vue.set(state, 'items', action.payload)
    state.error = null
    return state
  },

}