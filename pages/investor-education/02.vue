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
        <h1 class="title">关于非自然人受益所有人，这个视频你要pick一下</h1>
        <!-- <p class="time">最近更新日期： 2021年3月5日</p> -->
        <div class="content">
          <p>
            2017年10月23日，中国人民银行印发了《中国人民银行关于加强反洗钱客户身份识别有关工作的通知》（银发﹝2017﹞235号）；2018年6月28日，央行又印发了《中国人民银行关于进一步做好受益所有人身份识别工作有关问题的通知》（银发﹝2018﹞164号），是对235号文的进一步延伸。
          </p>

          <p>
            这两个文件的下发，要求金融机构对新建立业务关系的客户有效开展客户身份识别，同时，制定切实可行的工作方案，排查、清理异常账户、休眠账户、非实名账户等，按时完成存量客户的受益所有人身份识别工作。
          </p>

          <p>
            反洗钱日日在做，这两个文件下发背景是什么？目的是什么？有什么新要求？要采取什么新措施？如何落地？下列视频将给您一一道来。
          </p>

          <p>视频一：非自然人客户如何配合金融机构识别受益所有人身份</p>
          <video width="720" controls>
            <source src="/mp4/受益人如何配合身份识别.mp4" type="video/mp4" />
            您的浏览器不支持 HTML5 video 标签。
          </video>
          <p style="text-align: center; color: #b0b0b0">
            视频制作单位：中国人民银行
          </p>
          <p>视频二：非自然客户受益所有人身份识别方法</p>
          <video width="720" controls>
            <source src="/mp4/受益人识别方法.mp4" type="video/mp4" />
            您的浏览器不支持 HTML5 video 标签。
          </video>
          <p style="text-align: center; color: #b0b0b0">
            视频制作单位：中国人民银行
          </p>
          <p>识别非自然人受益所有人有什么意义？</p>
          <p>
            2017年，国务院办公厅发布了《关于完善反洗钱、反恐怖融资、反逃税监管体制机制的意见》（简称“三反”意见），我国已将洗钱、恐怖融资、逃税等威胁金融稳定、社会安全的不法行为作为打击的重点。洗钱、恐怖融资、逃税犯罪都具有极强的隐蔽性，很多犯罪分子通过注册公司掩盖其非法资金的来源和性质。由于有不法资金不计成本的投入、有保护伞的支撑，这些不法企业会严重扰乱正常的市场经营秩序，对正当经营企业造成巨大的冲击。如一些贪官被抓获后，发现这个贪官名下实际控制了很多公司，通过其名下的公司对不当得利进行清洗；又比如某些明星，通过成立工作室、签订阴阳合同，逃税金额高达数亿。这些行为不但对社会风气造成了不良影响，也严重侵害了守法公民的正当利益！
          </p>
          <p>
            因此识别非自然人受益所有人对社会金融稳定及保护公民正当利益具有重要意义，识别受益所有人就是在为社会金融稳定添砖加瓦，有利于你我他。
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
      title: '关于非自然人受益所有人，这个视频你要pick一下 - 金海九州',
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
            '识别非自然人受益所有人对社会金融稳定及保护公民正当利益具有重要意义，识别受益所有人就是在为社会金融稳定添砖加瓦，有利于你我他。- 金海九州',
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
