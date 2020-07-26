import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:3000/api/';
let timeout = 90000;

axios.defaults.timeout = timeout;

axios.interceptors.request.use(config => {
        
    return config;
}, error => {
    return error;
});

//响应的拦截器
axios.interceptors.response.use(response => {
   
        return response;
}, error => {
    return error;
});

export default axios;