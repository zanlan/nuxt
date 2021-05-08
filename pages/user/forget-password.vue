<template>
  <div class="forget-password">
    <div class="container">
      <Carousel class="Carousel" />

      <div class="content">
        <div class="title">
          <img src="@/assets/images/title-forget-password.png" alt="忘记密码" />
          <Steps :active="step" :steps="steps" class="Steps" />
        </div>
        <div v-if="step == 1" key="step-1">
          <div class="form-item margin-top-52px">
            <span class="item-desc"
              ><span class="star red">*</span>手机号码：</span
            >
            <input
              v-model="phoneNo"
              type="text"
              placeholder="请输入手机号码"
              maxlength="11"
              @blur="validatePhoneNo"
            />
            <span class="tip red">{{ error.phoneNo }}</span>
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

          <div class="next-btn" @click="next">下一步</div>
        </div>
        <div v-if="step == 2" key="step-2">
          <div class="form-item margin-top-52px">
            <span class="item-desc"
              ><span class="star red">*</span>手机号码：</span
            >
            <input
              v-model="phoneNo"
              type="text"
              placeholder="请输入手机号码"
              disabled
            />
            <!-- <span class="tip red">手机号码不正确</span> -->
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
          <div class="next-btn" @click="nextChangePwd">下一步</div>
        </div>
        <div v-if="step == 3" key="step-3">
          <div class="form-item margin-top-52px">
            <span class="item-desc"
              ><span class="star red">*</span>输入新密码：</span
            >
            <input
              v-model="password"
              type="password"
              placeholder="请输入新密码"
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
              ><span class="star red">*</span>再次输入新密码：</span
            >
            <input
              v-model="affirmPassword"
              type="password"
              placeholder="请再次输入新密码"
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
          <div class="next-btn" @click="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/user/Carousel'
import Steps from '@/components/user/Steps'
import {
  getCaptcha,
  smsCode,
  smsCodeValidate,
  forgetPwd,
  captchaValidate,
} from '@/api'
export default {
  components: {
    Carousel,
    Steps,
  },
  data() {
    return {
      agree: false,
      step: 1,
      steps: ['填写手机号', '手机号验证', '设置新密码'],
      captchaImg: '',
      smsCodeText: '获取短信验证码',
      smsCodeDisable: false,

      phoneNo: '',
      password: '',
      affirmPassword: '',
      uuid: '', // 图形验证码UUID
      captchaCode: '',
      phoneCode: '',

      error: {
        phoneNo: '',
        password: '',
        affirmPassword: '',
        captchaCode: '',
        phoneCode: '',
      },
    }
  },
  head() {
    return {
      title: '忘记密码 - 金海九州',
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
  mounted() {
    this.doGetCaptcha()
  },
  beforeDestroy() {
    clearInterval(this.smsCodeInterval)
  },
  methods: {
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
      if (!this.validatePhoneNo()) {
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
    next() {
      if (this.validatePhoneNo() && this.validateCaptchaCode()) {
        captchaValidate({
          uuid: this.uuid,
          captchaCode: this.captchaCode,
          phoneNo: this.phoneNo,
        })
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
    nextChangePwd() {
      if (this.validatePhoneCode()) {
        smsCodeValidate({
          phoneNo: this.phoneNo,
          smsCode: this.phoneCode,
        }).then(() => {
          this.step = 3
        })
      }
    },
    confirm() {
      if (this.validatePassword() && this.validateAffirmPassword()) {
        const data = {
          phoneNo: this.phoneNo,
          phoneCode: this.phoneCode,
          password: this.password,
        }
        forgetPwd(data).then(() => {
          this.$showToast('密码修改成功！')
          setTimeout(() => {
            this.$router.push('/user/login')
          }, 2000)
        })
      }
    },
    validatePhoneNo() {
      if (this.phoneNo == '') {
        this.error.phoneNo = '请输入手机密码'
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
        this.error.password = '请输入新密码'
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
  },
}
</script>

<style lang="scss" scoped>
.forget-password {
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
          width: 96px;
          height: 24px;
          margin: 39px 0 0 53px;
        }
        .Steps {
          position: absolute;
          right: 0;
          top: 30px;
        }
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
      .margin-top-52px {
        margin-top: 52px;
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
    }
  }
}
</style>
