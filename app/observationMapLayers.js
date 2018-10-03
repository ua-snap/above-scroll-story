import observations from '@/all-observations'
import L from 'leaflet'

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
  // 0 - Ice
  observations.features.filter(e => {
    return /.*Ice.*/g.test(e.properties.condition)
  }),
  // 1 - Snow
  observations.features.filter(e => {
    return /.*Snow.*/g.test(e.properties.condition)
  }),
  // 2 - Erosion, sedimentation and water levels -- both land and water
  observations.features.filter(e => {
    return /.*Erosion.*/g.test(e.properties.condition)
  }).concat(observations.features.filter(e => {
    return /.*Sedim.*/g.test(e.properties.condition)
  })).concat(observations.features.filter(e => {
    return /.*Water*/g.test(e.properties.condition)
  })),
  // 3 - Vegetation
  observations.features.filter(e => {
    return /.*Veg*/g.test(e.properties.condition)
  })
]

var paneNames = ['ice', 'snow', 'erosion', 'vegetation']
var layers = paneNames.map(
  (featureName, index) => {
    return L.geoJSON({
      'type': 'FeatureCollection',
      'features': observationLayers[index]
    }, {
      pointToLayer: (geoJsonPoint, latlng) => {
        if (latlng.lat === 0 || latlng.lng === 0) {
          return false
        }
        if (latlng.lng > 0) {
          latlng.lng = -latlng.lng
        }
        return L.circleMarker(latlng, {
          pane: 'observations-' + featureName,
          weight: 1.5,
          radius: 5,
          color: '#333',
          fillColor: observationColors[index],
          fillOpacity: 0.7
        })
      }
    })
  }
)

export { layers, paneNames }
