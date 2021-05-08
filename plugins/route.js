// 必须登录
// const mustLoginList = [
//   '/user/risk-assessment',
//   '/user/modify-password',
//   '/private-fund/detail',
// ]

export default ({ app, store, $cookies, redirect }) => {
  app.router.beforeEach(async (to, from, next) => {
    // console.log(to)
    // console.log($cookies.getAll())
    const token = $cookies.get('jhjz-token')
    let hasToken = store.state.token
    if (!hasToken && token) {
      store.commit('setToken', token)
      hasToken = token
    }

    if (hasToken) {
      if (to.path === '/user/login/') {
        next({ path: '/' })
      } else {
        const hasUserInfo = store.state.phone
        if (hasUserInfo) {
          next()
        } else {
          try {
            await store.dispatch('getUserInfo')
            next()
          } catch (error) {
            await store.dispatch('logout')
            next()
          }
        }
      }
    }
    // nuxt generate 重定向有问题，改为页面的mounted里判断
    // else if (mustLoginList.includes(to.path)) {
    //   next(`/user/login?redirect=${to.fullPath}`)
    // }
    else {
      next()
    }
  })
}
