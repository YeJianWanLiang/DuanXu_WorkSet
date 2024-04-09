import axios from 'axios'

export function request(config) {
  //1.创建实例
  const instance = axios.create({
    baseURL: 'http://zh.zhihao.kooboo.site',
    timeout: 5000,
  })

  // 2.axios拦截器
  // 2.1拦截请求
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {
      console.log(err)
    }
  )

  //2.2拦截响应
  instance.interceptors.response.use(
    (res) => {
      return res.data
    },
    (err) => {
      console.log(err)
    }
  )

  //3.发送请求
  return instance(config)
}
