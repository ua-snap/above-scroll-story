import { getBaseMap, baseLayerOptions } from 'baseMap'
import L from 'leaflet'
import getCommunitiesLayer from 'communities'
import scrollama from 'scrollama'
import { layers } from 'observationMapLayers'

var snowdayFractionMap = getBaseMap('snowday-fraction-map__map')
layers[1].addTo(snowdayFractionMap)
getCommunitiesLayer().addTo(snowdayFractionMap)

// Map an array of properties to DOM reference for an
// instantiated Leaflet element.
var snowdayFractionMapLayers = [
  'Oct_snowdayfraction_1970s_tcc_reprojected',
  'Oct_snowdayfraction_2010s_tcc_reprojected',
].map(layerName => {
  L.tileLayer
    .wms('https://gs.earthmaps.io/geoserver/wms', {
      ...baseLayerOptions,
      layers: ['nasa_above:' + layerName],
      className: 'animate-layer map-layer-invisible ' + layerName,
    })
    .addTo(snowdayFractionMap)
  return document.getElementsByClassName(layerName)[0]
})

snowdayFractionMapLayers.unshift(
  snowdayFractionMap.getPane('observations-snow')
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
      .getElementsByClassName('snowday-fraction-map__legend')[0]
      .classList.remove('hidden')
    document
      .getElementsByClassName('snowday-fraction-map__legend')[0]
      .classList.add('visible')
  } else {
    document
      .getElementsByClassName('snowday-fraction-map__legend')[0]
      .classList.add('hidden')
    document
      .getElementsByClassName('snowday-fraction-map__legend')[0]
      .classList.remove('visible')
  }
  snowdayFractionMapLayers.forEach((layer, index) => {
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
    step: '.snowday-fraction-map__scroll-container .scroll__text .step',
    container: '.snowday-fraction-map__scroll-container',
    graphic: '.snowday-fraction-map__scroll-container .scroll__graphic',
  })
  .onStepEnter(handleStepEnter)
