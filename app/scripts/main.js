/* global $ */

window.devHelper = {
  overlayStatus: 0 // 0: hidden, 1: 0.5 opaque, 2: visible
}

window.addEventListener('keypress', (e) => {
  // key §
  if (e.keyCode === 167) {
    window.devHelper.overlayStatus = (window.devHelper.overlayStatus + 1) % 3

    if (window.devHelper.overlayStatus === 0) {
      $('#devhelper').hide()
    } else if (window.devHelper.overlayStatus === 1) {
      $('#devhelper').show().css('opacity', 0.5)
    } else if (window.devHelper.overlayStatus === 2){
      $('#devhelper').show().css('opacity', 1)
    }
  }
})
