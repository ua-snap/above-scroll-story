import scrollama from 'scrollama'

// Lazy-load images below the fold
import LazyLoad from 'vanilla-lazyload'
var lazyLoaded = new LazyLoad({
  // eslint-disable-line
  elements_selector: '.lazy',
})

// Grab element references to the images we'll be swapping in and out
var img1 = document.querySelector('img[data-img="1"]')
var img2 = document.querySelector('img[data-img="2"]')
var img3 = document.querySelector('img[data-img="3"]')

const scroller = scrollama()
function handleStepEnter(obj) {
  switch (obj.index) {
    case 0:
      img1.classList.remove('hidden')
      img1.classList.add('shown')
      img2.classList.add('hidden')
      img3.classList.add('hidden')
      break
    case 1:
      img1.classList.add('hidden')
      img2.classList.remove('hidden')
      img2.classList.add('shown')
      img3.classList.add('hidden')
      break
    case 2:
      img1.classList.add('hidden')
      img2.classList.add('hidden')
      img3.classList.remove('hidden')
      img3.classList.add('shown')
      break
    default:
  }
}
function handleStepExit(obj) {
  console.log('handleStepExit', obj)
}
function handleContainerEnter(obj) {
  console.log('handleContainerEnter', obj)
}
function handleContainerExit(obj) {
  console.log('handleContainerExit', obj)
}

// setup the instance, pass callback functions
scroller
  .setup({
    step: '.ice-and-snow-obs__scroll-container .scroll__text .step',
    container: '.ice-and-snow-obs__scroll-container',
    graphic: '.ice-and-snow-obs__scroll-container .scroll__graphic',
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit)
  .onContainerEnter(handleContainerEnter)
  .onContainerExit(handleContainerExit)
