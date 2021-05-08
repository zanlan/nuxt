<template>
  <div class="login">
    <div class="container">
      <Carousel class="Carousel" />
      <div class="content">
        <div class="title">
          <img src="@/assets/images/title-login.png" alt="登录" />
        </div>
        <div class="form-item margin-top-52px">
          <!-- 增加一个隐藏input，防止个别浏览器记住密码后，表单自动填充 -->
          <input
            type="password"
            autocomplete="new-password"
            placeholder="请输入登录密码"
            maxlength="16"
            style="display: none"
          />
          <span class="item-desc"><span class="star red">*</span>手机号：</span>
          <input
            v-model="userNo"
            type="text"
            autocomplete="new-password"
            placeholder="请输入手机号码"
            maxlength="11"
            @blur="validatePhoneNo"
          />
          <span class="tip red">{{ error.userNo }}</span>
        </div>
        <div class="form-item margin-top-25px">
          <span class="item-desc"
            ><span class="star red">*</span>登录密码：</span
          >
          <input
            v-model="userPassword"
            type="password"
            autocomplete="new-password"
            placeholder="请输入登录密码"
            maxlength="16"
            @blur="validatePassword"
          />
          <span v-if="error.userPassword" class="tip red">
            {{ error.userPassword }}
          </span>
          <span v-else class="tip">请输入8～16位密码，须字母和数字的组合</span>
        </div>
        <div class="form-item margin-top-25px">
          <span class="item-desc"
            ><span class="star red">*</span>图形验证码：</span
          >
          <input
            v-model="captcha"
            type="text"
            :class="{ 'error-input': error.captcha }"
            placeholder="请输入图形验证码"
            maxlength="4"
            @blur="validateCaptchaCode"
            @focus="error.captcha = ''"
          />
          <div class="captcha" @click="doGetCaptcha">
            <img :src="captchaImg" alt="" />
          </div>
          <span class="change" @click="doGetCaptcha">看不清，点击更换</span>
        </div>
        <div class="login-btn" @click="doLogin">登录</div>
        <div class="other-btn">
          <nuxt-link to="/user/register">
            <div class="register">免费注册</div>
          </nuxt-link>
          <nuxt-link to="/user/forget-password">
            <div class="forget">忘记密码</div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/user/Carousel'
import { getCaptcha } from '@/api'
export default {
  components: {
    Carousel,
  },
  data() {
    return {
      userNo: '',
      userPassword: '',
      captcha: '',
      uuid: '', // 图形验证码uuid

      captchaImg: '',

      error: {
        userNo: '',
        userPassword: '',
        captcha: '',
      },
    }
  },
  head() {
    return {
      title: '登录 - 金海九州',
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
  methods: {
    async doLogin() {
      if (
        this.validatePhoneNo() &&
        this.validatePassword() &&
        this.validateCaptchaCode()
      ) {
        const form = new FormData()
        form.append('userNo', this.userNo)
        form.append('userPassword', this.userPassword)
        form.append('captcha', this.captcha)
        form.append('uuid', this.uuid)

        try {
          await this.$store.dispatch('login', form)
          await this.$store.dispatch('getUserInfo')
          if (this.$store.state.riskTypeCode < 0) {
            this.$router.push('/user/risk-assessment')
          } else {
            this.$router.push({ path: this.$route.query.redirect || '/' })
          }
        } catch (error) {
          console.log(error)
          if (error.code == 1013) {
            this.doGetCaptcha()
          }
        }
      }
    },
    doGetCaptcha() {
      getCaptcha().then((res) => {
        this.captchaImg = res.data.imgBase64
        this.uuid = res.data.uuid
      })
    },
    validatePhoneNo() {
      if (this.userNo == '') {
        this.error.userNo = '请输入手机号码'
        return false
      }
      if (!new RegExp('^1\\d{10}$').test(this.userNo)) {
        this.error.userNo = '手机号码格式不正确'
        return false
      }
      this.error.userNo = ''
      return true
    },
    validatePassword() {
      if (this.userPassword == '') {
        this.error.userPassword = '请输入登录密码'
        return false
      }
      if (
        !new RegExp('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$').test(
          this.userPassword
        )
      ) {
        this.error.userPassword = '请输入8～16位密码，须字母和数字的组合'
        return false
      }
      this.error.userPassword = ''
      return true
    },
    validateCaptchaCode() {
      if (!this.captcha) {
        this.error.captcha = '请输入图形验证码'
        return false
      }
      this.error.captcha = ''
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
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
        img {
          width: 48px;
          height: 24px;
          margin: 39px 0 0 53px;
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
      .login-btn {
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
      .login-btn:hover {
        background: #e60300;
      }
      .other-btn {
        margin-top: 15px;
        margin-left: 175px;
        width: 240px;
        font-size: 14px;
        color: #409afa;
        .register {
          float: left;
          cursor: pointer;
          color: #409afa;
        }
        .forget {
          float: right;
          cursor: pointer;
          color: #409afa;
        }
      }
    }
  }
}
</style>
