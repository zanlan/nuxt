<template>
  <div class="public-fund">
    <div class="container">
      <div class="breadcrumb">
        <p>
          当前位置：
          <span
            style="color: #b0b0b0; cursor: pointer"
            @click="$router.push('/')"
            >首页
          </span>
          > 公募基金 >
          <span>{{ fundTypes[fundTypeIndex] }}</span>
        </p>
      </div>
      <div class="content">
        <div class="title-container">
          <img
            class="title-img"
            src="@/assets/images/title-public-fund.png"
            alt="公募基金"
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
        <div class="fund-type">
          <!-- <ul class="nav">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/public-fund">股票型</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/public-fund/mixin">
                混合型
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/public-fund/bond">
                债券型
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/public-fund/currency">
                货币型
              </nuxt-link>
            </li>
          </ul> -->
          <ul class="nav">
            <li
              v-for="(fund, index) in fundTypes"
              :key="index"
              class="nav-item"
              @click="onClickFundType(index)"
            >
              <span
                class="nav-link"
                :class="{ 'nuxt-link-exact-active': fundTypeIndex == index }"
              >
                {{ fund }}
              </span>
            </li>
          </ul>
        </div>
        <div class="fund-list">
          <div v-for="(fund, index) in funds" :key="index" class="fund-item">
            <p class="item-col fund-name">
              <span class="small fund-code">{{ fund.code }}</span>
              <span class="name">{{ fund.name }}</span>
            </p>
            <div class="line-y"></div>
            <p v-if="fund.type != 2" class="item-col fund-unitN">
              <span class="small">最新单位净值&nbsp;&nbsp;</span>
              <span class="value">{{ fund.unitN }}</span>
            </p>
            <p v-else class="item-col fund-incomeU">
              <span class="small">万份收益&nbsp;&nbsp;</span>
              <span class="value">{{ fund.incomeU }}</span>
            </p>
            <div class="line-y margin-left-40px"></div>
            <p v-if="fund.type != 2" class="item-col">
              <span class="small">日增长率</span>
              <span class="rate-time">({{ fund.navD }})</span>
              <span
                class="value red"
                :class="{ green: parseFloat(fund.navC) < 0 }"
                >{{ fund.navC
                }}{{
                  fund.navC.startsWith('*') || fund.navC.startsWith('--')
                    ? ''
                    : '%'
                }}</span
              >
            </p>
            <p v-else class="item-col">
              <span class="small">七日年化</span>
              <span class="rate-time">({{ fund.navD }})</span>
              <span
                class="value red"
                :class="{ green: parseFloat(fund.incomeR) < 0 }"
                >{{ fund.incomeR
                }}{{
                  fund.incomeR.startsWith('*') || fund.incomeR.startsWith('--')
                    ? ''
                    : '%'
                }}</span
              >
            </p>
            <!-- <nuxt-link
              class="fund-detail-link"
              :to="`/public-fund/${fund.code}`"
            > -->
            <nuxt-link
              class="fund-detail-link"
              :to="`/public-fund/detail?code=${fund.code}`"
            >
              <div class="fund-detail">详情></div>
            </nuxt-link>
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
  </div>
</template>

<script>
import { queryListPublic } from '@/api'
export default {
  name: 'PublicFund',
  data() {
    return {
      fundTypeIndex: 0,
      fundTypes: ['全部', '股票型', '混合型', '债券型', '货币型'],
      // 基金类型 0-股票型 2-货币型 A-混合型 E-债券型
      fundTypesValue: ['', '0', 'A', 'E', '2'],
      funds: [],

      fundType: '',
      fundCode: '',
      page: 1,
      pageCount: 10,
      total: 0,
      totalPage: 0,

      lastFundCode: '', // 上次的查询条件

      noFund: '查询产品信息中...',
    }
  },
  async fetch() {
    try {
      const res = await queryListPublic({
        fundType: this.fundTypesValue[this.fundTypeIndex],
        fundCode: this.fundCode,
        page: this.page,
        pageCount: this.pageCount,
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
      title: '公募基金 - 金海九州',
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
            '金海九州已与多家国内知名基金公司建立战略合作关系，代销的公募基金产品涵盖权益类、固定收益类和货币类等投资类型，满足不同风险偏好类型客户的需求。 - 金海九州',
        },
      ],
    }
  },
  activated() {
    this.$fetch()
  },
  methods: {
    onClickFundType(index) {
      this.fundTypeIndex = index
      this.page = 1
      this.$fetch()
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
.public-fund {
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
      height: 60px;
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
          line-height: 60px;
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
      padding: 0 30px;
      height: 80px;
      border: 1px solid #e7e8eb;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      position: relative;

      .item-col {
        white-space: nowrap;
        flex-shrink: 0;
        span {
          display: inline-block;
        }
        .small {
          font-size: 14px;
          // font-weight: 400;
          color: #666666;
          white-space: nowrap;
          // height: 20px;
          // line-height: 20px;
        }
        .name {
          display: inline-block;
          width: 240px;
          // height: 25px;
          font-size: 16px;
          font-weight: 500;
          color: $font-color;
          // line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: bottom;
        }
        .rate-time {
          color: #b0b0b0;
        }

        .value {
          // width: 74px;
          font-size: 28px;
          // font-weight: bold;
          color: $font-color;
          // vertical-align: bottom;
        }
        .red {
          color: #d50200;
        }
        .green {
          color: #008002;
        }
      }

      .line-y {
        width: 1px;
        height: 50px;
        background-color: #e7e8eb;
        margin: 0 40px 0 30px;
      }

      .fund-detail-link {
        position: absolute;
        right: 30px;
        top: 22px;
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
      .fund-code {
        font-size: 16px !important;
        width: 60px;
        white-space: nowrap;
      }
      .fund-name {
        margin-top: 25px;
      }
      .fund-unitN {
        width: 185px;
      }
      .fund-incomeU {
        width: 185px;
      }
      .margin-left-40px {
        margin-left: 40px;
      }
    }
    .fund-pagination {
      margin: 60px auto 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
<style lang="scss">
.public-fund {
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
