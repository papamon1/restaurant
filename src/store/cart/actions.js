import api from '@/store/api/';
import * as type from './types'

export default {
  getProduct ({ commit },  id ) {      
    return api.get(`/sellers/${id}`)
      .then(res => {
        commit(type.REQUEST_RESTAURANT_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.REQUEST_RESTAURANT_ERROR, { error })
      })
  },

  addCartElement ({ commit }, element ) {    
    return commit(type.ADD_CART_ELEMENT, {payload:element})    
  },

  removeCartElement ({ state, commit }, index ) {        
    const cart = state.items    
    cart.splice(index, 1)
    return commit(type.REMOVE_CART_ELEMENT, {payload:cart})    
  }
}