import * as type from './types'

export default {  
  [type.REQUEST_PRODUCT_BY_OWNER] (state) {
    state.isFetching = true
    state.error = null
  },

  [type.REQUEST_PRODUCT_BY_OWNER_SUCCESS] (state, action) {
    state.isFetching = false
    state.items = [...action.payload]    
    state.error = null
  },

  [type.REQUEST_PRODUCT_BY_OWNER_ERROR] (state, action) {
    state.isFetching = false
    state.error = action.error
  }
}