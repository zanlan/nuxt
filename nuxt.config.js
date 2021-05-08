import path from 'path'
// console.dir(process.env)
// nuxt 2.14.12

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '金海九州',
    htmlAttrs: {
      lang: 'zh',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  target: process.env.NUXT_ENV_STATIC ? 'static' : 'server',
  generate: {
    dir: 'jhjzfund-web-website-pc',
    // exclude: [
    //   '/user/risk-assessment',
    //   '/user/modify-password',
    //   '/private-fund/detail',
    // ],
    fallback: '404.html',
  },

  env: {
    buildTime: new Date().toLocaleString('zh-CN', {
      hour12: false,
    }),
  },

  loading: false,
  // loading: {
  //   color: '#d50200',
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css', '@/assets/style/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/svg-icon',
    '@/plugins/element-ui',
    '@/plugins/route',
    '@/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
  ],

  styleResources: {
    scss: [
      '@/assets/style/variables.scss', // 全局 scss 变量
      // './assets/style/mixins.scss' // 全局 scss 混合
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/static/',
    extend(config) {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'assets/icons')]
      // Includes /icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'assets/icons')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
      })
    },
    extractCSS: true,
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
    // postcss: {
    //   plugins: {
    //     'postcss-pxtorem': {
    //       rootValue: 16,
    //       propList: ['*'],
    //     },
    //   },
    // },
  },
  server: {
    port: 8081, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
}
