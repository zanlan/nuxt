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
        <h1 class="title">非法集资套路深，瞪大眼睛防入坑</h1>
        <!-- <p class="time">最近更新日期： 2021年3月5日</p> -->
        <div class="content">
          <p>识破典型非法集资“四部曲”</p>
          <p>第一步：画饼</p>
          <p>
            非法集资人会编织一个或多个尽可能“高大上”的项目。以“新技术”、“新革命”、“新政策”、“区域链”、“虚拟货币”等为幌子，描绘一幅预期报酬丰厚的蓝图，把集资参与人的胃口“吊”起来，让其产生“不容错过”“机不可失”的错觉。非法集资人一般会把“饼”画大，尽可能吸引参与人眼球。
          </p>
          <img
            src="@/assets/images/investor-education/02.jpg"
            alt=""
            width="720px"
          />
          <p>第二步：造势</p>
          <p>
            利用一切资源把声势做大。非法集资人通常会举办各种造势活动，比如新闻发布会、产品推介会、现场观摩会、体验日活动、知识讲座等；组织集体旅游、考察等，赠送米面油、话费等小礼品；大量展示各种或真或假的“技术认证”“获奖证书”“政府批文”；公布一些领导视察影视资料，公司领导与政府官员、明星合影；故意把活动选在政府会议中心、礼堂进行，其场面之大、规格之高极具欺骗性。
          </p>
          <img
            src="@/assets/images/investor-education/03.jpg"
            alt=""
            width="720px"
          />
          <p>第三步：吸睛</p>
          <p>
            想方设法套取你口袋里的钱。非法集资人通过返点、分红，给参与人初尝“甜头”，使其相信把钱放在他那儿不仅有可观的收入，而且比放在自己口袋里还安全，参与人不仅将自己的钱倾囊而出，还动员亲友加入，集资金额越滚越大。
          </p>
          <img
            src="@/assets/images/investor-education/04.jpg"
            alt=""
            width="720px"
          />
          <p>第四步：跑路</p>
          <p>
            非法集资人往往会在“吸金”一段时间后跑路，或者因为原本就是“庞氏骗局”人去楼空，或者因为经营不善致使资金链断裂。集资参与人遭受惨重经济损失，甚至血本无归。
          </p>
          <img
            src="@/assets/images/investor-education/05.jpg"
            alt=""
            width="720px"
          />
          <p>如遇以下情形向公众集资的，务必提高警惕：</p>
          <p>1. 以“看广告、赚外快”“消费返利”为幌子的；</p>
          <p>2. 以境外投资股权、期权、外汇、贵金属等为幌子的；</p>
          <p>
            3. 以投资养老产业可获高额回报或“免费”养老、“以房”养老等为幌子的；
          </p>
          <p>4. 以私募入股、合伙办企业为幌子，但不办理企业工商注册登记的；</p>
          <p>5. 以投资虚拟货币、区块链等为幌子的；</p>
          <p>6. 以“扶贫”“互助”“慈善”“影视文化”等为幌子的；</p>
          <p>7. 在街头、商场、超市等发放投资理财等内容广告传单的；</p>
          <p>8. 以组织考察、旅游、讲座等方式招揽老年群众的；</p>
          <p>9. “投资、理财”公司、网站及服务器在境外的；</p>
          <p>10. 要求以现金方式或向个人账户、境外账户缴纳投资款的。</p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '非法集资套路深，瞪大眼睛防入坑 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,证券,反洗钱',
        },
        {
          hid: 'description',
          name: 'description',
          content: '非法集资套路深，瞪大眼睛防入坑 - 金海九州',
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
