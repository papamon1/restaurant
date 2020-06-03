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

  [type.UPDATE_CART_ELEMENT] (state, action) {  
    Vue.set(state.items, action.index, action.element)    
    return state
  },

  [type.REMOVE_CART_ELEMENT] (state, action) {    
    state.items.splice(action.payload, 1)        
    return state
  },
}