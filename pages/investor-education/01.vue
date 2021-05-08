<template>
  <div class="article">
    <div class="container">
      <div class="breadcrumb">
        <p>
          当前位置：
          <span
            style="color: #b0b0b0; cursor: pointer"
            @click="$router.push('/')"
            >首页
          </span>
          > <span>投资者教育</span>
        </p>
      </div>
      <div class="content-container">
        <h1 class="title">反洗钱知识小课堂-客户身份识别篇</h1>
        <!-- <p class="time">最近更新日期： 2021年3月5日</p> -->
        <div class="content">
          <p>
            金融机构承担着社会资金存储、融通和转移职能，也容易被洗钱犯罪分子利用，以看似正常的金融交易作掩护，进行洗钱。客户身份识别作为金融机构反洗钱三项核心业务之一，下面就为您简述一下客户身份识别的小知识：
          </p>
          <p>视频一：客户开户时应如实提供身份信息</p>
          <video width="720" controls>
            <source src="/mp4/如实提供身份信息.mp4" type="video/mp4" />
            您的浏览器不支持 HTML5 video 标签。
          </video>
          <p style="text-align: center; color: #b0b0b0">
            视频制作单位：中国人民银行
          </p>
          <p>
            根据《中华人民共和国反洗钱法》规定，金融机构在与客户建立业务关系或提供符合规定的一次性金融服务时，应当要求客户出示真实有效的身份证件或者其他身份证明文件，进行核对并登记。需核对、登记自然人客户的“身份基本信息”包括：客户的姓名、性别、国籍、职业、住所地或者工作单位地址、联系方式、身份证件或者身份证明文件的种类、号码和有效期限。除核对身份证件、登记基本信息外，金融机构还可采取要求客户补充其他身份资料或身份证明文件，回访客户，实地查访或者向公安、工商行政管理部门核实等措施识别客户身份。
          </p>
          <p>视频二：加强开户管理，保护账户安全</p>
          <video width="720" controls>
            <source src="/mp4/加强开户管理.mp4" type="video/mp4" />
            您的浏览器不支持 HTML5 video 标签。
          </video>
          <p style="text-align: center; color: #b0b0b0">
            视频制作单位：中国人民银行
          </p>
          <p>
            金海九州提醒投资者，对于不配合客户身份识别、有组织同时或分批开户、开户理由不合理、开立业务与客户身份不符合、有明显理由怀疑客户开立账户存在开卡倒卖或从事违法犯罪行为活动等情形，金融机构有权拒绝开户。
          </p>
          <p>如何保护自己，远离洗钱活动？</p>
          <p>
            1、主动配合金融机构进行客户身份识别，办理业务时按规定提供身份证件和基本身份信息，并在有关证件过期后及时更新；
          </p>
          <p>2、不要出租或出借自己的身份证件；</p>
          <p>3、不要出租或出借自己的账户；</p>
          <p>4、不要用自己的账户替他人提现；</p>
          <p>
            5、不要为规避监管标准而拆分交易，否则不但增加交易费用，降低交易效率，还会引致反洗钱资金监测人员的合理怀疑；
          </p>
          <p>6、选择安全可靠的金融机构。</p>
          <p>
            反洗钱作为一项社会公众义务，是我们共同的责任。支持国家反洗钱工作也是保护我们自己的利益。打击洗钱犯罪，我们一起行动！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '反洗钱知识小课堂-客户身份识别篇 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,反洗钱',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '反洗钱作为一项社会公众义务，是我们共同的责任。支持国家反洗钱工作也是保护我们自己的利益。打击洗钱犯罪，我们一起行动！- 金海九州',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.article {
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
    // margin-top: 40px;
    min-height: 600px;

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
      text-align: center;
      p {
        line-height: 30px;
        text-align: justify;
        text-indent: 32px;
      }
      video {
        outline: none;
      }
    }
  }
}
</style>
