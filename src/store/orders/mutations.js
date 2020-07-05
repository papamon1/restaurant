import * as type from './types'

export default {  
  [type.CREATE_ORDER] (state) {
    state.isFetching = true
    state.error = null
  },

  [type.CREATE_ORDER_SUCCESS] (state, action) {
    state.isFetching = false
    state.item = {...action.payload}
    state.error = null
  },

  [type.CREATE_ORDER_ERROR] (state, action) {
    state.isFetching = false
    state.error = action.error
  },

  [type.CREATE_STRIPE_SESSION] (state, action) {
    state.isFetching = true
    state.error = action.error
  },

  [type.CREATE_STRIPE_SESSION_SUCCESS] (state, action) {
    state.isFetching = false
    state.error = action.error
  }
}