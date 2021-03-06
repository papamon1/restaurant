import * as type from './types'

export default {  
  [type.REQUEST_RESTAURANT] (state) {
    state.isFetching = true
    state.error = null
  },

  [type.REQUEST_RESTAURANT_SUCCESS] (state, action) {    
    state.isFetching = false
    state.item = action.payload
    state.error = null
  },

  [type.REQUEST_RESTAURANT_ERROR] (state, action) {
    state.isFetching = false
    state.error = action.error
  }
}