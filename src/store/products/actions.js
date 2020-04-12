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

  getProductsByOwnerId ({ commit }, id ) {
    commit(type.REQUEST_PRODUCT_BY_OWNER)
    api.get(`/products/owner/${id}`)
      .then(res => {
        commit(type.REQUEST_PRODUCT_BY_OWNER_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.REQUEST_PRODUCT_BY_OWNER_ERROR, { error })
      })
  }
}