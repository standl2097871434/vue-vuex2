import axios from "axios";

export const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout:5000
})

export async function get(url, params) {
    try {
        const response = await request.get(url, { params });
        console.log(response)
        return response;
    } catch (error) {
        console.error('GET请求失败', error);
        throw error;
    }
}

export async function post(url, params) {
    try {
        const response = await request.post(url, params);
        console.log(response)
        return response;
    } catch (error) {
        console.error('POST请求失败', error);
        throw error;
    }
}

request.interceptors.request.use(
    config=>{
        config.headers['Content-Type']='application/json;charset=utf-8';
        return config
    },error => {
        return Promise.reject(error)
    }
)


request.interceptors.response.use(
    response=>{
        // if (typeof res ==='string'){
        //     res = res?JSON.parse(res):res
        // }
        // console.log(response)
        return response.data;
    },error => {
        console.log('err'+error)
        return Promise.reject(error)
    }
)

export default request;