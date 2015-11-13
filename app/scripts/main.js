/* global $ */

window.devHelper = {
  overlayStatus: 0 // 0: hidden, 1: 0.5 opaque, 2: visible
}

window.addEventListener('keypress', function (e) {
  // key §
  if (e.keyCode === 167) {
    window.devHelper.overlayStatus = (window.devHelper.overlayStatus + 1) % 3

    if (window.devHelper.overlayStatus === 0) {
      $('#devhelper').hide()
    } else if (window.devHelper.overlayStatus === 1) {
      $('#devhelper').show().css('opacity', 0.5)
    } else if (window.devHelper.overlayStatus === 2) {
      $('#devhelper').show().css('opacity', 1)
    }
  }
})

$(function () {
  var url = 'https://api.instagram.com/v1/users/2001288107/media/recent/'

  $.ajax({
    url: url,
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      count: 1,
      client_id: 'f01913ec540e40e886efbe403304ffe5'
    }
  }).then(function (response) {
    var lastPost = response.data[0]
    var created = new Date(parseInt(lastPost.created_time, 10) * 1000)
    var today = new Date((new Date()).setHours(0, 0, 0, 0))

    $('[data-hook=instagram-caption]').text(lastPost.caption.text)
    $('[data-hook=instagram-image-link]').attr('href', lastPost.link)
    $('[data-hook=instagram-image]').attr('src', lastPost.images.standard_resolution.url)
    $('[data-hook=menu-title]').text($('[data-hook=menu-title]').data('alt'))

    console.log(lastPost, created, today, created > today)
  })
})
