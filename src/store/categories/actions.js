import api from '@/store/api/';
import * as type from './types'

export default {
  getCategoriesByOwnerId ({ commit }, id ) {
    commit(type.REQUEST_CATEGORIES)
    api.get(`/categories/owner/${id}`)
      .then(res => {
        commit(type.REQUEST_CATEGORIES_SUCCESS, {
          payload: res.data
        })
      })
      .catch(error => {
        commit(type.REQUEST_CATEGORIES_ERROR, { error })
      })
  }
}