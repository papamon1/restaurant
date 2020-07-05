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


  createOrder ({ commit }, order) {          
    commit(type.CREATE_ORDER)
    console.log(order)
    return api.post(`/orders`, order)
      .then(res => {
        commit(type.CREATE_ORDER_SUCCESS, {
          payload: res.data
        })
        return Promise.resolve(res.data)
      })
      .catch(error => {
        console.log(error)
        commit(type.CREATE_ORDER_ERROR, { error })
      })
  },  

  createStripeSession ({ commit }, order) {        
    commit(type.CREATE_ORDER)    
    return api.post(`/stripe/createCheckoutSession`, order)
      .then(res => {
        commit(type.CREATE_ORDER_SUCCESS, {
          payload: res.data
        })
        return Promise.resolve(res.data)
      })
      .catch(error => {
        console.log(error)
        commit(type.CREATE_ORDER_ERROR, { error })
      })
  },  

}
