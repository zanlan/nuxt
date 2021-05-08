<template>
  <div class="header">
    <div class="container">
      <a href="/" class="logo">
        <img
          class="logo"
          src="@/assets/images/logo@2x.png"
          alt="金海九州,logo"
          title="金海九州logo"
        />
      </a>
      <ul class="nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/" exact>首页</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/public-fund">公募基金</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/private-fund">私募基金</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/law">法规专栏</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/investor-education">
            投资者教育
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/company-announcement">
            公司公告
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/recruit">人才招聘</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/about-us">关于我们</nuxt-link>
        </li>
      </ul>
      <div v-if="!isLogin" class="user">
        <nuxt-link :to="redirect">
          <div class="btn-plain btn-plain-red">登录</div>
        </nuxt-link>
        <nuxt-link to="/user/register">
          <div class="btn-plain btn-plain-red margin-left-10px">注册</div>
        </nuxt-link>
      </div>
      <div v-else class="user-info">
        欢迎您，{{ username }}
        <div class="anglg"></div>
        <div class="menu-panel">
          <nuxt-link to="/user/risk-assessment">
            <div class="menu">风险测评</div>
          </nuxt-link>
          <nuxt-link to="/user/modify-password">
            <div class="menu">修改密码</div>
          </nuxt-link>
          <div class="menu" @click="logout">退出</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    isLogin() {
      return this.$store.state.phone
    },
    username() {
      return this.$store.state.username
    },
    redirect() {
      const temp = [
        'user-register',
        'user-login',
        'user-forget-password',
        'user-modify-password',
        'user-risk-assessment',
      ]
      if (temp.includes(this.$route.name)) {
        return '/user/login'
      }
      return '/user/login?redirect=' + this.$route.fullPath
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: $header-height;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
}
.container,
.nav {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo {
  width: 171px;
  height: 52px;
}
.nav {
  flex: 1;
  height: 100%;
  justify-content: center;

  &-item {
    padding: 0 10px;
    margin: 0 10px;
    position: relative;
  }

  &-link {
    display: block;
    height: 100%;
    line-height: $header-height;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
  }
  &-link:hover:after,
  .nuxt-link-active:after {
    content: '';
    // width: 100%;
    width: 64px;
    height: 4px;
    background-color: $theme-color;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -32px;
  }
  &-link:hover,
  .nuxt-link-active {
    color: $theme-color;
  }
}
.user {
  display: flex;
  .margin-left-10px {
    margin-left: 10px !important;
  }
}
.btn-plain {
  padding: 0 20px;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  border: 1px solid;
  cursor: pointer;
}
.btn-plain-red {
  color: $theme-color;
  border-color: $theme-color;
}
.btn-plain-red:hover {
  background: $theme-color;
  color: #fff;
}
.user-info {
  // display: flex;
  // align-items: center;
  cursor: pointer;
  position: relative;
  height: $header-height;
  line-height: $header-height;
}
.anglg {
  margin: 0 0 2px 10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 4px 0;
  border-color: $font-color transparent transparent;
  display: inline-block;
}
.user-info:hover {
  .menu-panel {
    display: block;
  }
}
.menu-panel {
  width: 150px;
  height: 120px;
  background: #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  border: 1px solid #e4e7ed;
  position: absolute;
  right: 0;
  top: 60px;
  display: none;

  color: #5a5e66;
  font-size: 14px;
  .menu {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }
  .menu:hover {
    color: $theme-color;
  }
}
.menu-panel::after {
  content: '';
  width: 10px;
  height: 10px;
  background: #ffffff;
  border-top: 1px solid #e4e7ed;
  border-left: 1px solid #e4e7ed;
  position: absolute;
  top: -6px;
  right: 24px;
  transform: rotate(45deg);
}
</style>
