<template>
  <div class="private-fund-detail">
    <div class="container">
      <div class="btn-back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div>
        <div class="fund-detail-container">
          <div class="fund-detail">
            <p class="fund-name">
              {{ name }} <span class="fund-code">【{{ code }}】</span>
            </p>
            <div v-if="typeName" class="fund-tag">{{ typeName }}</div>
            <div
              v-if="riskName"
              class="fund-tag"
              :class="{ 'fund-tag-green': risk < 2 }"
            >
              {{ riskName }}
            </div>
            <div class="fund-price-panel">
              <div class="item-panel">
                <p class="value">{{ unitN }}</p>
                <p class="name">最新净值({{ navD }})</p>
              </div>
              <div class="line-y"></div>
              <div class="item-panel">
                <p class="value" :class="{ green: parseFloat(annualC) < 0 }">
                  {{ annualC }}%
                </p>
                <p class="name">成立以来年化涨幅</p>
              </div>
            </div>
            <p style="margin-top: 10px">
              成立日：{{
                establishDate
              }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;起投金额(元）：{{
                minInvest
              }}万
            </p>
          </div>
          <div class="fund-chart">
            <div class="fund-chart-types">
              <div
                class="type-item"
                :class="{ 'type-item-active': chartType == 1 }"
                @click="chartType = 1"
              >
                单位净值
              </div>
              <div
                class="type-item"
                :class="{ 'type-item-active': chartType == 0 }"
                @click="chartType = 0"
              >
                累计净值
              </div>
            </div>
            <div ref="lineChart" class="line-chart"></div>
          </div>
        </div>
        <div class="appointment">
          <div class="line"></div>
          <div class="appointment-btn" @click="appointment">立即预约</div>
        </div>
      </div>
      <div class="fund-history">
        <p class="decs">历史净值数据</p>
        <div class="list-head">
          <p>净值日期</p>
          <p>单位净值</p>
          <p>累计净值</p>
          <p>涨跌幅</p>
        </div>
        <div
          ref="listEl"
          class="infinite-list-wrapper"
          style="overflow: auto"
          @scroll="scroll"
        >
          <ul class="list">
            <li
              v-for="(item, index) in listData"
              :key="index"
              class="list-item"
            >
              <p>{{ item.navD }}</p>
              <p>{{ item.unitN }}</p>
              <p>{{ item.totalN }}</p>
              <p :class="item.navC >= 0 ? 'red' : 'green'">{{ item.navC }}%</p>
            </li>
          </ul>
          <p ref="loadEl">{{ noMore ? '没有更多了' : '加载中...' }}</p>
        </div>
      </div>
    </div>
    <Appointment
      v-if="showAppointment"
      :reserve-fund-code="code"
      :reserve-fund-name="name"
      @close="closeAppointment"
    />
  </div>
</template>

<script>
import Appointment from '@/components/private-fund/Appointment'
import { queryDetailPrivate, queryNavListPrivate } from '@/api'
export default {
  components: {
    Appointment,
  },
  data() {
    return {
      code: '',
      name: '',
      type: '',
      risk: '',
      navD: '',
      unitN: '',
      annualC: '',
      minInvest: '',
      establishDate: '',

      typeName: '',
      typeOption: {
        0: '股票型',
        2: '货币型',
        A: '混合型',
        E: '债券型',
      },
      riskName: '',
      riskOption: ['低风险', '中低风险', '中风险', '中高风险', '高风险'],
      chartType: 0,
      loading: false,
      listData: [],
      listDataAll: [],
      showAppointment: false,
    }
  },
  // async fetch() {
  //   try {
  //     // const fundCode = this.$route.params.detail
  //     const fundCode = this.$route.query.code
  //     const res = await queryDetailPrivate({
  //       fundCode,
  //     })
  //     this.code = res.data.code
  //     this.name = res.data.name
  //     this.type = res.data.type
  //     this.typeName = this.typeOption[this.type]
  //     this.risk = res.data.risk
  //     this.riskName = this.riskOption[this.risk]
  //     this.navD = res.data.navD
  //     this.unitN = res.data.unitN
  //     this.annualC = res.data.annualC
  //     this.minInvest = res.data.minInvest
  //     this.establishDate = res.data.establishDate

  //     const res2 = await queryNavListPrivate({
  //       fundCode,
  //       page: 1,
  //       pageCount: 2000,
  //     })
  //     this.listDataAll = res2.data.data
  //     if (process.client) {
  //       this.setChart()
  //     }
  //   } catch (error) {}
  // },
  // fetchOnServer: false,
  head() {
    return {
      title: `${this.name} [${this.code}] - 金海九州`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,公募,私募,财富',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '金海九州持续丰富金融产品体系，以代销多种类型私募基金产品，凭借公司专业且富有竞争力的产品研究团队，为高净值客户提供多元化的投资组合方案，满足其多样化的资产配置需求。 - 金海九州',
        },
      ],
    }
  },
  computed: {
    noMore() {
      return this.listData.length >= this.listDataAll.length
    },
  },
  watch: {
    chartType() {
      this.setChart()
    },
  },
  created() {},
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll)
  },
  mounted() {
    if (!this.$store.state.token) {
      this.$showToast('您必须先登录，才能访问该页面！')
      this.$router.push(`/user/login?redirect=${this.$route.fullPath}`)
      return
    }
    this.fetch2()
    this.addData()
    window.addEventListener('scroll', this.scroll)
    const echarts = require('echarts/lib/echarts')
    require('echarts/lib/component/grid')
    require('echarts/lib/chart/line')
    require('echarts/lib/component/tooltip')
    const el = this.$refs.lineChart
    this.lineChart = echarts.init(el)
    this.setChart()
  },
  methods: {
    async fetch2() {
      try {
        // const fundCode = this.$route.params.detail
        const fundCode = this.$route.query.code
        const res = await queryDetailPrivate({
          fundCode,
        })
        this.code = res.data.code
        this.name = res.data.name
        this.type = res.data.type
        this.typeName = this.typeOption[this.type]
        this.risk = res.data.risk
        this.riskName = this.riskOption[this.risk]
        this.navD = res.data.navD
        this.unitN = res.data.unitN
        this.annualC = res.data.annualC
        this.minInvest = res.data.minInvest
        this.establishDate = res.data.establishDate

        const res2 = await queryNavListPrivate({
          fundCode,
          page: 1,
          pageCount: 2000,
        })
        this.listDataAll = res2.data.data
        if (process.client) {
          this.setChart()
        }
      } catch (error) {}
    },
    goBack() {
      this.$router.push('/private-fund')
    },
    setChart() {
      if (this.listDataAll.length <= 0) return
      const xdata = this.listDataAll
        .map((item) => {
          return item.navD
        })
        .reverse()
      const ydata = this.listDataAll
        .map((item) => {
          return this.chartType == 0 ? item.totalN : item.unitN
        })
        .map((item) => {
          return item == '--' ? 0 : item
        })
        .map((item) => {
          return parseFloat(item)
        })
        .reverse()

      let ymin = ydata.reduce((pre, cur) => {
        return pre > cur ? cur : pre
      })
      let ymax = ydata.reduce((pre, cur) => {
        return pre > cur ? pre : cur
      })
      let minInterval = Math.ceil(((ymax - ymin) / 5) * 10000) / 10000
      ymax = minInterval * 5 + ymin
      if (minInterval == 0) {
        minInterval = ymax
        ymin = 0
      }

      const option = {
        grid: {
          top: 25,
          left: 80,
          right: 40,
          bottom: 78,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            animation: false,
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#979797',
            },
          },
          splitLine: {
            show: true,
          },
          axisLabel: { align: 'right', padding: [5, 0, 0, 0] },
          data: xdata,
        },
        yAxis: {
          type: 'value',
          show: true,
          min: ymin,
          max: ymax,
          interval: minInterval,
          minInterval,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#979797',
            },
          },
          axisLabel: {
            formatter(value) {
              return (Math.round(value * 10000) / 10000).toFixed(4)
            },
          },
        },
        series: [
          {
            data: ydata,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              color: '#D50200',
            },
            lineStyle: {
              color: '#D50200',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(213, 2, 0, 0.58)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(213, 2, 0, 0)', // 100% 处的颜色
                  },
                ],
              },
            },
          },
        ],
      }

      option && this.lineChart.setOption(option)
    },
    addData() {
      this.loading = false
      const from = this.listData.length
      for (let i = from; i < from + 20; i++) {
        if (this.listDataAll.length > i) {
          this.listData.push(this.listDataAll[i])
        }
      }
    },
    load() {
      this.loading = true
      setTimeout(this.addData, 100)
    },
    scroll(event) {
      // console.dir(this.$refs.loadEl)
      if (this.loading || this.noMore) return
      // const clientHeight = event.target.clientHeight
      // const scrollTop = event.target.scrollTop
      // const scrollHeight = event.target.scrollHeight
      // if (scrollTop + clientHeight + 10 > scrollHeight) {
      //   const rect = this.$refs.loadEl.getBoundingClientRect()
      //   if (rect.top < window.innerHeight) {
      //     this.load()
      //   }
      // }
      const loadRect = this.$refs.loadEl.getBoundingClientRect()
      const listRect = this.$refs.listEl.getBoundingClientRect()
      if (
        loadRect.top < window.innerHeight &&
        loadRect.top - listRect.top < this.$refs.listEl.clientHeight
      ) {
        this.load()
      }
    },
    appointment() {
      this.showAppointment = true
    },
    closeAppointment() {
      this.showAppointment = false
    },
  },
}
</script>

