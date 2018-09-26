import { getBaseMap } from 'baseMap'
import observations from '@/all-observations'
import L from 'leaflet'
import scrollama from 'scrollama'

var map = getBaseMap('observations-map__map')

// Show all observations as grey dots
var allObservationsLayer = L.geoJson(observations, { // eslint-disable-line
  pointToLayer: (geoJsonPoint, latlng) => {
    return L.circleMarker(latlng, {
      stroke: false,
      fillOpacity: 0.8,
      radius: 3,
      fillColor: '#888'
    })
  }
}).addTo(map)

// Color map for the different categories
var observationColors = [
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99'
]

// Filter categories for use in the scroller
var observationLayers = [
  // Ice
  observations.features.filter(e => {
    return /.*Ice.*/g.test(e.properties.condition)
  }),
  // Snow
  observations.features.filter(e => {
    return /.*Snow.*/g.test(e.properties.condition)
  }),
  // Erosion, sedimentation and water levels -- both land and water
  observations.features.filter(e => {
    return /.*Erosion.*/g.test(e.properties.condition)
  }).concat(observations.features.filter(e => {
    return /.*Sedim.*/g.test(e.properties.condition)
  })).concat(observations.features.filter(e => {
    return /.*Water*/g.test(e.properties.condition)
  })),
  // Vegetation
  observations.features.filter(e => {
    return /.*Veg*/g.test(e.properties.condition)
  })
].map(
  (features, index) => {
    return L.geoJSON({
      'type': 'FeatureCollection',
      'features': features
    }, {
      pointToLayer: (geoJsonPoint, latlng) => {
        return L.circleMarker(latlng, {
          weight: 0.5,
          color: '#333',
          fillColor: observationColors[index],
          fillOpacity: 0.7
        })
      }
    })
  }
)

const scroller = scrollama()
function handleStepEnter (obj) {
  observationLayers.forEach((layer, index) => {
    if (index === obj.index) {
      layer.addTo(map)
    } else {
      layer.remove()
    }
  })
}

// setup the instance, pass callback functions
scroller
  .setup({
    step: '.observations-map__scroll-container .scroll__text .step',
    container: '.observations-map__scroll-container',
    graphic: '.observations-map__scroll-container .scroll__graphic'
  })
  .onStepEnter(handleStepEnter)
