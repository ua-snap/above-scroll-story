import { getBaseMap, baseLayerOptions } from 'baseMap'
import L from 'leaflet'
import getCommunitiesLayer from 'communities'
import scrollama from 'scrollama'

var permafrostMap = getBaseMap('permafrost-map__map')
getCommunitiesLayer().addTo(permafrostMap)

// Map an array of properties to DOM reference for an
// instantiated Leaflet element.
var permafrostMapLayers = [
  'July_permafrost_2m_1970s_tcc',
  'July_permafrost_2m_2010s_tcc'
].map(layerName => {
  L.tileLayer.wms(
    'http://52.24.100.6:8080/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['nasa_above:' + layerName],
      className: 'animate-layer map-layer-invisible ' + layerName
    }
  ).addTo(permafrostMap)
  return document.getElementsByClassName(layerName)[0]
})

const scroller = scrollama()
function handleStepEnter (obj) {
  permafrostMapLayers.forEach((layer, index) => {
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
    step: '.permafrost-map__scroll-container .scroll__text .step',
    container: '.permafrost-map__scroll-container',
    graphic: '.permafrost-map__scroll-container .scroll__graphic'
  })
  .onStepEnter(handleStepEnter)
