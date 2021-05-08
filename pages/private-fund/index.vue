<template>
  <div class="private-fund">
    <div class="container">
      <div class="breadcrumb">
        <p>
          当前位置：
          <span
            style="color: #b0b0b0; cursor: pointer"
            @click="$router.push('/')"
            >首页
          </span>
          > <span>私募基金</span>
        </p>
      </div>
      <div class="content">
        <div class="title-container">
          <img
            class="title-img"
            src="@/assets/images/title-private-fund.png"
            alt="私募基金"
          />
          <input
            v-model="fundCode"
            class="search"
            type="text"
            placeholder="请输入基金代码或者基金名称"
            @keyup.enter="onClickSearch"
          />
          <div class="search-btn" @click="onClickSearch">
            <i class="el-icon-search"></i>
          </div>
        </div>
        <div class="fund-list">
          <div v-for="(fund, index) in funds" :key="index" class="fund-item">
            <div class="item-col">
              <p class="small width-60px">{{ fund.code }}</p>
              <p class="name">{{ fund.name }}</p>
            </div>
            <div class="line-y"></div>

            <div class="item-col width-220px">
              <!-- <p class="small">成立以来年化涨幅&nbsp;</p>
              <p
                class="value"
                :class="{
                  red: parseFloat(fund.annualC) >= 0,
                  green: parseFloat(fund.annualC) < 0,
                  star: fund.annualC.startsWith('*'),
                }"
              >
                {{ fund.annualC
                }}{{
                  fund.annualC.startsWith('*') || fund.annualC.startsWith('--')
                    ? ''
                    : '%'
                }}
              </p> -->
              <p class="small">业绩报酬计提基准&nbsp;</p>
              <p
                class="value"
                :class="{
                  red: parseFloat(fund.perform) >= 0,
                  star: fund.perform && fund.perform.startsWith('*'),
                }"
              >
                {{ fund.perform
                }}{{
                  !fund.perform ||
                  fund.perform.startsWith('*') ||
                  fund.perform.startsWith('--')
                    ? ''
                    : '%'
                }}
              </p>
            </div>
            <div class="line-y"></div>

            <div class="item-col width-175px">
              <p class="small">最新单位净值&nbsp;</p>
              <p
                class="value"
                :class="{
                  star: fund.unitN && fund.unitN.startsWith('*'),
                }"
              >
                {{ fund.unitN }}
              </p>
            </div>
            <div class="line-y"></div>

            <div class="item-col width-150px">
              <p class="small">起购(元)&nbsp;</p>
              <p class="value value-small">{{ fund.minInvest }} 万</p>
            </div>
            <div class="btn-container">
              <div class="fund-order" @click="appointment(fund)">预约购买</div>
              <!-- <nuxt-link
                v-if="isLogin && risk"
                :to="`/private-fund/${fund.code}`"
              > -->
              <nuxt-link
                v-if="isLogin && risk"
                :to="`/private-fund/detail?code=${fund.code}`"
              >
                <div class="fund-detail">详情></div>
              </nuxt-link>
              <nuxt-link v-if="isLogin && !risk" to="/user/risk-assessment">
                <div class="fund-detail">测评后可见</div>
              </nuxt-link>
              <nuxt-link
                v-if="!isLogin"
                to="/user/login?redirect=/private-fund"
              >
                <div class="fund-detail">登录后可见</div>
              </nuxt-link>
            </div>
          </div>
          <div v-if="total == 0" class="no-fund">
            <img
              src="@/assets/images/zanwuxinxi-3@2x.png"
              alt="暂无产品信息，敬请期待~"
            />
            <p>{{ noFund }}</p>
          </div>
          <div v-show="total != 0" class="fund-pagination">
            <el-pagination
              background
              layout="prev, pager, next, jumper"
              :total="total"
              :page-size="pageCount"
              :current-page="page"
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <Appointment
      v-if="showAppointment"
      :reserve-fund-code="appointmentFund.code"
      :reserve-fund-name="appointmentFund.name"
      @close="closeAppointment"
    />
  </div>
</template>