<style lang="scss" scoped>
.private-fund-detail {
  .container {
    position: relative;
    .btn-back {
      position: absolute;
      width: 56px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
      // top: 40px;
      left: -68px;
      cursor: pointer;
    }
    .appointment {
      margin-bottom: 40px;
      background: #ffffff;
      height: 110px;
      .line {
        height: 1px;
        width: 1122px;
        background: #e7e8eb;
        margin: 0 auto;
      }

      &-btn {
        margin: 29px auto;
        width: 322px;
        height: 50px;
        background: #d50200;
        border-radius: 2px;
        color: #ffffff;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .fund-detail-container {
      margin: 40px auto 0;
      padding: 40px 0 40px 40px;
      width: 1200px;
      height: 431px;
      background: #ffffff;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .fund-name {
        margin: 0;
        font-size: 24px;
        font-weight: bold;

        width: 500px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        white-space: nowrap;

        .fund-code {
          color: #b0b0b0;
        }
      }
      .fund-tag {
        display: inline-block;
        margin-top: 20px;
        padding: 0 14px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: rgba(213, 2, 0, 0.08);
        border-radius: 2px;
        border: 1px solid #d50200;
        color: #d50200;
      }
      .fund-tag-green {
        border: 1px solid #008002;
        color: #008002;
        background: rgba(0, 128, 2, 0.08);
      }

      .fund-price-panel {
        margin-top: 28px;
        width: 500px;
        height: 245px;
        background: #f7f7f7;

        display: flex;
        align-items: center;

        .item-panel {
          width: 250px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .line-y {
          width: 0px;
          height: 95px;
          border-left: 1px dotted #d50200;
        }
        .value {
          margin: 0;
          height: 52px;
          font-size: 45px;
          font-weight: bold;
          color: #d50200;
          line-height: 52px;
        }
        .green {
          color: #008002;
        }
        .name {
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
        }
      }

      .fund-chart {
        &-types {
          margin-top: 50px;
          padding-right: 40px;
          &::after {
            display: table;
            clear: both;
            content: '';
          }
          .type-item {
            float: right;
            // width: 88px;
            height: 28px;
            line-height: 28px;
            padding: 0 20px;
            border: 1px solid $theme-color;
            font-size: 12px;
            color: $theme-color;
            cursor: pointer;
          }
          .type-item-active {
            background: $theme-color;
            color: #ffffff;
            border: 1px solid $theme-color;
          }
        }
        .line-chart {
          width: 580px;
          height: 325px;
        }
      }
    }
    .fund-history {
      background: #ffffff;
      padding: 40px;
      margin-bottom: 58px;
      .decs {
        height: 28px;
        font-size: 24px;
        color: #392424;
        line-height: 28px;
        font-weight: bold;
        margin: 0 0 16px;
      }
      .list-head {
        border-top: 4px solid #d50200;
        height: 50px;
        background: rgba(213, 2, 0, 0.08);
        display: flex;
        justify-content: space-around;
        padding-right: 6px;
        p {
          width: 200px;
          text-align: center;
        }
      }
      .infinite-list-wrapper {
        max-height: 840px;
        font-size: 14px;
        text-align: center;
        .list-item {
          height: 50px;
          border-bottom: 1 solid #e7e8eb;
          display: flex;
          justify-content: space-around;
          p {
            width: 200px;
            text-align: center;
          }
        }
      }
      ::-webkit-scrollbar {
        width: 6px;
        height: 10px;
        background: #f7f7f7;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

        background: #e7e8eb;
      }
    }
  }
  .red {
    color: #d50200;
  }
  .green {
    color: #008002;
  }
}
</style>
