<template>
  <div class="register">
    <div class="container">
      <Carousel class="Carousel" />
      <div v-if="showCommitment" class="content">
        <div class="title">
          <img
            src="@/assets/images/title-Investor-commitment.png"
            alt="投资者承诺"
          />
        </div>
        <div class="commitment">
          <p class="commitment-title">尊敬的投资者：</p>
          <p>
            根据《私募投资基金监督管理暂行办法》规定，私募基金的合格投资者是指具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元且符合下列相关标准的机构和个人
          </p>
          <p style="color: #a8a8a8">
            （一）净资产不低于1000万元的机构；<br />
            （二）金融资产不低于300万元或者最近三年个人年均收入不低于50万元的个人（金融
            资产包括银行存
            款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等）
          </p>
          <div class="line"></div>
          <p>
            如您有意向了解或者进行私募基金投资且符合上述“合格投资者”标准，请您先注册成为金海九州网站用户并完成特定对象确认程序后，方可获得我公司提供的私募基金推介服务。
          </p>
          <div class="goto-register" @click="gotoRegister">立即注册</div>
          <div class="check">
            <input
              id="commitment"
              v-model="commitmentCheck"
              type="checkbox"
              name=""
            />
            <label for="commitment"></label>
            <span>&nbsp;本人承诺符合上述特定合格投资者条件</span>
          </div>
        </div>
      </div>
      <div v-else class="content">
        <div class="title">
          <img
            class="title-register"
            src="@/assets/images/title-register-step.png"
            alt="注册"
          />
          <Steps :active="step" :steps="steps" class="Steps" />
        </div>
        <div v-if="step == 1" key="step-1">
          <!-- 增加一个隐藏input，防止个别浏览器记住密码后，表单自动填充 -->
          <input
            type="password"
            autocomplete="new-password"
            placeholder="请输入登录密码"
            maxlength="16"
            style="display: none"
          />
          <div class="form-item margin-top-30px">
            <span class="item-desc"
              ><span class="star red">*</span>手机号码：</span
            >
            <input
              v-model="phoneNo"
              type="text"
              autocomplete="off"
              placeholder="请输入手机号码"
              maxlength="11"
              @blur="validatePhoneNo2"
            />
            <span class="tip red">{{ error.phoneNo }}</span>
          </div>
          <div class="form-item margin-top-25px">
            <span class="item-desc"
              ><span class="star red">*</span>登录密码：</span
            >
            <input
              v-model="password"
              type="password"
              autocomplete="new-password"
              placeholder="请输入登录密码"
              maxlength="16"
              @blur="validatePassword"
            />
            <span v-if="error.password" class="tip red">
              {{ error.password }}
            </span>
            <span v-else class="tip"
              >请输入8～16位密码，须字母和数字的组合</span
            >
          </div>
          <div class="form-item margin-top-25px">
            <span class="item-desc"
              ><span class="star red">*</span>确认密码：</span
            >
            <input
              v-model="affirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="请输入确认密码"
              maxlength="16"
              @blur="validateAffirmPassword"
            />
            <span v-if="error.affirmPassword" class="tip red">
              {{ error.affirmPassword }}
            </span>
            <span v-else class="tip"
              >请输入8～16位密码，须字母和数字的组合</span
            >
          </div>
          <div class="form-item margin-top-25px">
            <span class="item-desc"
              ><span class="star red">*</span>图形验证码：</span
            >
            <input
              v-model="captchaCode"
              type="text"
              :class="{ 'error-input': error.captchaCode }"
              placeholder="请输入图形验证码"
              maxlength="4"
              @blur="validateCaptchaCode"
              @focus="error.captchaCode = ''"
            />
            <div class="captcha" @click="doGetCaptcha">
              <img :src="captchaImg" alt="" />
            </div>
            <span class="change" @click="doGetCaptcha">看不清，点击更换</span>
          </div>
          <div class="form-item margin-top-25px">
            <span class="item-desc"
              ><span class="star red">*</span>短信验证码：</span
            >
            <input
              v-model="phoneCode"
              type="text"
              placeholder="请输入短信验证码"
              maxlength="6"
              :class="{ 'error-input': error.phoneCode }"
              @blur="validatePhoneCode"
              @focus="error.phoneCode = ''"
            />
            <div
              class="code-btn"
              :class="{ 'code-btn-disable': smsCodeDisable }"
              @click="doGetSmsCode"
            >
              {{ smsCodeText }}
            </div>
          </div>
          <div class="next-btn" @click="next">下一步</div>
          <div class="other-btn">
            <input id="register1" v-model="agree" type="checkbox" name="" />
            <label for="register1"></label>
            <span>
              &nbsp;我已阅读并同意

              <span class="blue" @click="openUserAgreement">
                《金海九州用户服务协议》、
              </span>
              <span class="blue" @click="openPrivacyPolicy">
                《金海九州隐私政策》
              </span>
              <!-- <br />
              <span class="blue" @click="openOtherAgreement">
                《第三方SDK收集使用信息说明》
              </span> -->
            </span>
          </div>
        </div>
        <div v-if="step == 2" key="step-2">
          <div class="form-item margin-top-30px">
            <span class="item-desc"
              ><span class="star red">*</span>真实姓名：</span
            >
            <input
              v-model="name"
              type="text"
              placeholder="请输入真实姓名"
              :class="{ 'error-input': error.name }"
              @blur="validateName"
              @focus="error.name = ''"
            />
            <!-- <span class="tip">请输入真实姓名</span> -->
          </div>
          <div class="form-item margin-top-25px">
            <span class="item-desc"
              ><span class="star red">*</span>身份证号码：</span
            >
            <input
              v-model="idNo"
              type="text"
              placeholder="请输入身份证号码"
              maxlength="18"
              :class="{ 'error-input': error.idNo }"
              @blur="validateIdNo"
              @focus="error.idNo = ''"
            />
            <!-- <span class="tip">请输入身份证号码</span> -->
          </div>
          <div class="next-btn" style="display: inline-block" @click="confirm">
            确认
          </div>
          <div class="prev-btn" @click="prev">返回上一步</div>
        </div>
        <div v-if="step == 3" key="step-3" class="register-success">
          <img
            class="img"
            src="@/assets/images/appointment-success.png"
            alt="成功"
          />
          <p class="success-text">恭喜您，注册成功</p>
          <p class="countdown">{{ riskAssessmentText }}</p>

          <nuxt-link to="/user/risk-assessment">
            <div class="risk-assessment">风险测评</div>
          </nuxt-link>
          <p class="risk-assessment-desc">
            依据监管法规要求，您需完成风险测评后才可以浏览私募基金相关信息
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/user/Carousel'
import Steps from '@/components/user/Steps'
import { openWindow } from '@/utils'
import {
  getCaptcha,
  smsCode,
  registerValidateCode,
  realName,
  getMemberStats,
} from '@/api'

