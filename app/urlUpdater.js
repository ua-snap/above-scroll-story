const anchors = document.querySelectorAll('a[name]')

var state

var observer = new IntersectionObserver(entries => {
  var visible = entries.find(entry => {
    return entry.intersectionRatio > 0.1
  })
  if (visible) {
    let target = visible.target.getAttribute('name')
    state = '#' + target
    history.replaceState({ section: target }, undefined, state)
  }
})

anchors.forEach(anchor => {
  observer.observe(anchor)
})
