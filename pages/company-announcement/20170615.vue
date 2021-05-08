<template>
  <div class="company-announcement">
    <div class="container">
      <div class="breadcrumb">
        <p>
          当前位置：
          <span
            style="color: #b0b0b0; cursor: pointer"
            @click="$router.push('/')"
            >首页
          </span>
          > <span>公司公告</span>
        </p>
      </div>
      <div class="content-container">
        <h1 class="title">
          深圳市金海九州基金销售有限公司关于选用基金评价公司的公告
        </h1>
        <p class="time">2017-06-15</p>
        <p class="content">
          深圳市金海九州基金销售有限公司（以下简称：金海九州）已与上海证券有限责任公司（以下简称：上海证券）
          达成合作协议，上海证券授权金海九州合法使用上海证券所发布的公募基金风险等级评级表、公募基金综合评级表等。
          金海九州旗下官网及柜台业务所展示的基金评价相关内容，包括基金风险等级的划分、基金评级数据，均依据上海证券
          的季度报告。金海九州依据上述报告内容及时调整更新基金评价数据。
        </p>
        <div class="sign">
          <p class="sign-name">深圳市金海九州基金销售有限公司</p>
          <p class="sign-time">二〇一七年六月十五日</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title:
        '深圳市金海九州基金销售有限公司关于选用基金评价公司的公告 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '深圳市金海九州基金销售有限公司关于选用基金评价公司的公告 - 金海九州',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.company-announcement {
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

  .content-container {
    padding: 40px;
    background-color: #ffffff;
    margin-bottom: 40px;
    box-sizing: border-box;
    min-height: calc(100vh - 398px);

    .title {
      height: 28px;
      font-size: 24px;
      font-weight: normal;
      color: #392424;
      line-height: 28px;
      text-align: center;
    }

    .time {
      height: 22px;
      font-size: 16px;
      font-weight: 400;
      color: #b0b0b0;
      line-height: 22px;
      text-align: center;
    }

    .content {
      line-height: 30px;
      text-align: justify;
      text-indent: 32px;
    }
    .sign {
      float: right;
      text-align: right;
    }
  }
}
</style>
