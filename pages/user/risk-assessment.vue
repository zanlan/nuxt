<template>
  <div class="risk-assessment">
    <div class="container">
      <div v-if="step == 1" key="step-1">
        <img
          src="@/assets/images/title-risk-assessment-1.png"
          alt=""
          class="title"
        />
        <div class="line"></div>
        <p class="font-size-16px">尊敬的投资者：</p>
        <p class="margin-bottom-20px">
          为切实保障您的权益，应中国证券投资基金业协会《私募投资基金募集行为管理办法》要求，投资者了解私募基金信息前应提供真实身份信息并参与风险问卷评测，敬请完成您投资信息的补充和测评认证，谢谢您的支持。
        </p>
        <div v-for="(item, index) in questions" :key="index" class="question">
          <p>{{ `【${index + 1}】 ${item}` }}</p>
          <el-radio v-model="answers[index]" :label="1">是</el-radio>
          <el-radio v-model="answers[index]" :label="0">否</el-radio>
        </div>
        <div class="next" @click="next">下一页</div>
      </div>
      <div v-if="step == 2" key="step-2">
        <img
          src="@/assets/images/title-risk-assessment-2.png"
          alt=""
          class="title width-144px"
        />
        <div class="line"></div>
        <p class="margin-bottom-20px">
          为了便于您了解自身的风险承受能力，选择合适的投资产品和服务，请您填写以下风险承受能力评估问卷。下列问题可协助评估您对投资产品和服务的风险承受能力，请您根据自身情况认真选择。
        </p>
        <div
          v-for="(item, index) in questionnaires"
          :key="index"
          class="question"
        >
          <p>{{ `【${index + 1}】 ${item.questionContent}` }}</p>
          <el-radio-group v-model="item.optionNo">
            <el-radio
              v-for="(answer, j) in item.memberQuestionOptionlistResp"
              :key="j"
              :label="answer.optionNo"
              style="display: block; margin-bottom: 14px"
              >{{ answer.optionContent }}</el-radio
            >
          </el-radio-group>
        </div>
        <div class="next" @click="result">下一页</div>
      </div>
      <div v-if="step == 3">
        <img
          src="@/assets/images/title-risk-assessment-3.png"
          alt=""
          class="title width-144px"
        />
        <div class="line"></div>
        <p class="font-size-16px">尊敬的投资者：</p>
        <p style="margin-bottom: 0px">
          > 根据您所选择的问卷答案，您的风险承受能力为：
          <span style="color: #d50200">{{ riskTypeMsg }}</span>
        </p>
        <p class="riskTypeMsgLevel">
          > 适合您的基金产品风险等级为：
          <span style="color: #d50200">{{ riskTypeMsgLevel }} </span>
        </p>
        <div class="result-container">
          <div v-for="(item, index) in resultSteps" :key="index" class="result">
            <div
              class="index"
              :class="{
                'index-active': index < active,
                'index-active-position': index == active - 1,
              }"
            >
              {{ index + 1 }}
            </div>
            <div v-if="index == active - 1" class="position">您在此</div>
            <p class="desc" :class="{ 'desc-active': index < active }">
              {{ item }}
            </p>
            <p class="level">{{ riskLevels[index] }}</p>
            <div
              v-if="index != resultSteps.length - 1"
              class="result-line"
              :class="{ 'line-active': index < active - 1 }"
            ></div>
          </div>
        </div>
        <div class="btn-container">
          <div class="try-again" @click="tryAgain">再次测评</div>
          <nuxt-link to="/private-fund">
            <div class="private-fund">浏览产品</div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  saveInvestorQualify,
  queryQuestionnaireOptionInfo,
  queryQuestionOptionLevel,
} from '@/api'
export default {
  data() {
    return {
      step: 1,
      questions: [
        '您是否确认是为自己购买的私募基金产品？',
        '您是否确认金融资产不低于300万元？（金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等）',
        '您是否确认最近三年个人年均收入不低于50万元？',
      ],
      answers: [],
      questionnaires: [],
      resultSteps: ['保守型', '稳健型', '平衡型', '成长型', '进取型'],
      riskLevels: ['低风险', '中低风险', '中风险', '中高风险', '高风险'],
      active: 3,
      riskTypeCode: 0,
      riskTypeMsg: '',
      riskTypeMsgLevel: '',
    }
  },
  // async fetch() {
  //   try {
  //     const res = await queryQuestionnaireOptionInfo()
  //     this.questionnaires = res.data
  //   } catch (error) {}
  // },
  // fetchOnServer: false,
  head() {
    return {
      title: '风险测评 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,公募,私募,财富,投资',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '深圳市金海九州基金销售有限公司成立于2014年7月，经中国证券监督管理委员会批准从事基金销售业务。金海九州秉承“诚信立业，客户为本，专业共赢”的理念，以专业的投研团队为核心，以完善的风控体系为依托，以优秀的投资顾问为支撑，为客户提供专业、全面、便捷的金融服务。 - 金海九州',
        },
      ],
    }
  },
  mounted() {
    if (!this.$store.state.token) {
      this.$showToast('您必须先登录，才能访问该页面！')
      this.$router.push(`/user/login?redirect=${this.$route.fullPath}`)
      return
    }
    this.fetch2()
    if (this.$store.state.riskTypeCode != -1) {
      this.step = 3
      this.active = this.$store.state.riskTypeCode || 1
      this.riskTypeCode = this.$store.state.riskTypeCode
      this.riskTypeMsg = this.$store.state.riskTypeMsg

      const temp = ['低', '中低', '中', '中高', '高']

      this.riskTypeMsgLevel = ''
      for (let i = 0; i < this.active; i++) {
        if (i > 0) {
          this.riskTypeMsgLevel += '、'
        }
        this.riskTypeMsgLevel += temp[i]
      }
      this.riskTypeMsgLevel += '风险产品'
      if (this.riskTypeCode == -2) {
        this.riskTypeMsgLevel = '--'
      }
    }
  },
  methods: {
    async fetch2() {
      try {
        const res = await queryQuestionnaireOptionInfo()
        this.questionnaires = res.data
      } catch (error) {}
    },
    next() {
      for (let i = 0; i < 3; i++) {
        if (this.answers[i] == undefined) {
          this.$showToast(`请填写第${i + 1}题`)
          return
        }
      }
      if (!this.answers[0] || (!this.answers[1] && !this.answers[2])) {
        this.$showToast(
          '根据监管合规要求，您暂不符合私募产品合格投资者认证标准。'
        )
        return
      }
      saveInvestorQualify({
        investorQualifyList: [
          {
            questionnaireId: 0,
            optionNo: this.answers[0],
          },
          {
            questionnaireId: 1,
            optionNo: this.answers[1],
          },
          {
            questionnaireId: 2,
            optionNo: this.answers[2],
          },
        ],
      })
      this.step = 2
    },
    result() {
      const questionOptionals = []
      for (let i = 0; i < this.questionnaires.length; i++) {
        if (this.questionnaires[i].optionNo == undefined) {
          this.$showToast(`请填写第${i + 1}题`)
          return
        }
        questionOptionals.push({
          questionnaireId: this.questionnaires[i].questionnaireId,
          optionNo: this.questionnaires[i].optionNo,
        })
      }
      queryQuestionOptionLevel({ questionOptionals }).then((res) => {
        // console.log(res)
        // 风险类型 0-最低保守型 1-保守型 2-稳健型 3-平衡型 4-成长型 5-进取型
        //  低、中低、中等风险产品
        this.step = 3
        this.active = res.data.riskTypeCode || 1
        this.riskTypeCode = res.data.riskTypeCode
        this.riskTypeMsg = res.data.riskTypeMsg
        this.$store.commit('setRiskTypeCode', res.data.riskTypeCode)
        this.$store.commit('setRiskTypeMsg', res.data.riskTypeMsg)

        const temp = ['低', '中低', '中', '中高', '高']

        this.riskTypeMsgLevel = ''
        for (let i = 0; i < this.active; i++) {
          if (i > 0) {
            this.riskTypeMsgLevel += '、'
          }
          this.riskTypeMsgLevel += temp[i]
        }
        this.riskTypeMsgLevel += '风险产品'
      })
    },
    tryAgain() {
      this.step = 1
      this.answers = []
      // this.$fetch()
      this.fetch2()
    },
  },
}
</script>

