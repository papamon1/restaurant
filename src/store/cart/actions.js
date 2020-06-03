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

  addAmountCartElement ({state, commit }, index ) {    
    const element = {...state.items[index]}
    element.amount +=1
    return commit(type.UPDATE_CART_ELEMENT, {index:index, element:element })    
  },

  removeCartElement ({ state, commit }, index ) {        
    const element = {...state.items[index]}    
    if(element.amount-1>0){
      element.amount=element.amount-1
      return commit(type.UPDATE_CART_ELEMENT, {index:index, element:element }) 
    }else{
      return commit(type.REMOVE_CART_ELEMENT, {payload:index})     
    } 
       
  }
}