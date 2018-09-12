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

// Observations are in the global scope to be referenced by subsections
import observations from '@/observations' // eslint-disable-line

// App!
import 'baseMap'
import 'iceObservations'
