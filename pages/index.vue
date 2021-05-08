<template>
  <div class="home">
    <div class="home-banner-container">
      <div class="home-banner"></div>
      <div class="container">
        <img
          class="desc"
          src="@/assets/images/home-banner-desc.png"
          alt="金海九州官网"
        />
      </div>
    </div>

    <div class="home-introduction">
      <div class="container">
        <div class="left">
          <div class="left-container">
            <div class="title">
              <img
                class="title-img"
                src="@/assets/images/title-introduction@2x.png"
                alt="introduction"
              />
              <nuxt-link to="/about-us">
                <svg-icon type="goto-more" class="more" />
              </nuxt-link>
            </div>
            <p class="company">深圳市金海九州基金销售有限公司</p>
            <p class="desc">
              成立于2014年7月，经中国证券监督管理委员会批准从事基金销售业务。金海九州秉承“诚信立业，客户为本，专业共赢”的理念，以专业的投研团队为核心，以完善的风控体系为依托，以优秀的投资顾问为支撑，为客户提供专业、全面、便捷的金融服务。
            </p>
          </div>
        </div>
        <div class="right"></div>
        <img class="top" src="@/assets/images/home-bg-3.jpg" alt="" />
      </div>
    </div>
    <div class="home-main-business">
      <div class="container">
        <img
          class="title-business"
          src="@/assets/images/title-business@2x.png"
          alt="business"
        />
        <div class="funds">
          <div class="fund-item public">
            <nuxt-link to="/public-fund">
              <div class="btn">查看更多></div>
            </nuxt-link>

            <div class="fund-title">公募基金销售</div>
            <div class="fund-desc">
              金海九州已与多家国内知名基金公司建立战略合作关系，代销的公募基金产品涵盖权益类、固定收益类和货币类等投资类型，满足不同风险偏好类型客户的需求。
            </div>
            <nuxt-link to="/public-fund">
              <svg-icon type="goto-more" class="more fund-more" />
            </nuxt-link>
          </div>
          <div class="fund-item private">
            <nuxt-link to="/private-fund">
              <div class="btn btn-private">查看更多></div>
            </nuxt-link>

            <div class="fund-title">私募基金销售</div>
            <div class="fund-desc">
              金海九州持续丰富金融产品体系，已代销多种类型私募基金产品，凭借公司专业且富有竞争力的产品研究团队，为高净值客户提供多元化的投资组合方案，满足其多样化的资产配置需求。
            </div>
            <nuxt-link to="/private-fund">
              <svg-icon type="goto-more" class="more fund-more" />
            </nuxt-link>
          </div>
        </div>

        <div class="legal-announcement">
          <div class="legal-announcement-item">
            <img
              class="title-legal"
              src="@/assets/images/title-legal@2x.png"
              alt="legal"
            />
            <div
              v-for="(item, index) in laws"
              :key="index"
              class="article"
              @click="clickListItem(item)"
            >
              <p class="title">
                <img
                  v-if="item.new"
                  src="@/assets/images/new.png"
                  alt=""
                  width="32"
                  height="17"
                />
                {{ item.name }}
              </p>
              <p class="time">{{ item.time }}</p>
            </div>
            <nuxt-link to="/law">
              <svg-icon type="goto-more" class="more more-btn" />
            </nuxt-link>
          </div>
          <div class="legal-announcement-item">
            <img
              class="title-announcement"
              src="@/assets/images/title-announcement@2x.png"
              alt="announcement"
            />
            <img
              class="announcement-img"
              src="@/assets/images/home-announcement.jpg"
              alt="announcement"
            />
            <div
              v-for="(item, index) in announcements"
              :key="index"
              class="article"
              @click="clickListItem(item)"
            >
              <p class="title">
                <img
                  v-if="item.new"
                  src="@/assets/images/new.png"
                  alt=""
                  width="32"
                  height="17"
                />
                {{ item.name }}
              </p>
              <p class="time">{{ item.time }}</p>
            </div>
            <nuxt-link to="/company-announcement">
              <svg-icon type="goto-more" class="more more-btn" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="home-cooperators">
      <img
        class="title-cooperators"
        src="@/assets/images/title-cooperators@2x.png"
        alt="cooperators"
      />
      <div class="container">
        <el-carousel
          class="cooperators-container"
          indicator-position="none"
          arrow="never"
          height="88px"
          :interval="2000"
        >
          <el-carousel-item v-for="i in 3" :key="i">
            <div>
              <img
                v-for="(item, index) in cooperators[i - 1]"
                :key="item.name + index"
                class="cooperator-img"
                :src="item.img"
                :alt="item.name"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="home-certificate">
      <div class="container">
        <img src="@/assets/images/home-certificate-bg2.jpg" alt="" />
        <nuxt-link to="/sales-qualification" target="_blank">
          <div class="sales-qualification"></div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import { homeLaws, companyAnnouncements } from '@/config/index.js'