<script>
import Appointment from '@/components/private-fund/Appointment'
import { queryListPrivate } from '@/api'
export default {
  name: 'PrivateFund',
  components: {
    Appointment,
  },
  data() {
    return {
      fundCode: '',
      page: 1,
      pageCount: 10,
      total: 0,
      totalPage: 0,
      showAppointment: false,
      appointmentFund: {},
      funds: [],

      lastFundCode: '', // 上次的查询条件

      noFund: '查询产品信息中...',
    }
  },
  async fetch() {
    try {
      const res = await queryListPrivate({
        fundCode: this.fundCode,
        page: this.page,
        pageCount: this.pageCount,
        riskFlag: this.isLogin && this.risk,
      })
      this.lastFundCode = this.fundCode
      this.total = res.data.total
      this.totalPage = res.data.totalPage
      this.funds = res.data.data
      this.noFund = '暂无产品信息，敬请期待~'
    } catch (error) {}
  },
  fetchOnServer: false,
  head() {
    return {
      title: '私募基金 - 金海九州',
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
            '金海九州持续丰富金融产品体系，已代销多种类型私募基金产品，凭借公司专业且富有竞争力的产品研究团队，为高净值客户提供多元化的投资组合方案，满足其多样化的资产配置需求。 - 金海九州',
        },
      ],
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.phone
    },
    risk() {
      return this.$store.state.riskTypeCode >= 0
    },
  },
  activated() {
    this.$fetch()
  },
  methods: {
    appointment(fund) {
      this.appointmentFund = fund
      this.showAppointment = true
    },
    closeAppointment() {
      this.showAppointment = false
    },
    onClickSearch() {
      this.page = 1
      this.$fetch()
    },
    currentChange(current) {
      this.page = current
      if (this.lastFundCode != this.fundCode) {
        this.page = 1
      }
      this.$fetch()
    },
  },
}
</script>