export default {
  components: {
    Carousel,
    Steps,
  },
  data() {
    return {
      showCommitment: true,
      commitmentCheck: false,
      agree: false,
      step: 1,
      steps: ['填写个人信息', '身份认证', '注册成功'],
      captchaImg: '',
      smsCodeText: '获取短信验证码',
      smsCodeDisable: false,
      phoneNo: '',
      password: '',
      affirmPassword: '',
      uuid: '', // 图形验证码UUID
      captchaCode: '',
      phoneCode: '',

      name: '',
      idNo: '',

      error: {
        phoneNo: '',
        password: '',
        affirmPassword: '',
        captchaCode: '',
        phoneCode: '',
        name: '',
        idNo: '',
      },

      phoneNoCheck: false, // 注册手机号是否可用

      riskAssessmentText: '5秒后自动跳转到风险测评页面',
    }
  },
  head() {
    return {
      title: '注册 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,公募,私募,财富,投资',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '深圳市金海九州基金销售有限公司成立于2014年7月，经中国证券监督管理委员会批准从事基金销售业务。金海九州秉承“诚信立业，客户为本，专业共赢”的理念，以专业的投研团队为核心，以完善的风控体系为依托，以优秀的投资顾问为支撑，为客户提供专业、全面、便捷的金融服务。 - 金海九州',
        },
      ],
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    clearInterval(this.riskAssessmentInterval)
    clearInterval(this.smsCodeInterval)
  },
  methods: {
    riskAssessmentCountDown() {
      let time = 5
      this.riskAssessmentInterval = setInterval(() => {
        time -= 1
        this.riskAssessmentText = `${time}秒后自动跳转到风险测评页面`
        if (time <= 0) {
          this.$router.push('/user/risk-assessment')
          clearInterval(this.riskAssessmentInterval)
        }
      }, 1000)
    },
    smsCodeTextCountDown() {
      this.smsCodeText = '60秒后可再次发送'
      this.smsCodeDisable = true
      let time = 60
      this.smsCodeInterval = setInterval(() => {
        time -= 1
        this.smsCodeText = `${time}秒后可再次发送`
        if (time <= 0) {
          this.smsCodeDisable = false
          this.smsCodeText = '获取短信验证码'
          clearInterval(this.smsCodeInterval)
        }
      }, 1000)
    },
    doGetSmsCode() {
      if (
        !this.phoneNoCheck ||
        !this.validatePhoneNo() ||
        !this.validateCaptchaCode()
      ) {
        return
      }
      this.smsCodeTextCountDown()
      smsCode({
        phoneNo: this.phoneNo,
        captchaCode: this.captchaCode,
        uuid: this.uuid,
      }).catch((error) => {
        this.smsCodeDisable = false
        this.smsCodeText = '获取短信验证码'
        clearInterval(this.smsCodeInterval)
        if (error.code == 1013) {
          this.doGetCaptcha()
        }
      })
    },
    doGetCaptcha() {
      getCaptcha().then((res) => {
        this.captchaImg = res.data.imgBase64
        this.uuid = res.data.uuid
      })
    },
    gotoRegister() {
      if (!this.commitmentCheck) {
        this.$showToast('注册须符合特定合格投资者条件')
        return
      }
      this.showCommitment = false
      this.doGetCaptcha()
    },
    next() {
      if (!this.phoneNoCheck && this.error.phoneNo) {
        return
      }
      if (
        this.validatePhoneNo() &&
        this.validatePassword() &&
        this.validateAffirmPassword() &&
        this.validateCaptchaCode() &&
        this.validatePhoneCode()
      ) {
        if (!this.agree) {
          this.$showToast('请勾选协议')
          return
        }
        const data = {
          phoneNo: this.phoneNo,
          password: this.password,
          affirmPassword: this.affirmPassword,
          uuid: this.uuid,
          captchaCode: this.captchaCode,
          phoneCode: this.phoneCode,
        }
        registerValidateCode(data)
          .then(() => {
            this.step = 2
          })
          .catch((error) => {
            if (error.code == 1013) {
              this.doGetCaptcha()
            }
          })
      }
    },
    prev() {
      this.step = 1
      this.doGetCaptcha()
    },
    confirm() {
      if (this.validateName() && this.validateIdNo()) {
        const data = {
          phoneNo: this.phoneNo,
          phoneCode: this.phoneCode,
          affirmPassword: this.affirmPassword,
          name: this.name,
          idNo: this.idNo,
          password: this.password,
        }
        realName(data).then((res) => {
          this.$store.commit('setToken', res.data.authorization)
          this.$store.commit('setUsername', res.data.name)
          this.$store.commit('setPhone', res.data.phoneNo)
          this.step = 3
          this.riskAssessmentCountDown()
        })
      }
    },
    openUserAgreement() {
      openWindow('/pdf/user/（0429）金海九州基金官网用户注册协议.pdf')
    },
    openPrivacyPolicy() {
      openWindow('/pdf/user/（0429）金海九州基金隐私政策.pdf')
    },
    openOtherAgreement() {
      openWindow('/pdf/user/第三方SDK收集使用信息说明.pdf')
    },
    validatePhoneNo2() {
      if (this.validatePhoneNo()) {
        getMemberStats({ phoneNo: this.phoneNo })
          .then(() => {
            this.phoneNoCheck = true
          })
          .catch((error) => {
            this.phoneNoCheck = false
            this.error.phoneNo = error.message
          })
      }
    },
    validatePhoneNo() {
      if (this.phoneNo == '') {
        this.error.phoneNo = '请输入手机号码'
        return false
      }
      if (!new RegExp('^1\\d{10}$').test(this.phoneNo)) {
        this.error.phoneNo = '手机号码格式不正确'
        return false
      }
      this.error.phoneNo = ''
      return true
    },
    validatePassword() {
      if (this.password == '') {
        this.error.password = '请输入登录密码'
        return false
      }
      if (
        !new RegExp('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$').test(
          this.password
        )
      ) {
        this.error.password = '请输入8～16位密码，须字母和数字的组合'
        return false
      }
      this.error.password = ''
      return true
    },
    validateAffirmPassword() {
      if (this.affirmPassword == '') {
        this.error.affirmPassword = '请输入确认密码'
        return false
      }
      if (this.affirmPassword != this.password) {
        this.error.affirmPassword = '两次密码不一致'
        return false
      }
      if (
        !new RegExp('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$').test(
          this.affirmPassword
        )
      ) {
        this.error.affirmPassword = '请输入8～16位密码，须字母和数字的组合'
        return false
      }
      this.error.affirmPassword = ''
      return true
    },
    validateCaptchaCode() {
      if (!this.captchaCode) {
        this.error.captchaCode = '请输入图形验证码'
        return false
      }
      this.error.captchaCode = ''
      return true
    },
    validatePhoneCode() {
      if (!this.phoneCode) {
        this.error.phoneCode = '请输入短信验证码'
        return false
      }
      this.error.phoneCode = ''
      return true
    },
    validateName() {
      if (!this.name) {
        this.error.name = '请输入真实姓名'
        return false
      }
      this.error.name = ''
      return true
    },
    validateIdNo() {
      if (!this.idNo) {
        this.error.idNo = '请输入身份证号码'
        return false
      }
      this.error.idNo = ''
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.register {
  .container {
    margin: 40px auto 40px;
    background: #fff;
    height: 590px;
    box-shadow: 0px 4px 10px 0px rgba(152, 152, 152, 0.6);

    .Carousel {
      float: left;
    }

    .content {
      float: left;
      .title {
        width: 778px;
        height: 95px;
        background: #f7f7f7;
        position: relative;
        img {
          width: 168px;
          height: 24px;
          margin: 39px 0 0 53px;
        }
        .title-register {
          width: 96px;
        }
        .Steps {
          position: absolute;
          right: 0;
          top: 30px;
        }
      }

      .commitment {
        .commitment-title {
          font-size: 16px;
          margin-top: 25px;
          font-weight: bold;
        }
        p {
          margin: 20px auto;
          width: 660px;
          line-height: 30px;
          font-size: 14px;
          text-align: justify;
        }
        .line {
          height: 1px;
          margin: 0 auto;
          width: 660px;
          background: #a8a8a8;
        }
        .goto-register {
          width: 265px;
          height: 40px;
          line-height: 40px;
          color: #fff;
          text-align: center;
          background: #d50200;
          border-radius: 2px;
          margin: 35px auto 0;
          cursor: pointer;
        }
        .goto-register:hover {
          background: #e60300;
        }
        .check {
          width: 265px;
          font-size: 14px;
          margin: 20px auto;
          position: relative;
        }
      }
      input[type='checkbox'] {
        visibility: hidden;
      }
      label {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        width: 16px;
        height: 16px;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid #d50200;
        box-sizing: border-box;
      }
      label:after {
        opacity: 0;
        content: '';
        position: absolute;
        width: 9px;
        height: 5px;
        background: transparent;
        top: 2px;
        left: 2px;
        border: 1px solid #fff;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
      input[type='checkbox']:checked + label {
        background: #d50200;
        border: 1px solid #d50200;
      }
      input[type='checkbox']:checked + label:after {
        opacity: 1;
        background: #d50200;
      }

      .form-item {
        font-size: 0;

        .star {
          font-size: 16px;
          vertical-align: sub;
        }
        .item-desc {
          font-size: 16px;
          display: inline-block;
          width: 175px;
          text-align: right;
          line-height: 40px;
          height: 40px;
        }

        input {
          font-size: 16px;
          width: 240px;
          height: 40px;
          border-radius: 2px;
          border: 1px solid #c0c0c0;
          text-indent: 16px;
          outline: none;
          box-sizing: border-box;
          padding: 0;
        }
        .error-input {
          border: 1px solid #d50200;
          &::placeholder {
            color: #d50200;
          }
        }
        .tip {
          font-size: 14px;
          margin-left: 20px;
          color: #666666;
        }
        .red {
          color: #d50200;
        }
        .captcha {
          display: inline-block;
          width: 99px;
          height: 40px;
          border-radius: 2px;
          border: 1px solid #e7e8eb;
          background: #f7f7f7;
          margin-left: 20px;
          vertical-align: bottom;
          cursor: pointer;
          img {
            width: 99px;
            height: 40px;
          }
        }
        .code-btn {
          display: inline-block;
          margin-left: 20px;
          vertical-align: bottom;
          width: 150px;
          height: 40px;
          background: rgba(213, 2, 0, 0.08);
          border-radius: 2px;
          border: 1px solid #d50200;
          line-height: 40px;
          text-align: center;
          color: #d50200;
          font-size: 16px;
          cursor: pointer;
        }
        .code-btn-disable {
          color: #c0c0c0;
          border: 1px solid #c0c0c0;
          background: #fafafa;
          cursor: not-allowed;
        }
        .change {
          color: #409afa;
          font-size: 14px;
          margin-left: 6px;
          cursor: pointer;
        }
      }
      .margin-top-30px {
        margin-top: 30px;
      }
      .margin-top-25px {
        margin-top: 25px;
      }
      .next-btn {
        width: 240px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #d50200;
        border-radius: 2px;
        color: #fff;
        margin-left: 175px;
        margin-top: 40px;
        cursor: pointer;
      }
      .next-btn:hover {
        background: #e60300;
      }
      .prev-btn {
        width: 118px;
        height: 40px;
        background: rgba(213, 2, 0, 0.08);
        border-radius: 2px;
        border: 1px solid #d50200;
        box-sizing: border-box;
        color: #d50200;
        line-height: 40px;
        text-align: center;
        display: inline-block;
        margin-left: 15px;
        cursor: pointer;
      }
      .prev-btn:hover {
        color: #ffffff;
        background: #d50200;
      }
      .other-btn {
        margin-top: 15px;
        margin-left: 175px;
        // width: 240px;
        font-size: 14px;
        position: relative;
        .blue {
          color: #409afa;
          cursor: pointer;
        }
      }

      .register-success {
        width: 100%;
        .img {
          width: 95px;
          height: 95px;
          margin: 90px auto 40px;
          display: block;
        }
        .success-text {
          font-size: 24px;
          text-align: center;
        }
        .countdown {
          color: #409afa;
          font-size: 14px;
          text-align: center;
        }
      }
      .risk-assessment {
        width: 240px;
        height: 40px;
        background: #d50200;
        border-radius: 2px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        margin: 40px auto 10px;
        cursor: pointer;
      }
      .risk-assessment:hover {
        background: #e60300;
      }
      .risk-assessment-desc {
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
