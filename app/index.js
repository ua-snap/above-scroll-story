/**
 * Application entry point
 */

// Polyfills
import '@babel/polyfill'

// Load application styles
import 'styles/index.scss'
import 'intersection-observer'
import Stickyfill from 'stickyfilljs'

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
import 'observationMapLayers'
import 'historicalFiresMapScroller'
import 'snowdayFractionMapScroller'

// Polyfill position:sticky for IE11
var elements = document.querySelectorAll('.sticky')
Stickyfill.add(elements)
