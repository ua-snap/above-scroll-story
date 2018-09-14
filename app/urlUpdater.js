const anchors = document.querySelectorAll('a[name]')

var observer = new IntersectionObserver(entries => {
  var visible = entries.find(entry => {
    return entry.intersectionRatio > 0.1
  })
  if (visible) {
    let target = visible.target.getAttribute('name')
    history.pushState({ section: target }, undefined, '#' + target)
  } else {
    history.pushState({}, undefined, '/')
  }
})

anchors.forEach(anchor => {
  observer.observe(anchor)
})
