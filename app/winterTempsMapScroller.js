import { getBaseMap, baseLayerOptions } from 'baseMap'
import L from 'leaflet'
import getCommunitiesLayer from 'communities'
import scrollama from 'scrollama'
import { layers } from 'observationMapLayers'

var tempsAndFrozenMap = getBaseMap('ice-and-snow__map')
layers[0].addTo(tempsAndFrozenMap)
getCommunitiesLayer().addTo(tempsAndFrozenMap)

var tempsFrozenSeasonMapLayers = []

// Map an array of properties to DOM reference for an
// instantiated Leaflet element
tempsFrozenSeasonMapLayers = [
  'wintertemp_1970s_tcc',
  'wintertemp_2010s_tcc',
].map(layerName => {
  L.tileLayer
    .wms('https://gs.mapventure.org/geoserver/wms', {
      ...baseLayerOptions,
      layers: ['nasa_above:' + layerName],
      className: 'animate-layer map-layer-invisible ' + layerName,
    })
    .addTo(tempsAndFrozenMap)
  return document.getElementsByClassName(layerName)[0]
})

tempsFrozenSeasonMapLayers.unshift(
  tempsAndFrozenMap.getPane('observations-ice')
)

const scroller = scrollama()
var resizeHandler = function () {
  scroller.resize()
}
window.addEventListener('resize', resizeHandler)

function handleStepEnter(obj) {
  // If on 1st step, hide map legend.
  if (obj.index !== 0) {
    document
      .getElementsByClassName('ice-and-snow__legend')[0]
      .classList.remove('hidden')
    document
      .getElementsByClassName('ice-and-snow__legend')[0]
      .classList.add('visible')
  } else {
    document
      .getElementsByClassName('ice-and-snow__legend')[0]
      .classList.add('hidden')
    document
      .getElementsByClassName('ice-and-snow__legend')[0]
      .classList.remove('visible')
  }
  tempsFrozenSeasonMapLayers.forEach((layer, index) => {
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
    step: '.ice-and-snow__scroll-container .scroll__text .step',
    container: '.ice-and-snow__scroll-container',
    graphic: '.ice-and-snow__scroll-container .scroll__graphic',
  })
  .onStepEnter(handleStepEnter)
