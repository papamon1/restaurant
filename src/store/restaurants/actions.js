import api from '@/store/api/';
import * as type from './types'

export default {
  getRestaurant ({ commit, dispatch },  id ) {          
    commit(type.REQUEST_RESTAURANT)
    return api.get(`/sellers/${id}`)
      .then(res => {
        commit(type.REQUEST_RESTAURANT_SUCCESS, {
          payload: res.data
        })        
        dispatch('products/getProductsByOwnerId', id, {root:true})
        .then(res2=>{
          return res2;
        })
      })
      .catch(error => {
        commit(type.REQUEST_RESTAURANT_ERROR, { error })
      })
  },

  getAllRestaurants ({ commit }, { id }) {
    commit(type.REQUEST_ALL_RESTAURANTS)
    debugger
    api.get(`/sellers/${id}`)
      .then(res => {
        commit(type.REQUEST_RESTAURANT_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.REQUEST_RESTAURANT_ERROR, { error })
      })
  }
}