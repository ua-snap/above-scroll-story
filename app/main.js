/**
 * Application entry point for full (non-mobile) functionality.
 */
// When DOM is ready, hide loading screen.
window.addEventListener('load', function () {
  let overlay = document.getElementById('loading-overlay')
  overlay.classList.add('loaded')

  let app = document.getElementById('app-wrapper')
  app.style.display = 'block'
})

// Load application styles
import 'styles/index.scss'

// Additional polyfills
import 'intersection-observer'
import Stickyfill from 'stickyfilljs'

// Lazy-load images below the fold
import LazyLoad from 'vanilla-lazyload'
var lazyLoaded = new LazyLoad({ // eslint-disable-line
  elements_selector: '.lazy'
})

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
import 'observationMapLayers'
import 'historicalFiresMapScroller'
import 'snowdayFractionMapScroller'

// Polyfill position:sticky for IE11
var elements = document.querySelectorAll('.sticky')
Stickyfill.add(elements)
