<template>
  <div class="modify-password">
    <div class="container">
      <Carousel class="Carousel" />
      <div class="content">
        <div class="title">
          <img src="@/assets/images/title-modify-password.png" alt="修改密码" />
        </div>
        <div v-if="!success">
          <div class="form-item margin-top-52px">
            <span class="item-desc"
              ><span class="star red">*</span>当前密码：</span
            >
            <input
              v-model="oldPassword"
              type="password"
              placeholder="请输入当前密码"
              maxlength="16"
              @blur="validateOldPassword"
              @focus="error.oldPassword = ''"
            />
            <span v-if="error.oldPassword" class="tip red">
              {{ error.oldPassword }}
            </span>
            <span v-else class="tip"
              >请输入8～16位密码，须字母和数字的组合</span
            >
          </div>
          <div class="form-item margin-top-25px">
            <span class="item-desc"
              ><span class="star red">*</span>新密码：</span
            >
            <input
              v-model="newPassword"
              type="password"
              placeholder="请输入新密码"
              maxlength="16"
              @blur="validateNewPassword"
              @focus="error.newPassword = ''"
            />
            <span v-if="error.newPassword" class="tip red">
              {{ error.newPassword }}
            </span>
            <span v-else class="tip"
              >请输入8～16位密码，须字母和数字的组合</span
            >
          </div>
          <div class="form-item margin-top-25px">
            <span class="item-desc"
              ><span class="star red">*</span>确认新密码：</span
            >
            <input
              v-model="newPassword2"
              type="password"
              placeholder="请再次确认新密码"
              maxlength="16"
              @blur="validateNewPassword2"
              @focus="error.newPassword2 = ''"
            />
            <span v-if="error.newPassword2" class="tip red">
              {{ error.newPassword2 }}
            </span>
            <span v-else class="tip"
              >请输入8～16位密码，须字母和数字的组合</span
            >
          </div>
          <div class="login-btn" @click="confirm">确认</div>
        </div>

        <div v-else class="modify-success">
          <img
            class="img"
            src="@/assets/images/appointment-success.png"
            alt="成功"
          />
          <p class="success-text">恭喜您，密码修改成功</p>
          <div class="btn-container">
            <div class="try-again" @click="tryAgain">重新登录</div>
            <nuxt-link to="/private-fund">
              <div class="private-fund">浏览产品</div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/user/Carousel'
import { changePwd } from '@/api'
export default {
  components: {
    Carousel,
  },
  data() {
    return {
      success: false,
      phoneNo: this.$store.state.phone,
      oldPassword: '',
      newPassword: '',
      newPassword2: '',

      error: {
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
      },
    }
  },
  head() {
    return {
      title: '修改密码 - 金海九州',
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
    if (!this.$store.state.token) {
      this.$showToast('您必须先登录，才能访问该页面！')
      this.$router.push(`/user/login?redirect=${this.$route.fullPath}`)
    }
  },
  methods: {
    tryAgain() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/user/login')
      })
    },
    confirm() {
      if (
        this.validateOldPassword() &&
        this.validateNewPassword() &&
        this.validateNewPassword2()
      ) {
        const data = {
          phoneNo: this.phoneNo,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }
        changePwd(data).then(() => {
          // this.$showToast('修改密码成功')
          this.success = true
        })
      }
    },
    validateOldPassword() {
      if (this.oldPassword == '') {
        this.error.oldPassword = '请输入当前密码'
        return false
      }
      if (
        !new RegExp('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$').test(
          this.oldPassword
        )
      ) {
        this.error.oldPassword = '请输入8～16位密码，须字母和数字的组合'
        return false
      }
      this.error.oldPassword = ''
      return true
    },
    validateNewPassword() {
      if (this.newPassword == '') {
        this.error.newPassword = '请输入新密码'
        return false
      }
      if (
        !new RegExp('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$').test(
          this.newPassword
        )
      ) {
        this.error.newPassword = '请输入8～16位密码，须字母和数字的组合'
        return false
      }
      this.error.newPassword = ''
      return true
    },
    validateNewPassword2() {
      if (this.newPassword2 == '') {
        this.error.newPassword2 = '请输入确认密码'
        return false
      }
      if (this.newPassword2 != this.newPassword) {
        this.error.newPassword2 = '两次密码不一致'
        return false
      }
      if (
        !new RegExp('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$').test(
          this.newPassword2
        )
      ) {
        this.error.newPassword2 = '请输入8～16位密码，须字母和数字的组合'
        return false
      }
      this.error.newPassword2 = ''
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.modify-password {
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
          width: 96px;
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
        }
        .forget {
          float: right;
          cursor: pointer;
        }
      }

      .modify-success {
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

        .btn-container {
          margin: 90px auto 0;
          width: 400px;
          .try-again {
            width: 184px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 2px;
            border: 1px solid #d50200;
            color: #d50200;
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block;
          }
          .try-again:hover {
            background: #d50200;
            color: #ffffff;
          }
          .private-fund {
            width: 184px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #d50200;
            border-radius: 2px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            margin-left: 20px;
          }
          .private-fund:hover {
            background: #e60300;
          }
        }
      }
    }
  }
}
</style>
