import { getBaseMap, baseLayerOptions } from 'baseMap'
import L from 'leaflet'
import { layers } from 'observationMapLayers'
import getCommunitiesLayer from 'communities'

var firesMap = getBaseMap('historical-fires__map', {
  zoom: 2,
  center: [64.62756867126886, -154]
})
layers[3].addTo(firesMap)
getCommunitiesLayer().addTo(firesMap)

L.tileLayer.wms(
  'http://52.24.100.6:8080/geoserver/wms',
  {
    ...baseLayerOptions,
    layers: ['historical_fire_perimiters'],
    styles: 'fire_history_70s_2010s'
  }
).addTo(firesMap)