import { openWindow } from '@/utils'
export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      laws: homeLaws,
      announcements: companyAnnouncements.slice(0, 3),
      cooperators: [
        [
          {
            name: '广发基金',
            img: require('@/assets/images/cooperators/guangfa.png'),
          },
          {
            name: '华夏基金',
            img: require('@/assets/images/cooperators/huaxia.png'),
          },
          {
            name: '博时基金',
            img: require('@/assets/images/cooperators/boshi.png'),
          },
          {
            name: '富国基金',
            img: require('@/assets/images/cooperators/fuguo.png'),
          },
          {
            name: '易方达',
            img: require('@/assets/images/cooperators/yifangda.png'),
          },
        ],
        [
          {
            name: '融通基金',
            img: require('@/assets/images/cooperators/rongtong.png'),
          },
          {
            name: '银华基金',
            img: require('@/assets/images/cooperators/yinhua.png'),
          },
          {
            name: '鹏扬基金',
            img: require('@/assets/images/cooperators/pengyang.png'),
          },
          {
            name: '前海开源基金',
            img: require('@/assets/images/cooperators/qianhai.png'),
          },
          {
            name: '光大保德信基金',
            img: require('@/assets/images/cooperators/guangda.png'),
          },
        ],
        [
          {
            name: '泰达宏利基金',
            img: require('@/assets/images/cooperators/taida.png'),
          },
          {
            name: '华宝基金',
            img: require('@/assets/images/cooperators/huabao.png'),
          },
          {
            name: '平安基金',
            img: require('@/assets/images/cooperators/pingan.png'),
          },
          {
            name: '东吴基金',
            img: require('@/assets/images/cooperators/dongwu.png'),
          },
          {
            name: '长信基金',
            img: require('@/assets/images/cooperators/changxin.png'),
          },
        ],
      ],
    }
  },
  head() {
    return {
      title: '金海九州',
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
  methods: {
    clickListItem(item) {
      openWindow(item.url)
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  background: #ffffff;
  .home-banner-container {
    width: 100%;
    height: 430px;
    overflow: hidden;
    position: relative;
    .home-banner {
      width: 100%;
      height: 500px;
      background: url(~assets/images/home-bg-01.jpg) bottom no-repeat;
      background-size: cover;
    }
    .desc {
      position: absolute;
      top: 50%;
      margin-top: -95px;
      width: 699px;
      height: 178px;
    }
  }

  .home-certificate {
    // width: 100%;
    height: 143px;
    background: #fff;
    // background: url(~assets/images/home-certificate-bg.jpg) bottom no-repeat;
    // background-size: cover;
    .container {
      position: relative;
      height: 143px;
      img {
        // display: block;
        // position: absolute;
        // left: 50%;
        width: 1200px;
        height: 143px;
        // margin-left: -600px;
      }
      .sales-qualification {
        position: absolute;
        top: 0;
        left: 0;
        width: 250px;
        height: 143px;
        cursor: pointer;
      }
    }
  }
  .home-introduction {
    overflow: hidden;
    height: 622px;
    .container {
      display: flex;
      position: relative;
      height: 100%;
      .left {
        flex-shrink: 0;
        width: 680px;
        .left-container {
          width: 537px;
          height: 100%;
          .title {
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            position: relative;
            margin-top: 60px;
            .title-img {
              width: 205px;
              height: 42px;
            }
            .more {
              cursor: pointer;
              width: 81px;
              height: 14px;
              position: absolute;
              right: 0;
              top: 14px;
              transition: all 0.2s linear;
            }
            .more:hover {
              right: -10px;
              color: $theme-color;
            }
          }
          .company {
            // width: 318px;
            height: 50px;
            font-size: 20px;
            font-weight: 400;
            line-height: 50px;
            letter-spacing: 1px;
            margin: 25px 0 5px;
          }
          .desc {
            margin-top: 0px;
            font-size: 16px;
            font-weight: 400;
            color: #666666;
            line-height: 30px;
            text-align: justify;
            word-break: break-all;
          }
        }
      }
      .right {
        flex-shrink: 0;
        // width: 881px;
        width: 50vw;
        height: 100%;
        background: url(~assets/images/home-bg-2.jpg) top no-repeat;
        background-size: cover;
      }
      .top {
        position: absolute;
        width: 1198px;
        height: 230px;
        left: 0;
        bottom: 0;
        border-right: 2px solid #fff;
        border-top: 2px solid #fff;
      }
    }
  }
  .home-main-business {
    overflow: hidden;
    width: 100%;
    height: 1207px;
    // padding-top: 369px;
    background: url(~assets/images/home-bg-4.jpg) bottom no-repeat;
    background-size: 100% 838px;

    .title-business {
      width: 214px;
      height: 42px;
      margin: 60px auto 36px;
      display: block;
    }
    .funds {
      display: flex;
      justify-content: space-between;
      .public {
        background: url(~assets/images/home-public-fund.jpg) no-repeat;
        background-size: 590px 380px;
      }
      .private {
        background: url(~assets/images/home-private-fund.jpg) no-repeat;
        background-size: 590px 380px;
      }
      .fund-item {
        width: 590px;
        height: 380px;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
        position: relative;

        .btn {
          width: 149px;
          height: 36px;
          line-height: 36px;
          color: $theme-color;
          background: #ffffff;
          text-align: center;
          border-radius: 2px;
          position: absolute;
          left: 40px;
          bottom: 45px;
          cursor: pointer;
        }
        .btn:hover {
          color: #392424;
          background: #e3d1b6;
        }
        .btn-private {
          color: #e5d3b8;
          background: #392424;
        }
        .btn-private:hover {
          color: #ffffff;
          background: #533939;
        }
        .fund-title {
          font-size: 20px;
          font-weight: 400;
          color: #000000;
          position: absolute;
          left: 271px;
          top: 65px;
        }
        .fund-desc {
          width: 278px;
          line-height: 30px;
          font-size: 16px;
          font-weight: 400;
          color: #666666;
          text-align: justify;
          word-break: break-all;
          position: absolute;
          left: 271px;
          top: 110px;
        }
        .fund-more {
          position: absolute;
          right: 45px;
          bottom: 50px;
          transition: all 0.2s linear;
        }
        .fund-more:hover {
          right: 35px;
          color: $theme-color;
        }
      }
    }

    .legal-announcement {
      margin-top: 80px;
      width: 1200px;
      height: 474px;
      background: #ffffff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      padding: 45px 42px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .legal-announcement-item {
        position: relative;
        width: 536px;
        .title-legal {
          width: 212px;
          height: 42px;
          margin-bottom: 23px;
        }
        .title-announcement {
          width: 388px;
          height: 42px;
        }
        .article:hover {
          .title,
          .time {
            color: $theme-color;
          }
          .title {
            padding-left: 10px;
          }
        }
        .article {
          width: 100%;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          p {
            margin: 21px 0 0;
            line-height: 22px;
          }
          .title {
            width: 401px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: all 0.2s linear;
            img {
              display: inline-block;
              vertical-align: top;
              margin-top: 1px;
            }
          }
          .time {
            color: #b0b0b0;
          }
        }
        .more-btn {
          position: absolute;
          right: 0;
          top: 26px;
          transition: all 0.2s linear;
        }
        .more-btn:hover {
          right: -10px;
          color: $theme-color;
        }
        .announcement-img {
          width: 536px;
          height: 160px;
          margin-top: 32px;
        }
      }
    }
  }

  .home-cooperators {
    width: 100%;
    height: 317px;
    background: #f7f7f7;

    .cooperators-container {
      font-size: 0;
      width: 1200px;
    }

    .title-cooperators {
      width: 194px;
      height: 42px;
      margin: 0 auto;
      padding: 60px 0 40px;
      display: block;
    }
    .cooperator-img {
      width: 234px;
      height: 87px;
      margin-right: 7px;
      // border: 1px solid #e7e8eb;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
    .cooperator-img-2 {
      width: 259px;
      height: 87px;
      // border: 1px solid #e7e8eb;
    }
  }
  .more {
    cursor: pointer;
    width: 81px;
    height: 14px;
  }
}
</style>
