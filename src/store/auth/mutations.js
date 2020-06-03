import * as type from './types'

export default {  

  [type.SET_AUTH_USER] (state, user) {    
    return state.item = user
  },
  [type.USER_LOGIN] (state, authState) {
    return state.isAuthResolved = authState
  },
}