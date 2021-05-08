<template>
  <div class="footer">
    <div class="container">
      <div class="nav-container">
        <ul class="nav">
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
            <nuxt-link class="nav-link" to="/investor-education"
              >投资者教育</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/company-announcement"
              >公司公告</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/about-us">关于我们</nuxt-link>
          </li>
        </ul>
        <div class="line-x"></div>
        <ul class="nav">
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              to="/user/risk-statement"
              target="_blank"
              >风险提示</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              to="/user/exemption-clause"
              target="_blank"
              >免责条款</nuxt-link
            >
          </li>
          <li class="nav-item" style="visibility: hidden">
            <nuxt-link class="nav-link" to="/law">法规专栏</nuxt-link>
          </li>
          <li class="nav-item" style="visibility: hidden">
            <nuxt-link class="nav-link" to="/investor-education"
              >投资者教育</nuxt-link
            >
          </li>
          <li class="nav-item" style="visibility: hidden">
            <nuxt-link class="nav-link" to="/company-announcement"
              >公司公告</nuxt-link
            >
          </li>
          <li class="nav-item" style="visibility: hidden">
            <nuxt-link class="nav-link" to="/about-us">关于我们</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="connect">
        <p class="title">联系方式</p>
        <p class="content">
          电子邮箱：pub@jhjzfund.com<br />办公地址：深圳市福田区富德生命保险大厦1106室
        </p>
      </div>
      <div class="line"></div>
      <div class="connect">
        <p class="title">客服电话</p>
        <p class="tel">400-677-3333</p>
      </div>
    </div>
    <div class="copyright">
      投资有风险，理财需谨慎 &nbsp;&nbsp;|&nbsp;&nbsp; 版权所有 © 2014-2021
      深圳市金海九州基金销售有限公司&nbsp;
      <a href="https://beian.miit.gov.cn/" target="_blank" class="beian"
        >粤ICP备17080336号</a
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  background: #313131;
  height: 212px;
  .container {
    height: 153px;
    box-sizing: border-box;
    padding: 40px 0;
    display: flex;
    justify-content: space-between;

    .nav-container {
      .nav {
        display: flex;
        align-items: center;
        // // height: 100%;
        justify-content: space-between;

        width: 512px;

        // &-item {
        //   position: relative;
        //   margin-right: 32px;
        // }
        // &-item:nth-child(6) {
        //   margin-right: 0;
        // }

        &-link {
          display: block;
          color: #979797;
          font-weight: 400;
          font-size: 14px;
          line-height: 25px;
          cursor: pointer;
        }
        // &-link:hover:after,
        // .nuxt-link-exact-active:after {
        //   content: '';
        //   width: 100%;
        //   height: 4px;
        //   background-color: $theme-color;
        //   position: absolute;
        //   bottom: 0;
        //   left: 0;
        // }
        // &-link:hover,
        // .nuxt-link-exact-active {
        //   color: $theme-color;
        // }
      }

      .line-x {
        width: 512px;
        height: 2px;
        background: #979797;
        margin: 15px 0;
      }
    }

    .connect {
      p {
        margin: 0;
      }
      .title {
        height: 25px;
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        line-height: 25px;
      }
      .content {
        margin-top: 5px;
        height: 75px;
        font-size: 14px;
        font-weight: 400;
        color: #979797;
        line-height: 25px;
      }
      .tel {
        margin-top: 9px;
        height: 35px;
        font-size: 30px;
        color: #ffffff;
        line-height: 35px;
        font-weight: 300;
      }
    }

    .line {
      width: 1px;
      height: 76px;
      background: #979797;
    }
  }
  .copyright {
    line-height: 59px;
    height: 59px;
    font-size: 14px;
    background: #121212;
    color: #7b7b7b;
    text-align: center;
    .beian {
      color: #7b7b7b;
      border-bottom: 1px solid #7b7b7b;
      cursor: pointer;
    }
  }
}
</style>
