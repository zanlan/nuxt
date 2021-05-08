<template>
  <div ref="main" class="main" @resize="resetFooter">
    <TheHeader />
    <!-- <Nuxt
      keep-alive
      :keep-alive-props="{ include: ['PublicFund', 'PrivateFund'] }"
    /> -->
    <Nuxt />
    <TheFooter ref="footer" :class="{ 'main-footer': fixed }" />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      fixed: false,
    }
  },
  watch: {
    $route(newValue, oldValue) {
      if (window._czc) {
        window._czc.push([
          '_trackPageview',
          newValue.fullPath,
          oldValue.fullPath,
        ])
      }
    },
  },
  mounted() {
    console.log('build time: ' + process.env.buildTime)
    // 友盟统计添加
    const script = document.createElement('script')
    script.src =
      'https://s4.cnzz.com/z_stat.php?id=1279879362&web_id=1279879362'
    script.language = 'JavaScript'
    script.type = 'text/javascript'
    document.body.appendChild(script)

    // console.dir(this.$refs)
    this.erd = elementResizeDetectorMaker()
    this.erd.listenTo(this.$refs.main, this.resetFooter)
  },
  beforeDestroy() {
    this.erd.removeListener(this.$refs.main, this.resetFooter)
  },
  methods: {
    resetFooter() {
      // console.log('--reset--')
      // console.dir(this.$refs.main)
      let footerHeight = 0
      if (this.fixed) footerHeight = 212
      this.fixed =
        this.$refs.main.clientHeight + footerHeight < window.innerHeight
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  .main-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    min-width: 1200px;
  }
}
</style>
