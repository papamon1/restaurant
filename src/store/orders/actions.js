import api from '@/store/api/';
import * as type from './types'

export default {
  getOrders ({ commit } ) {      
    commit(type.REQUEST_Orders)
    return api.get(`/orders/`)
      .then(res => {
        commit(type.REQUEST_Orders_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.REQUEST_Orders_ERROR, { error })
      })
  },  


  processOrder ({ commit }, id ) {      
    commit(type.PROCESS_ORDER)
    return api.get(`/orders/process/${id}`)
      .then(res => {
        commit(type.PROCESS_ORDER_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.PROCESS_ORDER_ERROR, { error })
      })
  },  

}
