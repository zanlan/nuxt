<template>
  <div class="public-fund-detail">
    <div class="container">
      <div class="btn-back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="fund-detail-container">
        <div class="fund-detail">
          <p class="fund-name">
            {{ name }} <span class="fund-code">{{ code }}</span>
          </p>
          <div class="fund-tag-container">
            <div v-if="typeName" class="fund-tag">{{ typeName }}</div>
            <div v-if="riskName" class="fund-tag">
              {{ riskName }}
            </div>
          </div>

          <div v-if="type != 2" class="fund-price-panel">
            <div class="item-panel">
              <p class="value">{{ unitN }}</p>
              <p class="name">最新单位净值({{ navD }})</p>
            </div>
            <div class="line-y"></div>
            <div class="item-panel">
              <p
                class="value"
                :class="{
                  red: parseFloat(navC) >= 0,
                  green: parseFloat(navC) < 0,
                }"
              >
                {{ navC }}{{ navC.startsWith('--') ? '' : '%' }}
              </p>
              <p class="name">日涨幅({{ navD }})</p>
            </div>
          </div>
          <div v-else class="fund-price-panel">
            <div class="item-panel">
              <p class="value">{{ incomeU }}</p>
              <p class="name">万份收益({{ navD }})</p>
            </div>
            <div class="line-y"></div>
            <div class="item-panel">
              <p
                class="value"
                :class="{
                  red: parseFloat(incomeR) >= 0,
                  green: parseFloat(incomeR) < 0,
                }"
              >
                {{ incomeR }}{{ incomeR.startsWith('--') ? '' : '%' }}
              </p>
              <p class="name">七日年化收益率</p>
            </div>
          </div>
        </div>
        <div class="fund-chart">
          <div class="fund-chart-types">
            <div
              class="type-item"
              style="border-left: none"
              :class="{ 'type-item-active': chartType == 1 }"
              @click="chartType = 1"
            >
              {{ type != 2 ? '单位净值' : '万份收益' }}
            </div>
            <div
              class="type-item"
              style="border-right: none"
              :class="{ 'type-item-active': chartType == 0 }"
              @click="chartType = 0"
            >
              {{ type != 2 ? '累计净值' : '七日年化' }}
            </div>
          </div>
          <div ref="lineChart" class="line-chart"></div>
        </div>
      </div>
      <div class="line"></div>
      <div v-if="type != 2" class="fund-history">
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
              <p
                :class="{
                  red: parseFloat(item.navC) >= 0,
                  green: parseFloat(item.navC) < 0,
                }"
              >
                {{ item.navC }}{{ item.navC.startsWith('--') ? '' : '%' }}
              </p>
            </li>
          </ul>
          <p ref="loadEl" class="more">
            {{ noMore ? '没有更多了' : '加载中...' }}
          </p>
        </div>
      </div>
      <div v-else class="fund-history">
        <p class="decs">历史净值数据</p>
        <div class="list-head">
          <p>收益日期</p>
          <p>万份收益</p>
          <p>七日年化</p>
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
              <p>{{ item.incomeU }}</p>
              <p
                :class="{
                  red: parseFloat(item.incomeR) >= 0,
                  green: parseFloat(item.incomeR) < 0,
                }"
              >
                {{ item.incomeR }}{{ item.incomeR.startsWith('--') ? '' : '%' }}
              </p>
            </li>
          </ul>
          <p ref="loadEl" class="more">
            {{ noMore ? '没有更多了' : '加载中...' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDetailPublic, queryNavListPublic } from '@/api'
export default {
  data() {
    return {
      code: '', // 基金代码
      name: '', // 基金名称
      type: '', // 基金类型 0-股票型 2-货币型 A-混合型 E-债券型
      typeName: '',
      typeOption: {
        0: '股票型',
        2: '货币型',
        A: '混合型',
        E: '债券型',
      },
      risk: '', // 基金风险等级 0-低风险等级 1-中低风险等级 2-中风险等级 3-中高风险等级 4-高风险等级
      riskName: '',
      riskOption: ['低风险', '中低风险', '中风险', '中高风险', '高风险'],
      navD: '', // 最新净值日期(非货币型)/收益日期(货币型)
      unitN: '', // 最新单位净值(非货币型)
      navC: '', // 最新涨跌幅(非货币型)
      incomeU: '', // 最新万份收益(货币型)
      incomeR: '', // 最新七日年化(货币型)
      chartType: 0,
      loading: false,
      listData: [],
      listDataAll: [],
    }
  },
  async fetch() {
    try {
      // const fundCode = this.$route.params.detail
      const fundCode = this.$route.query.code
      const res = await queryDetailPublic({
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
      this.navC = res.data.navC
      this.incomeU = res.data.incomeU
      this.incomeR = res.data.incomeR

      const res2 = await queryNavListPublic({
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
  fetchOnServer: false,
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
            '金海九州已与多家国内知名基金公司建立战略合作关系，代售的公募基金产品涵盖权益类、固定收益类和货币类等投资类型，满足不同风险偏好类型客户的需求。 - 金海九州',
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
    setChart() {
      if (this.listDataAll.length <= 0) return
      const xdata = this.listDataAll
        .map((item) => {
          return item.navD
        })
        .reverse()
      const ydata = this.listDataAll
        .map((item) => {
          if (this.type != 2) {
            return this.chartType == 0 ? item.totalN : item.unitN
          } else {
            return this.chartType == 0 ? item.incomeR : item.incomeU
          }
        })
        .map((item) => {
          return item == '--' ? 0 : item
        })
        .map((item) => {
          return parseFloat(item)
        })
        .reverse()

      // const xdata = [1, 2, 3, 4, 5, 6, 7]
      // const ydata = [1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01]

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
          bottom: 93,
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
              color: '#888080',
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            // align: 'right',
            padding: [5, 0, 0, 0],
          },
          data: xdata,
        },
        yAxis: [
          {
            type: 'value',
            show: true,
            min: ymin,
            max: ymax,
            interval: minInterval,
            minInterval,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#888080',
              },
            },
            axisLabel: {
              formatter(value) {
                return (Math.round(value * 10000) / 10000).toFixed(4)
              },
            },
          },
          {
            type: 'value',
            show: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#888080',
              },
            },
          },
        ],
        series: [
          {
            data: ydata,
            type: 'line',
            symbol: 'none',
            // smooth: true,
            emphasis: {
              scale: false,
              lineStyle: {
                width: 2,
                color: '#D50200',
              },
            },
            itemStyle: {
              color: '#D50200',
            },
            lineStyle: {
              width: 2,
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
                    color: 'rgba(213, 2, 0, 0.7)', // 0% 处的颜色
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
    goBack() {
      this.$router.push('/public-fund')
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
  },
}
</script>

<style lang="scss" scoped>
.public-fund-detail {
  .container {
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
    .fund-detail-container {
      margin: 40px auto 0;
      padding: 40px 0 30px 40px;
      width: 1200px;
      height: 431px;
      background: #ffffff;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .fund-name {
        margin: 0;
        font-size: 24px;
        // font-weight: bold;
        width: 500px;
        white-space: nowrap;

        .fund-code {
          color: #b0b0b0;
        }
      }
      .fund-tag {
        display: inline-block;
        margin-right: 10px;
        padding: 0 10px;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        text-align: center;
        background: #e5d3b8;
        border-radius: 2px;
        border: 1px solid #e5d3b8;
        color: #392424;
      }
      .fund-tag-container {
        height: 30px;
        margin-top: 10px;
      }
      .fund-tag-green {
        border: 1px solid #008002;
        color: #008002;
        background: rgba(0, 128, 2, 0.08);
      }

      .fund-price-panel {
        margin-top: 25px;
        width: 500px;
        height: 245px;
        background: #fcf9f5;

        display: flex;
        align-items: center;

        .item-panel {
          width: 250px;
          height: 200px;
          display: flex;
          justify-content: center;
          // align-items: center;
          flex-direction: column;
        }
        .line-y {
          width: 0px;
          height: 125px;
          border-left: 1px dotted #efefef;
        }
        .value {
          margin: 0;
          // font-size: 18px;
          font-size: 32px;
          color: $font-color;
          margin-left: 70px;
          height: 36px;
          box-sizing: border-box;
        }
        .red {
          color: #d50200;
          font-size: 32px;
        }
        .green {
          color: #008002;
          font-size: 32px;
        }
        .name {
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          margin-left: 70px;
          margin-top: 7px;
        }
      }

      .fund-chart {
        &-types {
          margin-top: 45px;
          padding-right: 40px;
          &::after {
            display: table;
            clear: both;
            content: '';
          }
          .type-item {
            float: right;
            // width: 88px;
            height: 23px;
            line-height: 23px;
            padding: 0 10px;
            // padding-left: 20px;
            font-size: 12px;
            color: #b0b0b0;
            border: 1px solid #b0b0b0;
            cursor: pointer;
          }
          .type-item-active {
            color: #ffffff;
            border: 1px solid $theme-color;
            background: $theme-color;
          }
        }
        .line-chart {
          width: 580px;
          height: 340px;
        }
      }
    }
    .line {
      height: 1px;
      width: 1122px;
      background: #e7e8eb;
      margin: 0 auto;
    }
    .fund-history {
      background: #ffffff;
      padding: 40px;
      margin-bottom: 58px;
      .decs {
        height: 25px;
        font-size: 18px;
        color: #392424;
        line-height: 25px;
        margin: 0 0 16px;
      }
      .list-head {
        height: 50px;
        background: #fcf9f5;
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
        .more {
          color: #666666;
          margin-bottom: 0;
          padding-top: 20px;
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
