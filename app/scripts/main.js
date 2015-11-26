/* global $ */

var dayNames = [
  'Sonntag', // 0
  'Montag', // 1
  'Dienstag', // 2
  'Mittwoch', // 3
  'Donnerstag', // 4
  'Freitag', // 5
  'Samstag' // 6
]

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

  var isWeekday = function (dayNumber) {
    return dayNumber > 0 && dayNumber < 6
  }

  var isNoon = function () {
    var now = new Date()
    var threshold = new Date()
    threshold.setHours(16)
    return now < threshold
  }

  var setRandomImage = function ($el) {
    var random = Math.round((Math.random() * 2))
    $el.attr('src', '/images/platzhalter-ab15-' + random + '.jpg')
  }

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
    var dayToday = created.getDay()
    var text = lastPost.caption.text.replace(/(#[a-z0-9][a-z0-9\-_]*)/ig, '')
    var lines = text.trim().split('\n')

    // created = new Date(today.setDate(28))

    $('[data-hook=menu-weekday]').text(dayNames[dayToday])

    var title = $('[data-hook=menu-subtitle]').text()

    if (created > today && isWeekday(dayToday) && isNoon()) {
      if (lines.length >= 3 && lines[1].trim() === '') {
        $('[data-hook=menu-title]').text(lines[0])
      } else {
        $('[data-hook=menu-title]').text(title)
        $('[data-hook=menu-subtitle]').hide()
      }
      $('[data-hook=instagram-caption]').text(text)
      $('[data-hook=instagram-image]').attr('src', lastPost.images.standard_resolution.url)
    } else if (!isNoon() || !isWeekday(dayToday)) {
      $('[data-hook=menu-title]').text('Mittagsmenü unter der Woche')
      $('[data-hook=menu-notavailable-text]').text('Von Montag bis Freitag publizieren wir hier unser Mittagsmenü.')
      $('[data-hook=menu-subtitle]').hide()
      setRandomImage($('[data-hook=instagram-image]'))
    } else {
      $('[data-hook=menu-subtitle]').hide()
      setRandomImage($('[data-hook=instagram-image]'))
    }

    // console.log(lastPost, created, today, created > today)
  })
})
