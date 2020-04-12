import * as type from './types'

export default {  
  [type.REQUEST_RESTAURANT] (state) {
    console.log('antes commit dentro de commit')
    state.isFetching = true
    state.error = null
  },

  [type.REQUEST_RESTAURANT_SUCCESS] (state, action) {
    console.log(action.payload)
    state.isFetching = false
    state.item = action.payload
    state.error = null
  },

  [type.REQUEST_RESTAURANT_ERROR] (state, action) {
    state.isFetching = false
    state.error = action.error
  }
}