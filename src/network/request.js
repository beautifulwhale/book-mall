import axios from 'axios'
export function request(config) {
    const reqInterface = axios.create({
        baseURL: "https://api.shop.eduwork.cn/",
        timeout: 5000,
    })
    // request interceptor
    reqInterface.interceptors.request.use(
    config => {
      if (config.method === 'post') {
        config.data = {
          ...config.data,
          _t: Date.parse(new Date()) / 1000 // 时间戳
        }
      } else if (config.method === 'get') {
        config.params = {
          paramRandom: Math.random(), // 随机数
          ...config.params
        }
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    })
    reqInterface.interceptors.response.use(response => response.data, error => Promise.reject(error))
    return reqInterface(config)
}
