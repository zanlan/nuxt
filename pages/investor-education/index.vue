<template>
  <div class="investor-education">
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
      <div class="content">
        <img
          class="title-img"
          src="@/assets/images/title-investor-education.png"
          alt="投资者教育"
        />
        <ul class="lists">
          <li
            v-for="(item, index) in investorEducations"
            :key="index"
            class="list-item"
            @click="clickListItem(item)"
          >
            <p class="item-name">
              <span class="dot"></span>
              <img
                v-if="item.new"
                src="@/assets/images/new.png"
                alt=""
                width="32"
                height="17"
              />
              {{ item.name }}
            </p>
            <!-- <p class="item-time">{{ item.time }}</p> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { investorEducations } from '@/config/index.js'
import { openWindow } from '@/utils'
export default {
  data() {
    return {
      investorEducations,
    }
  },
  head() {
    return {
      title: '投资者教育 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,投资者教育,财富',
        },
        {
          hid: 'description',
          name: 'description',
          content: '投资者教育 - 金海九州',
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
.investor-education {
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
    padding: 40px;
    background-color: #ffffff;
    margin-bottom: 40px;
    box-sizing: border-box;
    min-height: calc(100vh - 398px);

    .title-img {
      display: block;
      width: 120px;
      height: 24px;
      margin-bottom: 20px;
    }

    .lists {
      // list-style: disc;
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
          img {
            display: inline-block;
            vertical-align: top;
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
}
</style>
