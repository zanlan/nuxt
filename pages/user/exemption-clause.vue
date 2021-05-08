<template>
  <div class="exemption-clause">
    <div class="container">
      <div class="content-container">
        <h1 class="title">免责条款</h1>
        <p>尊敬的投资者：</p>
        <p class="content">
          感谢您信任并使用深圳市金海九州基金销售有限公司网上基金交易系统！为便于您全面正确地理解网上基金交易的风险，特此提示您在决定采用网上基金交易的方式前仔细阅读以下内容：
        </p>
        <p class="content">
          鉴于我司已经最大限度地采取了有效措施保护投资者的资料和交易活动的安全。尽管如此，本着对投资者负责的态度，我司在此郑重提示投资者，除其他交易方式共同具有的风险以外，网上基金交易仍然存在下列风险，该风险包括但不限于：
        </p>
        <p class="content">
          （1）互联网是全球公共网络，并不受任何一个机构所控制。数据在互联网上传输的途径不是完全确定的，可能会受到非法干扰或侵入。
        </p>
        <p class="content">
          （2）在互联网上传输的数据有可能被某些未经许可的个人、团体或机构通过某种渠道获得或篡改。
        </p>
        <p class="content">
          （3）互联网上的数据传输可能因通信繁忙出现延迟，或因其他原因出现中断、停顿或数据不完全、数据错误等情况，从而使交易出现错误、延迟、中断或停顿。
        </p>
        <p class="content">
          （4）因地震、火灾、台风及其他各种不可抗力因素引起的停电、网络系统故障、电脑故障等原因可能造成投资人的经济损失。
        </p>
        <p class="content">
          （5）互联网上发布的各种信息（包括但不限于分析、预测性的参考资料）可能出现错误并误导投资人。
        </p>
        <p class="content">（6）投资者的网上交易身份可能会被泄露或仿冒。</p>
        <p class="content">
          （7）投资者使用的计算机可能因存在性能缺陷、质量问题、计算机病毒、硬件故障及其他原因，而对投资者的交易时间或交易数据产生影响，给投资者造成损失。
        </p>
        <p class="content">
          （8）由于投资者的计算机应用操作能力或互联网知识的缺乏或对有关信息的错误理解，可能对投资者的交易时间或交易数据造成影响，因此给投资者造成损失。
        </p>
        <p class="content">
          （9）因投资人自身的疏忽造成账号或密码泄露，可能会给投资人造成损失。
        </p>
        <p class="content">
          （10）因黑客攻击、电子病毒等非乙方原因造成甲方交易密码等重要信息泄露或遗失，由此给投资人造成损失的。
        </p>
        <p class="content">（11）其他可能导致投资者损失的风险或事项。</p>
        <p class="content">
          上述风险所导致的损失或责任，均应由投资者自行承担，我司对此不承担任何责任。投资者一经使用深圳市金海九州基金销售有限公司网上基金交易方式，即视为投资者已经完全了解并理解网上基金交易的风险，并且能够承担网上基金交易可能带来的风险或损失。尽管如此，本着对客户负责的态度，我公司承诺将采取先进的网络产品和技术措施，最大限度地保护客户资料和交易活动的安全。
        </p>
        <p class="content">
          我公司在此郑重提醒投资者，以上各条款均为免责条款，
          深圳市金海九州基金销售有限公司网上交易系统不承担与此相关的任何损失和法律责任。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '免责条款 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,公募,私募,财富,投资,免责条款',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '感谢您信任并使用深圳市金海九州基金销售有限公司网上基金交易系统！',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.exemption-clause {
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
