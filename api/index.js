import { axios } from '@/plugins/axios'

// 登录
export function login(data) {
  return axios.post('/login', data)
}

// 短信验证码
export function smsCode(data) {
  return axios.post('/sms/sendSmsCode', data)
}
// 证短信验证码是否正确
export function smsCodeValidate(params) {
  return axios.get('/sms/validate', { params })
}
// 当前用户信息
export function getUserInfo() {
  return axios.get('/login/getUser')
}

// 获取图形验证码
export function getCaptcha() {
  return axios.get('/captcha/get')
}
// 忘记密码校验手机号和图形验证码是否正确
export function captchaValidate(data) {
  return axios.post('/pwd/validate', data)
}

// 修改密码
export function changePwd(data) {
  return axios.post('/pwd/changePwd', data)
}

// 忘记密码
export function forgetPwd(data) {
  return axios.post('/pwd/forgetPwd', data)
}

// 注册时验证手机是否已注册
export function getMemberStats(params) {
  return axios.get('/register/getMemberStats', { params })
}

// 注册校验图形验证码和短信验证码
export function registerValidateCode(data) {
  return axios.post('/register/validateCode', data)
}

// 实名
export function realName(data) {
  return axios.post('/realName/save', data)
}

// 风险测评_问卷
export function queryQuestionnaireOptionInfo() {
  return axios.get('/memberQuestion/queryQuestionnaireOptionInfo')
}

// 风险测评_问卷答案
export function queryQuestionOptionLevel(data) {
  return axios.post('/memberQuestion/queryQuestionOptionLevel', data)
}

// 风险测评_认证答案
export function saveInvestorQualify(data) {
  return axios.post('/memberQuestion/saveInvestorQualify', data)
}

// 查询公募基金信息列表
export function queryListPublic(data) {
  return axios.post('/mutualFund/queryList', data)
}

// 查询公募基金详情
export function queryDetailPublic(data) {
  return axios.post('/mutualFund/queryDetail', data)
}

// 查询公募基金净值信息列表
export function queryNavListPublic(data) {
  return axios.post('/mutualFund/queryNavList', data)
}

// 查询私募基金信息列表
export function queryListPrivate(data) {
  return axios.post('/privateFund/queryList', data)
}

// 查询私募基金详情
export function queryDetailPrivate(data) {
  return axios.post('/privateFund/queryDetail', data)
}

// 查询私募基金净值信息列表
export function queryNavListPrivate(data) {
  return axios.post('/privateFund/queryNavList', data)
}

// 私募基金客户预约
export function reservePrivate(data) {
  return axios.post('/privateFund/reserve', data)
}
