import api from '@/store/api/';
import * as type from './types'

export default {
  getExtras ({ commit } ) {      
    commit(type.REQUEST_EXTRAS)
    return api.get(`/extras/`)
      .then(res => {
        commit(type.REQUEST_EXTRAS_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.REQUEST_EXTRAS_ERROR, { error })
      })
  },  
}