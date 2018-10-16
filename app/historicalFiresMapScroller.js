import { getBaseMap, baseLayerOptions } from 'baseMap'
import L from 'leaflet'
import { layers } from 'observationMapLayers'
import getCommunitiesLayer from 'communities'
import scrollama from 'scrollama'

var firesMap = getBaseMap('historical-fires__map')
layers[3].addTo(firesMap)
getCommunitiesLayer().addTo(firesMap)

L.tileLayer.wms(
  'http://52.24.100.6:8080/geoserver/wms',
  {
    ...baseLayerOptions,
    layers: ['historical_fire_perimiters'],
    className: 'animate-layer map-layer-invisible fire_history_70s_2010s',
    styles: 'fire_history_70s_2010s' // WMS style for layer
  }
).addTo(firesMap)

var firesMapLayers = [
  firesMap.getPane('observations-vegetation'),
  document.getElementsByClassName('fire_history_70s_2010s')[0]
]

const scroller = scrollama()
var resizeHandler = function () {
  scroller.resize()
}
window.addEventListener('resize', resizeHandler)

function handleStepEnter (obj) {
  firesMapLayers.forEach((layer, index) => {
    if (index === obj.index) {
      layer.classList.remove('map-layer-invisible')
      layer.classList.add('map-layer-visible')
    } else {
      layer.classList.remove('map-layer-visible')
      layer.classList.add('map-layer-invisible')
    }
  })
}

scroller
  .setup({
    step: '.historical-fires__scroll-container .scroll__text .step',
    container: '.historical-fires__scroll-container',
    graphic: '.historical-fires__scroll-container .scroll__graphic'
  })
  .onStepEnter(handleStepEnter)
