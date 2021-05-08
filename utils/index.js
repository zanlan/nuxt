export function openWindow(url) {
  // // IE10及以下
  // if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
  //   window.open(url, '_blank')
  //   return
  // }
  // if (url.substr(-4) == '.pdf') {
  //   url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(url)
  // }
  window.open(url, '_blank')
}
