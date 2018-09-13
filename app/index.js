/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss'

// Lazy-load images below the fold
import LazyLoad from 'vanilla-lazyload'
var lazyLoaded = new LazyLoad({ // eslint-disable-line
  elements_selector: '.lazy'
})

// Update URL & restore link location if relevant
import 'urlUpdater'
if (window.location.hash) {
  var el = document.querySelector('a[name="' + window.location.hash + '"]')
  if (el) {
    el.scrollIntoView()
  }
}

// import 'baseMap'
import 'iceObservations'
