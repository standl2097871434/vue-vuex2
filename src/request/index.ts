// import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
//
//
// export const axiosInstance: AxiosInstance = axios.create({
//     baseURL: 'https://localhost:8080',
//     timeout: 5000
// });
// // 添加请求拦截器
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // 在发送请求之前做些什么
//         return config;
//     },
//     (error) => {
//         // 处理请求错误
//         return Promise.reject(error);
//     },
// );
// // 添加响应拦截器
// axiosInstance.interceptors.response.use(
//     (response: AxiosResponse) => {
//         // 对响应数据做点什么
//         return response;
//     },
//     (error: any) => {
//         // 处理响应错误
//         return Promise.reject(error);
//     },
// );
// export default axiosInstance;
//TODO: learn more ts to use this