import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

// Vue.use(Element, { locale })
import showToast from 'show-toast'
import {
  // Breadcrumb,
  // BreadcrumbItem,
  Carousel,
  CarouselItem,
  Pagination,
  // InfiniteScroll,
  Radio,
  RadioGroup,
  // Message,
} from 'element-ui'

Vue.use(Carousel)
Vue.use(CarouselItem)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
Vue.use(Pagination)
// Vue.use(InfiniteScroll)
Vue.use(Radio)
Vue.use(RadioGroup)

// Vue.prototype.$message = Message

Vue.prototype.$showToast = showToast
