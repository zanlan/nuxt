<template>
  <div class="appointment">
    <div class="gray-bg" @click="close"></div>
    <div class="dialog-bg">
      <img
        class="close-btn"
        src="@/assets/images/close-btn.png"
        alt=""
        @click="close"
      />
      <div v-if="!success" class="form">
        <img
          class="title-img"
          src="@/assets/images/title-appointment.png"
          alt=""
        />
        <div class="form-item">
          <span class="name">姓名：</span>
          <input
            v-model="reserveName"
            class="input"
            type="text"
            placeholder="请输入姓名"
          />
        </div>
        <div class="form-item">
          <span class="name">手机号：</span>
          <input
            v-model="reservePhoneNo"
            class="input"
            type="text"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </div>
        <div class="appointment-btn" @click="appointment">预约咨询</div>
      </div>
      <div v-else class="success">
        <img
          class="success-img"
          src="@/assets/images/appointment-success.png"
          alt=""
        />
        <p class="font-size-24px">预约成功</p>
        <p>投资顾问将尽快与您联系，请保持手机畅通</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reservePrivate } from '@/api'
export default {
  props: {
    reserveFundCode: {
      type: String,
      default: '',
    },
    reserveFundName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      success: false,
      reserveName: this.$store.state.username,
      reservePhoneNo: this.$store.state.phone,
    }
  },
  methods: {
    appointment() {
      if (!this.reserveName) {
        this.$showToast('请输入姓名')
        return
      }
      if (!this.reservePhoneNo) {
        this.$showToast('请输入手机号')
        return
      }
      if (!new RegExp('^1\\d{10}$').test(this.reservePhoneNo)) {
        this.$showToast('手机号码不正确')
        return
      }
      reservePrivate({
        reserveFundCode: this.reserveFundCode,
        reserveFundName: this.reserveFundName,
        reserveName: this.reserveName,
        reservePhoneNo: this.reservePhoneNo,
      }).then(() => {
        this.success = true
      })
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.appointment {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;

  z-index: 10;
  .gray-bg {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }
  .dialog-bg {
    width: 548px;
    height: 378px;
    background: #ffffff;
    border-radius: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -274px;
    margin-top: -189px;
    .close-btn {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
    .form {
      .title-img {
        width: 288px;
        height: 24px;
        display: block;
        margin: 50px auto 40px;
      }
      .form-item {
        margin-top: 20px;
        font-size: 0;
        .name {
          display: inline-block;
          width: 116px;
          text-align: right;
          font-size: 16px;
        }
        .input {
          font-size: 16px;
          width: 322px;
          height: 50px;
          text-indent: 16px;
          background: #f7f7f7;
          padding: 0;
          outline: none;
          border: none;
        }
      }
      .appointment-btn {
        height: 50px;
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        line-height: 50px;
        width: 322px;
        height: 50px;
        background: #d50200;
        border-radius: 2px;
        text-align: center;
        margin: 40px 0 0 116px;
        cursor: pointer;
      }
      .appointment-btn:hover {
        background: #e60300;
      }
    }
    .success {
      text-align: center;
      .success-img {
        width: 95px;
        height: 95px;
        display: block;
        margin: 89px auto 40px;
      }
      .font-size-24px {
        font-size: 24px;
      }
    }
  }
}
</style>
