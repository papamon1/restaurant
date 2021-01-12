import api from '@/store/api/';
import * as type from './types'

//TODO organizar thens
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
          dispatch('extras/getExtras', id, {root:true})
          .then(res3=>{
            dispatch('categories/getCategoriesByOwnerId', id, {root:true})
              .then(res4=>{
                return res4
              })   
              return res3
          })    
          return res2      
        })
      })
      .catch(error => {
        commit(type.REQUEST_RESTAURANT_ERROR, { error })
      })
  },

  getAllRestaurants ({ commit }, { id }) {
    commit(type.REQUEST_ALL_RESTAURANTS)
    api.get(`/sellers/${id}`)
      .then(res => {
        commit(type.REQUEST_RESTAURANT_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.REQUEST_RESTAURANT_ERROR, { error })
      })
  },

  getDelivery ({ rootState, state }) {
    // Buscamos si el código del cliente está entre los códigos de reparto del restaurante
    debugger
    let codes=state.deliveryCodes.filter((deliveryCode)=>{
      deliveryCode.code === rootState.auth.item.zipCode
    })


    // Si lo está, lo devolvemos
    if(codes.length>0){return codes[0]}
    else return null
  }
}