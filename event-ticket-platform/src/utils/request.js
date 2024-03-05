// import axios from 'axios'
// import qs from 'querystring'


// // 处理失败状态码信息

// const errorHandle = (state, info) => {
//     switch (state) {
//         case 400:
//             alert("Semantic error, the current request cannot be processed by the server");
//             break;
//         case 401:
//             // Token issue
//             console.log("Server authentication failed");
//             break;
//         case 403:
//             console.log("The server received the message but refused to process it");
//             break;
//         case 404:
//             console.log("Please check the network request address");
//             break;
//         case 500:
//             console.log("The server encountered an unexpected situation, preventing it from completing the request processing. Also, check if the request parameters are formatted correctly");
//             break;
//         case 502:
//             console.log("When a server acting as a gateway or proxy attempts to fulfill the request, it receives an invalid response from the upstream server");
//             break;
//         default:
//             console.log(info);
//     }

// }

// // 创建axios实例

// const instance = axios.create({
//     timeout: 5000,   // 设置超时时间
//     // baseURL:""   //  还可以设置请求基本的请求地址
// })

// // 设置请求拦截器.use方法接受两个请求参数
// instance.interceptors.request.use(
//     config => {
//         if (config.method === 'post') {
//             config.data = qs.stringify(config.data)
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// // 设置响应拦截器
// instance.interceptors.response.use(
//     res => {
//         return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
//     },
//     error => {
//         const { response } = error
//         errorHandle(response)
//     }
// )

// export default instance