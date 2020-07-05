import api from '@/store/api/';
import jwt from 'jsonwebtoken'
import * as type from './types'
// import { rejectError } from '@/helpers'

function checkTokenValidity (token) {
    if (token) {
      const decodedToken = jwt.decode(token)
  
      return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
    }
  
    return false
  }

export default{

      loginWithEmailAndPassword ({commit}, userData) {
        return api.post('/users/login', userData)
            .then(res => {                
                const user = res.data
                localStorage.setItem('meetuper-jwt', user.token)
                commit(type.SET_AUTH_USER, user)
                return Promise.resolve(`Bienvenido al sistema, ${user.firstName}!!`)
            })
            .catch(err =>{                
            return Promise.reject(err.response.data.errors.message)            
        })
      },
      registerUser ({commit}, userData) {        
        console.log(JSON.stringify(userData))
        return api.post('/users/register', userData)
            .then(()=>{              
                console.log(commit)
                // const user = res.data
                // localStorage.setItem('meetuper-jwt', user.token)
                // commit(type.SET_AUTH_USER, user)
                return Promise.resolve('Usuario dado de alta con éxito!!')   
            })
            .catch(err =>{ 
                
                return Promise.reject(err.response.data.errors.message)       

            })
      },
      logout ({commit}) {
        // For Session Authnetication !
        // return api.post('/users/logout')
        //   .then(() => {
        //     commit('setAuthUser', null)
        //     return true
        //   })
        //   .catch(err => {
        //     return err
        //   })
  
        return new Promise((resolve) => {
          localStorage.removeItem('meetuper-jwt')
          commit(type.SET_AUTH_USER, null)
          resolve('Has sido desconectado con éxito')
        })
      },
      getAuthUser ({commit, getters}) {
        const authUser = getters['authUser']
        const token = localStorage.getItem('meetuper-jwt')
        const isTokenValid = checkTokenValidity(token)
  
        if (authUser && isTokenValid) { return Promise.resolve(authUser) }
  
        const config = {
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
  
        return api.get('/users/me', config)
          .then((res) => {
            const user = res.data
            localStorage.setItem('meetuper-jwt', user.token)
            commit('setAuthUser', user)
            commit('setAuthState', true)
            return user
          })
          .catch(err => {
            commit('setAuthUser', null)
            commit('setAuthState', true)
            return err
          })
      },      
      updateUser ({commit}, user) {
        return api.patch(`/users/${user._id}`, user)
          .then(res => {
            const updatedUser = res.data
            commit('setAuthUser', updatedUser)
            return updatedUser
          })
      },
      activateUser (_, hash) {
        // alert(`Sending request with hash: ${hash}`)
        return api.patch(`/users/${hash}/activate`)
      },
}