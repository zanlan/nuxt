<template>
  <div class="risk-statement">
    <div class="container">
      <div class="content-container">
        <h1 class="title">风险提示函</h1>
        <p class="content">
          证券投资基金是一种集中资金、专业管理、分散投资、规避个股风险、分享
          投资成果的投资工具，投资者根据所持基金份额享受基金的收益，同时需承担投
          资亏损的风险。基金不同于银行储蓄和债券产品，它主要投资于上市股票、债券
          及法律法规允许投资的其他金融工具。
        </p>
        <p class="content">
          鉴于投资股票及其他金融工具所固有的风险，基金投资具有一定的风险性，
          不能保证投资者一定获得盈利，也不保证最低收益；投资者有可能获得较高的收
          益，也有可能损失本金。不同类别的基金由于投资范围及投资比例等方面的差异，
          具有不同的风险收益特征。一般来说，基金的预期收益越高，风险也越大。投资
          者应注意区分不同基金产品的风险收益特征。基金过往的业绩并不代表其将来的
          表现。因此，请投资者慎重考虑“买者自负”的原则，谨慎投资。
        </p>
        <p class="content">
          投资者应根据自身的年龄、收入水平、投资目的、投资期限、收益预期和风
          险承受能力进行客观的评估，权衡选择适合自己的基金产品。公司履行投资者适
          当性职责不能取代客户本人的投资判断，不会降低金融产品或金融服务的固有风
          险，也不会影响客户依法承担相应的投资风险、履约责任以及费用。首先，要注
          意分散投资，要在银行、保险、资本市场中合理配置资产。其次，要注重产品选
          择与风险承受能力和理财目标相匹配。第三，要注意选择优秀基金管理公司的产
          品, 应该选择产品风格稳定、持股集中度和换手率较低、信息透明度较高、注重
          投资者教育的基金管理公司的产品。第四， 要注重选择入市时机，避免在市场
          过度炒作时做出非理性的投资决策。
        </p>
        <p class="content">
          资本市场和基金市场的发展历史均表明，没有只涨不跌的资本市场，也没有
          稳赚不赔的金融产品，以投机的方式参与市场的投资者，其承受的投资损失可能
          越大，恢复本金所花费的时间也可能更长。基金是长期理财工具，而不是短期炒
          作的发财工具。投资者在投资本公司旗下基金之前，应仔细阅读该基金的基金合
          同、招募说明书以及本公司在中国证监会指定信息披露媒体上发布的公告和有关
          信息、以及监管对销售适当性的要求，做出理性的投资决策。投资人交易行为导
          致持有份额集中度达到或者超过 50%,本公司有权拒绝或部分拒绝该交易申请。
        </p>
        <p class="content">
          本人（本机构）在此确认己仔细阅读以上风险提示，并理解上述风险提示，
          本人的投资决策系根据本人（本机构）的实际情况及自身风险承受能力做出，投
          资风险由本人（本机构）自行承担。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '风险提示函 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,公募,私募,财富,投资,风险提示函',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '证券投资基金（以下简称“基金”）是一种长期投资工具，其主要功能是分散投资，降低投资单一证券所带来的个别风险。基金不同于银行储蓄和债券等能够提供固定收益预期的金融工具，投资人购买基金，既可能按其持有份额分享基金投资所产生的收益，也可能承担基金投资所带来的损失。 - 金海九州',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.risk-statement {
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
    margin-top: 40px;
    min-height: 600px;

    .title {
      height: 28px;
      font-size: 24px;
      font-weight: normal;
      color: #392424;
      line-height: 28px;
      text-align: center;
      margin-bottom: 30px;
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
