// Don't even load all the fancy stuff if we're on mobile.
import isMobile from 'is-mobile'

// Load (tiny!) application styles
import 'styles/mobile.scss'

if (isMobile() === false) {
  console.log('full version!')
  import('main')
} else {
  console.log('mobile version')
  // rewrite document for mobile!
  document.addEventListener('DOMContentLoaded', function () {
    // Delete sections with the maps.
    var mapScrollers = document.querySelectorAll('.map-scroller')
    for (let i = 0; i < mapScrollers.length; i++) {
      mapScrollers[i].innerHTML = ''
    }

    // Rewrite the observations to omit scroller
    var observationScrollers = document.querySelectorAll('.scroll-container')
    for (let j = 0; j < observationScrollers.length; j++) {
      // Get the images & observations...
      let images = observationScrollers[j].querySelectorAll('.observations__images > img')
      let obs = observationScrollers[j].querySelectorAll('.observation')
      let newObsRoot = document.createElement('div')
      for (let i = 0; i < images.length; i++) {
        // Reassign image to mobile-optimized versions
        let src = images[i].getAttribute('data-src').replace(/obs/gi, 'mobile')
        images[i].setAttribute('src', src)

        let obsWrapper = document.createElement('div')
        obsWrapper.classList.add('observation-wrapper')
        obsWrapper.appendChild(images[i])
        obsWrapper.appendChild(obs[i])
        newObsRoot.appendChild(obsWrapper)
      }
      observationScrollers[j].innerHTML = ''
      observationScrollers[j].appendChild(newObsRoot)
    }
  })
}
