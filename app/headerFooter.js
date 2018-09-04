import scrollMonitor from 'scrollmonitor'

var el = document.getElementsByClassName('header-footer')[0]
var watcher = scrollMonitor.create(el)
watcher.lock()
watcher.stateChange(function () {
  console.log('sticking', this.isAboveViewport, 'REMOVE ME TODO')
  el.classList.toggle('header__stuck', this.isAboveViewport)
})
