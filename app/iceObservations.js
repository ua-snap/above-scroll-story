import scrollama from 'scrollama'

// Lazy-load images below the fold
import LazyLoad from 'vanilla-lazyload'
var lazyLoaded = new LazyLoad({ // eslint-disable-line
  elements_selector: '.lazy'
})

var images = document.querySelectorAll('.ice-observations img')
const scroller = scrollama()

// setup the instance, pass callback functions
scroller
  .setup({
    step: '.ice-observations .scroll__text .step',
    container: '.ice-observations',
    graphic: '.ice-observations .scroll__graphic'
  })
  .onStepEnter((obj) => {
    images.forEach((img, index) => {
      if (obj.index === index) {
        images[index].classList.add('shown')
        images[index].classList.remove('hidden')
      } else {
        images[index].classList.add('hidden')
        images[index].classList.remove('shown')
      }
    })
  })
