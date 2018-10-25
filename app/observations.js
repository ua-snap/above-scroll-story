import scrollama from 'scrollama'
import forEach from 'lodash.foreach'

export function setupObservationsScroller (selector) {
  var images = document.querySelectorAll(selector + ' .observations__images > img, ' + selector + ' .observations__images > figure')
  let _scroller = scrollama()

  // setup the instance, pass callback functions
  _scroller
  .setup(
    {
      step: selector + ' .scroll__text .step',
      container: selector,
      graphic: selector + ' .scroll__graphic'
    }
  ).onStepEnter(
    (obj) => {
      forEach(images, (img, index) => {
        if (obj.index === index) {
          images[index].classList.add('shown')
          images[index].classList.remove('hidden')
        } else {
          images[index].classList.add('hidden')
          images[index].classList.remove('shown')
        }
      })
    }
  )
}
