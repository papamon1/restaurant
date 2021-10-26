import axios from 'axios';

// const BASE_URL =  process.env.VUE_APP_API_URL + '/api/v1/';
const BASE_URL =  process.env.VUE_APP_API_URL + '/api/v1/';

var instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,    
});

instance.interceptors.request.use(function(config) {
    const token = localStorage.getItem('meetuper-jwt') || ''

    if (token) {
    config.headers.Authorization = `Bearer ${token}`
    }

    return config
    }, function (err) {
    return Promise.reject(err)
})

export default instance;