<style lang="scss" scoped>
.private-fund {
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

  .content {
    padding: 30px;
    background-color: #ffffff;
    margin-bottom: 40px;
    box-sizing: border-box;
    min-height: calc(100vh - 398px);

    .title-container {
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      position: relative;
      height: 46px;
      overflow: hidden;

      .title-img {
        display: block;
        margin: 10px 0 0 10px;
        width: 96px;
        height: 24px;
      }
      .search {
        display: block;
        width: 390px;
        height: 46px;
        border-radius: 3px;
        border: 2px solid $font-color;
        outline: none;
        box-sizing: border-box;
        text-indent: 16px;
        position: absolute;
        right: 64px;
        top: 0;
      }
      .search-btn {
        width: 66px;
        height: 46px;
        background: $font-color;
        border-radius: 2px;
        color: #ffffff;
        text-align: center;
        line-height: 46px;
        font-size: 21px;
        cursor: pointer;

        position: absolute;
        right: 0;
        top: 0;
      }
      .search-btn:hover {
        background: #533939;
      }
    }
    .fund-type {
      height: 80px;
      background: #ffffff;
      box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.15);
      border-radius: 2px;
      margin-top: 20px;

      .nav {
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 20px;

        &-item {
          padding: 0 10px;
          margin: 0 10px;
          position: relative;
          height: 100%;
        }

        &-link {
          display: block;
          height: 100%;
          line-height: 80px;
          font-weight: 500;
          cursor: pointer;
        }
        &-link:hover:after,
        .nuxt-link-exact-active:after {
          content: '';
          width: 100%;
          height: 3px;
          background-color: $theme-color;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        &-link:hover,
        .nuxt-link-exact-active {
          color: $theme-color;
        }
      }
    }
  }

  .fund-list {
    .no-fund {
      text-align: center;
      margin-top: 60px;
      img {
        width: 64px;
        height: 59px;
      }
      p {
        margin-top: 30px;
        color: #b0b0b0;
        font-size: 14px;
      }
    }
    .fund-item {
      margin-top: 10px;
      padding: 0 18px;
      height: 80px;
      border: 1px solid #e7e8eb;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      position: relative;

      p {
        margin: 0;
        height: 40px;
        line-height: 40px;
      }

      .item-col {
        white-space: nowrap;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        position: relative;

        .small {
          font-size: 14px;
          color: #666666;
          white-space: nowrap;
        }
        .name {
          width: 200px;
          font-size: 14px;
          color: $font-color;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .rate-time {
          color: #b0b0b0;
        }

        .value {
          font-size: 28px;
          color: $font-color;
          padding-bottom: 8px;
        }
        .value-small {
          font-size: 14px;
          padding-bottom: 0;
        }
        .red {
          color: #d50200;
        }
        .green {
          color: #008002;
        }
        .star {
          padding-bottom: 0;
          padding-top: 10px;
        }
      }

      .line-y {
        width: 1px;
        height: 54px;
        background-color: #e7e8eb;
        margin: 0 18px;
      }

      .btn-container {
        display: flex;
        align-items: center;
        position: absolute;
        right: 20px;
        top: 22px;
      }

      .fund-detail-link {
        position: absolute;
        right: 30px;
      }
      .fund-detail {
        width: 100px;
        height: 36px;
        background: #d50200;
        border-radius: 2px;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
      .fund-detail:hover {
        background: #e60300;
      }
      .fund-order {
        // margin-top: 9px;
        height: 36px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 2px;
        line-height: 36px;
        text-align: center;
        color: #d50200;
        box-sizing: border-box;
        border: 1px solid #d50200;
        padding: 0 10px;
        cursor: pointer;
        margin-right: 20px;
        // float: right;
      }
      .fund-order:hover {
        color: #ffffff;
        background: #d50200;
      }
      .width-220px {
        width: 220px !important;
      }
      .width-175px {
        width: 175px !important;
      }
      .width-150px {
        width: 150px !important;
      }
      .width-60px {
        width: 60px !important;
      }
    }
    // .fund-item {
    //   margin-top: 10px;
    //   padding: 13px 30px;
    //   height: 80px;
    //   // line-height: 110px;
    //   border: 1px solid #e7e8eb;
    //   box-sizing: border-box;

    //   position: relative;
    //   // display: flex;
    //   // align-items: center;

    //   p {
    //     margin: 0;
    //   }

    //   .fund-title {
    //     width: 150px;
    //     height: 54px;
    //     font-size: 18px;
    //     font-weight: 500;
    //     color: $font-color;
    //     line-height: 54px;
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     white-space: nowrap;
    //     float: left;
    //     // position: absolute;
    //     // top: 50%;
    //     // transform: translateY(-50%);
    //   }
    //   .line-y {
    //     width: 1px;
    //     height: 54px;
    //     background-color: #e7e8eb;
    //     margin: 0 28px;
    //     float: left;
    //   }
    //   .fund-key {
    //     float: left;
    //     // width: 180px;
    //     font-size: 14px;
    //     font-weight: 400;
    //     color: #666666;
    //     white-space: nowrap;
    //     height: 54px;
    //     line-height: 54px;

    //     .fund-rate-time {
    //       color: #b0b0b0;
    //     }

    //     .fund-value {
    //       // width: 74px;
    //       font-size: 28px;
    //       font-weight: bold;
    //       color: #d50200;
    //       display: inline-block;
    //       height: 54px;
    //       line-height: 54px;
    //     }
    //     .star {
    //       position: absolute;
    //       top: 18px;
    //       margin-left: 10px;
    //     }
    //     .fund-green {
    //       color: #008002;
    //     }
    //   }
    //   .fund-detail {
    //     margin-top: 9px;
    //     width: 100px;
    //     height: 36px;
    //     background: #d50200;
    //     border-radius: 2px;
    //     line-height: 36px;
    //     text-align: center;
    //     color: #ffffff;
    //     cursor: pointer;
    //     float: right;
    //   }
    //   .fund-detail:hover {
    //     background: #e60300;
    //   }
    //   .fund-order {
    //     margin-top: 9px;
    //     height: 36px;
    //     box-sizing: border-box;
    //     background: #fff;
    //     border-radius: 2px;
    //     line-height: 36px;
    //     text-align: center;
    //     color: #d50200;
    //     box-sizing: border-box;
    //     border: 1px solid #d50200;
    //     padding: 0 10px;
    //     cursor: pointer;
    //     margin-right: 20px;
    //     float: right;
    //   }
    //   .fund-order:hover {
    //     color: #ffffff;
    //     background: #d50200;
    //   }
    // }
    .fund-pagination {
      margin: 60px auto 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>

<style lang="scss">
.private-fund {
  .fund-list {
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: $theme-color;
      color: #ffffff !important;
    }
    .el-pagination.is-background .btn-next:hover,
    .el-pagination.is-background .btn-prev:hover,
    .el-pagination.is-background .el-pager li:hover {
      color: $theme-color;
    }
    .el-input__inner:focus {
      border-color: $theme-color;
      outline: 0;
    }
  }
}
</style>
