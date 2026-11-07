import axios from 'axios'
import queryString from 'query-string'
import { API_URL } from '../config/env'
const axiosClient = {
    
    application : axios.create({
        baseURL: API_URL,
        
        headers: {
            'content-type': 'application/json',
        },
        paramsSerializer: (params) => queryString.stringify(params),
    }),

    applicationNoAuth : axios.create({
        baseURL: API_URL,
        
        headers: {
            'content-type': 'application/json',
        },
        paramsSerializer: (params) => queryString.stringify(params),
    }),

    formData : axios.create({
        baseURL: API_URL,
        
        headers: {
            'content-type': 'multipart/form-data',
        },
    })
}


export default axiosClient;