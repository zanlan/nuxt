<template>
  <div class="private-fund-detail">
    <div class="container">
      <div class="btn-back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="fund-info">
        <div class="fund-title">
          <p class="fund-name">
            {{ name }}<span class="fund-code"> {{ code }}</span>
          </p>
          <div v-if="typeName" class="fund-flag">{{ typeName }}</div>
          <div v-if="riskName" class="fund-flag">{{ riskName }}</div>
        </div>
        <div class="info-panel">
          <div class="row row-one">
            <p class="key">
              最新净值({{ navD }})：
              <span class="value">{{ unitN }}</span>
            </p>
            <p class="key">
              成立以来年化涨幅：
              <span
                class="value red"
                :class="{ green: parseFloat(annualC) < 0 }"
              >
                {{ annualC }}%
              </span>
            </p>
          </div>
          <div class="row">
            <p class="key">
              起投金额(元）：
              <span class="value">{{ minInvest }}万</span>
            </p>
            <p class="key">
              成立日期：
              <span class="value" style="font-size: 14px; color: #392424">
                {{ establishDate }}
              </span>
            </p>
          </div>
          <div class="appointment" @click="appointment">立即预约</div>
        </div>
      </div>
      <div class="tabs">
        <div
          class="tab-item"
          :class="{ 'tab-item-active': tabIndex == 0 }"
          @click="tabIndex = 0"
        >
          基金净值
        </div>
        <div
          class="tab-item"
          :class="{ 'tab-item-active': tabIndex == 1 }"
          @click="tabIndex = 1"
        >
          基金公告
        </div>
      </div>
      <div v-show="tabIndex == 0" class="fund-chart">
        <div class="fund-chart-types">
          <div
            class="type-item"
            :class="{ 'type-item-active': chartType == 0 }"
            @click="chartType = 0"
          >
            累计净值
          </div>
          <div
            class="type-item"
            :class="{ 'type-item-active': chartType == 1 }"
            @click="chartType = 1"
          >
            单位净值
          </div>
        </div>
        <div ref="lineChart" class="line-chart"></div>
      </div>
      <div v-show="tabIndex == 0" class="fund-history">
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
      <ul v-show="tabIndex == 1" class="lists">
        <li
          v-for="(item, index) in companyAnnouncements"
          :key="index"
          class="list-item"
          @click="clickListItem(item)"
        >
          <p class="item-name">
            <span class="dot"></span>
            {{ item.name }}
          </p>
          <p class="item-time">{{ item.time }}</p>
        </li>
      </ul>
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
import { companyAnnouncements } from '@/config/index.js'
import { openWindow } from '@/utils'
export default {
  components: {
    Appointment,
  },
  data() {
    return {
      companyAnnouncements,
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

      tabIndex: 0,
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
  //     this.addData()
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
    clickListItem(item) {
      openWindow(item.url)
    },
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
        this.addData()
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
          top: 20,
          left: 90,
          right: 40,
          bottom: 30,
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
          axisLabel: {
            // align: 'right',
            padding: [5, 0, 0, 0],
          },
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
              color: '#F5DEBB',
            },
            lineStyle: {
              color: '#F5DEBB',
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
                    color: 'rgba(245, 222, 187, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(229, 211, 184, 0.01)', // 100% 处的颜色
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
    margin-top: 40px;
    position: relative;
    background: #ffffff;
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

    .fund-info {
      padding: 40px;
      .fund-title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .fund-name {
          color: #392424;
          font-size: 24px;
          margin-right: 40px;
          margin-bottom: 0;
          margin-top: 0;
          .fund-code {
            color: #b0b0b0;
          }
        }
        .fund-flag {
          display: inline-block;
          margin-left: 10px;
          padding: 0 14px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          background: #e5d3b8;
          border-radius: 2px;
          border: 1px solid #e5d3b8;
          color: #392424;
        }
      }
      .info-panel {
        height: 200px;
        background: #f7f7f7;
        overflow: hidden;
        position: relative;
        .row {
          margin-left: 50px;
          margin-top: 20px;
          display: flex;
          align-items: flex-end;
          .key {
            color: #666666;
            font-size: 14px;
            width: 360px;
            margin: 0;
            .value {
              color: #4d3935;
              font-size: 24px;
            }
          }
        }
        .row-one {
          margin-top: 60px;
        }
        .appointment {
          position: absolute;
          top: 75px;
          right: 125px;
          width: 120px;
          height: 50px;
          background: #d50200;
          border-radius: 2px;
          line-height: 50px;
          font-size: 18px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .tabs {
      display: flex;
      margin: 0 40px;
      border-bottom: 1px solid $theme-color;
      .tab-item {
        height: 36px;
        line-height: 36px;
        padding: 0 20px;
        border: 1px solid $theme-color;
        border-bottom: none;
        font-size: 16px;
        color: $theme-color;
        cursor: pointer;
      }
      .tab-item-active {
        background: $theme-color;
        color: #ffffff;
        border: 1px solid $theme-color;
        position: relative;
      }
      .tab-item-active:after {
        content: '';
        width: 0;
        height: 0;
        border: 6px solid $theme-color;
        border-color: $theme-color transparent transparent;
        position: absolute;
        top: 36px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .fund-chart {
      &-types {
        margin-top: 30px;
        padding: 0 40px;
        display: flex;
        .type-item {
          // width: 88px;
          height: 28px;
          line-height: 28px;
          margin-right: 20px;
          background: #ffffff;
          font-size: 12px;
          color: #392424;
          cursor: pointer;
        }
        .type-item-active {
          color: #d50200;
        }
      }
      .line-chart {
        width: 100%;
        height: 310px;
      }
    }

    .fund-history {
      background: #ffffff;
      padding: 25px 40px 40px;
      margin-bottom: 58px;
      .decs {
        height: 28px;
        font-size: 16px;
        color: #392424;
        line-height: 28px;
        // font-weight: bold;
        margin: 0 0 16px;
      }
      .list-head {
        height: 50px;
        background: #f7f7f7;
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

    .lists {
      // list-style: disc;
      padding: 20px 40px 40px;
      margin-bottom: 40px;
      .list-item {
        cursor: pointer;
        height: 60px;
        border-bottom: 1px solid #e7e8eb;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-name {
          transition: all 0.2s linear;
          .dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            background: #392424;
            margin-right: 20px;
            border-radius: 50%;
            margin-bottom: 1px;
          }
        }

        .item-time {
          color: #b0b0b0;
        }
      }
      .list-item:hover {
        color: $theme-color;
        .item-name {
          padding-left: 10px;
          .dot {
            background: $theme-color;
          }
        }
        .item-time {
          color: $theme-color;
        }
      }
    }
  }
  .red {
    color: #d50200 !important;
  }
  .green {
    color: #008002 !important;
  }
}
</style>
