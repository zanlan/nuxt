<template>
  <div class="about-us">
    <div class="container">
      <div class="breadcrumb">
        <p>
          当前位置：
          <span
            style="color: #b0b0b0; cursor: pointer"
            @click="$router.push('/')"
            >首页
          </span>
          > <span>关于我们</span>
        </p>
      </div>
      <div class="content">
        <img
          class="title-img"
          src="@/assets/images/title-about-us.png"
          alt="关于我们"
        />
        <p class="text-indent-32px">
          深圳市金海九州基金销售有限公司成立于2014年7月，经中国证券监督管理委员会批准从事基金销售业务。金海九州秉承“诚信立业，客户为本，专业共赢”的理念，以专业的投研团队为核心，以完善的风控体系为依托，以优秀的投资顾问为支撑，为客户提供专业、全面、便捷的金融服务。
        </p>
        <p>客服电话：400-677-3333</p>
        <p>电子邮箱：pub@jhjzfund.com</p>
        <p>办公地址：深圳市福田区富德生命保险大厦1106室</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '关于我们 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,公募，私募，关于我们',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '深圳市金海九州基金销售有限公司成立于2014年7月，经中国证券监督管理委员会批准从事基金销售业务。金海九州秉承“诚信立业，客户为本，专业共赢”的理念，以专业的投研团队为核心，以完善的风控体系为依托，以优秀的投资顾问为支撑，为客户提供专业、全面、便捷的金融服务。',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.about-us {
  .text-indent-32px {
    text-indent: 32px;
  }
  .breadcrumb {
    display: flex;
    margin: 28px 0 20px;
    font-size: 16px;
    color: #b0b0b0;

    p {
      margin: 0;
    }
    span {
      color: $font-color;
    }
  }

  .content {
    padding: 40px;
    background-color: #ffffff;
    margin-bottom: 40px;
    box-sizing: border-box;
    min-height: calc(100vh - 398px);

    .title-img {
      display: block;
      width: 96px;
      height: 24px;
      margin-bottom: 20px;
    }

    p {
      line-height: 30px;
      text-align: justify;
      // word-break: break-all;
    }
  }
}
</style>
