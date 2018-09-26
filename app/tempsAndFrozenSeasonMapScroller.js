import { getBaseMap, baseLayerOptions } from 'baseMap'
import L from 'leaflet'
import getCommunitiesLayer from 'communities'
import scrollama from 'scrollama'

var tempsAndFrozenMap = getBaseMap('ice-and-snow__map')
getCommunitiesLayer().addTo(tempsAndFrozenMap)

var tempsFrozenSeasonMapLayers = []

// Map an array of properties to DOM reference for an
// instantiated Leaflet element.
tempsFrozenSeasonMapLayers = [
  'wintertemp_1970s_tcc',
  'wintertemp_2010s_tcc'
].map(layerName => {
  L.tileLayer.wms(
    'http://52.24.100.6:8080/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['nasa_above:' + layerName],
      className: 'animate-layer map-layer-invisible ' + layerName
    }
  ).addTo(tempsAndFrozenMap)
  return document.getElementsByClassName(layerName)[0]
})

const scroller = scrollama()
function handleStepEnter (obj) {
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
    graphic: '.ice-and-snow__scroll-container .scroll__graphic'
  })
  .onStepEnter(handleStepEnter)