<style lang="scss" scoped>
.risk-assessment {
  .container {
    margin: 40px auto;
    padding: 40px;
    background: #fff;
    box-sizing: border-box;

    .title {
      width: 96px;
      height: 24px;
    }
    .line {
      width: 100%;
      height: 1px;
      background: #e7e8eb;
      margin: 40px 0 30px;
    }
    p {
      text-align: justify;
      line-height: 30px;
      font-size: 14px;
    }
    .next {
      width: 184px;
      height: 40px;
      background: #d50200;
      border-radius: 2px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      margin: 30px auto 0;
      cursor: pointer;
    }

    .result-container {
      width: 1120px;
      height: 209px;
      background: #f7f7f7;
      border-radius: 6px 10px 10px 10px;
      border: 1px solid #e7e8eb;

      .result {
        float: left;
        width: 215px;
        position: relative;
        margin-top: 93px;
        .index {
          width: 32px;
          height: 32px;
          background: #f7f7f7;
          border-radius: 50%;
          line-height: 32px;
          text-align: center;
          color: #b0b0b0;
          border: 1px solid #b0b0b0;
          font-size: 16px;
          margin: 0 auto;
          box-sizing: border-box;
          position: relative;
        }
        .index-active {
          background: #1f93fe;
          color: #fff;
          border: 1px solid #1f93fe;
        }
        .index-active-position {
          background: #f7f7f7;
          color: #f7f7f7;
          border: 1px solid #1f93fe;
        }
        .index-active-position::after {
          content: '';
          position: absolute;
          width: 15px;
          height: 7px;
          background: transparent;
          top: 9px;
          left: 7px;
          border: 1px solid #1f93fe;
          border-top: none;
          border-right: none;
          transform: rotate(-45deg);
        }
        .position {
          width: 90px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background: #1f93fe;
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
          border-radius: 50px;
          color: #fff;
          position: absolute;
          top: -60px;
          left: 60px;
        }
        .position::after {
          content: '';
          width: 0;
          height: 0;
          border: 7px solid #1f93fe;
          border-color: #1f93fe transparent transparent;
          position: absolute;
          top: 50px;
          left: 41px;
        }
        .desc {
          height: 32px;
          font-size: 16px;
          font-weight: 500;
          line-height: 32px;
          text-align: center;
          margin-top: 0px;
          position: absolute;
          top: 0px;
          left: 130px;
        }
        .desc-active {
          font-weight: bold;
        }
        .level {
          height: 22px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
          position: absolute;
          top: 10px;
          left: 130px;
        }
        .result-line {
          height: 1px;
          width: 100px;
          border-bottom: 1px solid #b0b0b0;
          position: absolute;
          top: 16px;
          left: 190px;
        }
        .line-active {
          border-bottom: 1px solid #1f93fe;
        }
      }
    }

    .btn-container {
      margin: 100px auto 0;
      width: 400px;
      .try-again {
        width: 184px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 2px;
        border: 1px solid #d50200;
        color: #d50200;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-block;
      }
      .try-again:hover {
        background: #d50200;
        color: #ffffff;
      }
      .private-fund {
        width: 184px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #d50200;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        margin-left: 20px;
      }
      .private-fund:hover {
        background: #e60300;
      }
    }
    .font-size-16px {
      font-size: 16px;
    }
    .margin-bottom-20px {
      margin-bottom: 20px;
    }
    .width-144px {
      width: 144px;
    }
    .riskTypeMsgLevel {
      margin-bottom: 30px;
      margin-top: 0;
    }
  }
}
</style>
<style lang="scss">
.risk-assessment {
  .el-radio {
    margin-left: 42px;
    margin-right: 15px;
    span {
      color: $font-color;
    }
  }
}
</style>
