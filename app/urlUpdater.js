const anchors = document.querySelectorAll('a[name]')
import _ from 'lodash'

var state

var observer = new IntersectionObserver(entries => {
  var visible = entries.find(entry => {
    return entry.intersectionRatio > 0.1
  })
  if (visible) {
    let target = visible.target.getAttribute('name')
    state = '#' + target

    // Ignore #top
    if (target === 'top') {
      state = '#'
    }

    history.replaceState({ section: target }, undefined, state)
  }
})

_.each(anchors, anchor => {
  observer.observe(anchor)
})
