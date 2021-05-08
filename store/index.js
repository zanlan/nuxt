// import Vue from 'vue'
// import Vuex from 'vuex'
import { login, getUserInfo } from '@/api'

// Vue.use(Vuex)

export const state = () => ({
  riskTypeCode: -1, // -1未测评 -2过期
  riskTypeMsg: '',
  username: '',
  phone: '',
  token: '',
})

export const mutations = {
  setToken(state, token) {
    this.$cookies.set('jhjz-token', token)
    state.token = token
  },
  setUsername(state, username) {
    state.username = username
  },
  setPhone(state, phone) {
    state.phone = phone
  },
  setRiskTypeCode(state, riskTypeCode) {
    state.riskTypeCode = riskTypeCode
  },
  setRiskTypeMsg(state, riskTypeMsg) {
    state.riskTypeMsg = riskTypeMsg
  },
}

export const actions = {
  // nuxtServerInit({ commit }, { $cookies }) {
  //   console.dir(arguments)
  //   console.log('---nuxtServerInit')
  //   const token = $cookies.get('jhjz-token')
  //   if (token) {
  //     commit('setToken', token)
  //   }
  // },
  login({ commit }, data) {
    return login(data).then((res) => {
      commit('setToken', res.data.Authorization)
    })
  },
  getUserInfo({ commit }) {
    // console.dir(arguments)
    return getUserInfo().then((res) => {
      commit('setUsername', res.data.name)
      commit('setPhone', res.data.phoneNo)
      commit('setRiskTypeCode', res.data.riskTypeCode)
      commit('setRiskTypeMsg', res.data.riskTypeMsg)
      return res.data
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('setToken', '')
      commit('setUsername', '')
      commit('setPhone', '')
      commit('setRiskTypeCode', -1)
      commit('setRiskTypeMsg', '')
      this.$cookies.remove('jhjz-token')
      // localStorage.removeItem('token')
      resolve()
    })
  },
}
