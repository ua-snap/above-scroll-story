import { getBaseMap, baseLayerOptions } from 'baseMap'
import snowIceObs from '@/observations'
import L from 'leaflet'
import scrollama from 'scrollama'

var map = getBaseMap('ice-and-snow__map')

L.geoJSON(snowIceObs).addTo(map)

var temps1970s = L.tileLayer
  .wms(
    // eslint-disable-line
    'https://gs.mapventure.org/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['nasa_above:wintertemp_1970s_tcc'],
      className: 'animate-layer temps-1970s map-layer-invisible',
    }
  )
  .addTo(map) // eslint-disable-line
var temps1970sLayerEl = document.getElementsByClassName('temps-1970s')[0]

var temps2010s = L.tileLayer
  .wms(
    // eslint-disable-line
    'https://gs.mapventure.org/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['nasa_above:wintertemp_2010s_tcc'],
      className: 'animate-layer temps-2010s map-layer-invisible',
    }
  )
  .addTo(map)
var temps2010sLayerEl = document.getElementsByClassName('temps-2010s')[0]

const scroller = scrollama()
function handleStepEnter(obj) {
  switch (obj.index) {
    case 0:
      temps1970sLayerEl.classList.remove('map-layer-visible')
      temps1970sLayerEl.classList.add('map-layer-invisible')
      break
    case 1:
      temps1970sLayerEl.classList.remove('map-layer-invisible')
      temps1970sLayerEl.classList.add('map-layer-visible')
      temps2010sLayerEl.classList.remove('map-layer-visible')
      temps2010sLayerEl.classList.add('map-layer-invisible')
      break
    case 2:
      temps1970sLayerEl.classList.remove('map-layer-visible')
      temps1970sLayerEl.classList.add('map-layer-invisible')
      temps2010sLayerEl.classList.remove('map-layer-invisible')
      temps2010sLayerEl.classList.add('map-layer-visible')
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
    step: '.ice-and-snow__scroll-container .scroll__text .step',
    container: '.ice-and-snow__scroll-container',
    graphic: '.ice-and-snow__scroll-container .scroll__graphic',
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit)
  .onContainerEnter(handleContainerEnter)
  .onContainerExit(handleContainerExit)
