import toast from 'show-toast'

// eslint-disable-next-line import/no-mutable-exports
export let axios = null

let requestFlag = ''

const generateKey = function (url, method, data, params) {
  const strData = JSON.stringify(data)
  params = params || {}
  const strParams = JSON.stringify(params)
  return `${url || ''}${method || ''}${strData || ''}${strParams || ''}`
}

export default ({ app, $axios, store, route, redirect }) => {
  axios = $axios

  let baseURL = process.env.NUXT_ENV_BASE_API
  if (process.server && process.env.NUXT_ENV_BASE_API_SERVER) {
    baseURL = process.env.NUXT_ENV_BASE_API_SERVER
  }
  $axios.defaults.baseURL = baseURL
  $axios.defaults.timeout = 20 * 1000

  $axios.onRequest((config) => {
    const requestKey = generateKey(
      config.url,
      config.method,
      config.data,
      config.params
    )

    // console.dir(route)
    if (requestFlag == requestKey) {
      console.log(requestKey)
      console.log('重复发送')
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        code: 'REQUEST-CANCEL',
        message: '重复发送',
      })
    }
    // get请求添加时间戳，避免缓存
    if (/get/i.test(config.method)) {
      config.params = config.params || {}
      config.params._time = Date.now() // 添加时间戳
    }
    // console.dir(store)
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    requestFlag = requestKey
    return config
  })

  $axios.onResponse((response) => {
    requestFlag = ''
    const res = response.data
    if (res.code != 1) {
      // token 不存在或失效！
      if (res.code == 1000 || res.code == 1011) {
        console.log('token 不存在或失效')
        res.message = '登录信息失效！'
        store.dispatch('logout').then(() => {
          if (!process.server) {
            location.reload()
          } else {
            redirect(route.fullPath)
          }
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  })

  $axios.onRequestError((error) => {
    // console.log('onRequestError')
    if (error.code != 'REQUEST-CANCEL') {
      requestFlag = ''
    }
    return Promise.reject(error)
  })
  $axios.onResponseError((error) => {
    // console.log('onResponseError')
    requestFlag = ''
    console.dir(error)
    if (error.message && !process.server) {
      toast(error.message)
    }
    // token 不存在或失效！
    if (
      error.response &&
      error.response.data &&
      (error.response.data.code == 1000 || error.response.data.code == 1011)
    ) {
      console.log('token 不存在或失效')
      store.dispatch('logout').then(() => {
        if (!process.server) {
          location.reload()
        } else {
          redirect(route.fullPath)
        }
      })
    }
    return Promise.reject(error)
  })
}
