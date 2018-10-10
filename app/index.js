/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss'
import 'intersection-observer'

// Lazy-load images below the fold
import LazyLoad from 'vanilla-lazyload'
var lazyLoaded = new LazyLoad({ // eslint-disable-line
  elements_selector: '.lazy'
})

// Update URL & restore link location if relevant
import 'urlUpdater'
const scrollToElement = require('scroll-to-element')
if (window.location.hash) {
  var el = document.querySelector('a[name="' + window.location.hash + '"]')
  if (el) {
    scrollToElement(el, {
      offset: -50
    })
  }
}

// Shared code
import 'baseMap'
import { setupObservationsScroller } from 'observations'

// Set up photo observation scrollers
setupObservationsScroller('.ice-observations')
setupObservationsScroller('.snow-observations')
setupObservationsScroller('.river-observations')
setupObservationsScroller('.land-observations')
setupObservationsScroller('.vegetation-observations')

// Other region-specific code
import 'winterTempsMapScroller'
import 'permafrostMapScroller'
import 'areaBurnedPlot'
import 'observationsPie'
import 'observationMapLayers'
import 'historicalFiresMapScroller'
import 'snowdayFractionMapScroller'

// Adjust heights of blocks as necessary.
// function getAbsoluteHeight (el) {
//   el = (typeof el === 'string') ? document.querySelector(el) : el

//   var styles = window.getComputedStyle(el)
//   var margin = parseFloat(styles['marginTop']) +
//                parseFloat(styles['marginBottom'])

//   return Math.ceil(el.offsetHeight + margin)
// }

// var scrollContainers = Array.from(document.getElementsByClassName('scroll-container'))
// function recalcScrollersHeight () {
//   var windowHeight = document.documentElement.clientHeight
//   scrollContainers.forEach(sc => {
//     console.log('original height', sc.clientHeight)
//     var scSteps = sc.querySelectorAll('.step')
//     let containerHeight = 0
//     scSteps.forEach(step => {
//       containerHeight += getAbsoluteHeight(step)
//     })
//     // Offset 50vh
//     containerHeight -= windowHeight * 0.5
//     let heightStyle = 'height: ' + containerHeight + 'px; min-height: ' + containerHeight + 'px; max-height: ' + containerHeight + 'px;'
//     sc.setAttribute('style', heightStyle)
//     sc.style.height = containerHeight + 'px'
//     sc.style.minHeight = containerHeight + 'px'
//     console.log('revised height', sc.clientHeight)
//   })
// }
// recalcScrollersHeight()
// window.addEventListener('resize', recalcScrollersHeight)
