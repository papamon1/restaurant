import axios from 'axios';

const BASE_URL = '/api/v1/';

var instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,    
});

export default instance;