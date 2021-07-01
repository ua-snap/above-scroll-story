import { getBaseMap, baseLayerOptions } from 'baseMap'
import L from 'leaflet'
import getCommunitiesLayer from 'communities'
import scrollama from 'scrollama'
import { layers } from 'observationMapLayers'

var permafrostMap = getBaseMap('permafrost-map__map')
layers[2].addTo(permafrostMap)
getCommunitiesLayer().addTo(permafrostMap)

// Map an array of properties to DOM reference for an
// instantiated Leaflet element.
var permafrostMapLayers = [
  'July_permafrost_2m_1970s_tcc',
  'July_permafrost_2m_2010s_tcc'
].map(layerName => {
  L.tileLayer.wms(
    'https://gs.mapventure.org/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['nasa_above:' + layerName],
      className: 'animate-layer map-layer-invisible ' + layerName
    }
  ).addTo(permafrostMap)
  return document.getElementsByClassName(layerName)[0]
})

permafrostMapLayers.unshift(
  permafrostMap.getPane('observations-erosion')
)

const scroller = scrollama()
var resizeHandler = function () {
  scroller.resize()
}
window.addEventListener('resize', resizeHandler)

function handleStepEnter (obj) {
  // If on 1st step, hide map legend.
  if (obj.index !== 0) {
    document.getElementsByClassName('permafrost-map__legend')[0].classList.remove('hidden')
    document.getElementsByClassName('permafrost-map__legend')[0].classList.add('visible')
  } else {
    document.getElementsByClassName('permafrost-map__legend')[0].classList.add('hidden')
    document.getElementsByClassName('permafrost-map__legend')[0].classList.remove('visible')
  }
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
