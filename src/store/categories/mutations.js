import * as type from './types'

export default {  
  [type.REQUEST_CATEGORIES] (state) {
    state.isFetching = true
    state.error = null
  },

  [type.REQUEST_CATEGORIES_SUCCESS] (state, action) {
    state.isFetching = false
    state.items = [...action.payload]    
    state.error = null
  },

  [type.REQUEST_CATEGORIES_ERROR] (state, action) {
    state.isFetching = false
    state.error = action.error
  }

}