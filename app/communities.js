import L from 'leaflet'

const communities = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-146.409665028, 67.05333312]
      },
      properties: {
        name: 'Venetie'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-147.337916, 66.390584]
      },
      properties: {
        name: 'Beaver'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-158.28377, 64.689872]
      },
      properties: {
        name: 'Nulato'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-160.111792, 62.895443]
      },
      properties: {
        name: 'Grayling'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-159.856076, 62.187014]
      },
      properties: {
        name: 'Holy Cross'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-152.462155, 63.790117]
      },
      properties: {
        name: 'Lake Minchumina'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-148.97048, 63.959806]
      },
      properties: {
        name: 'Healy'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-143.037543, 63.328852]
      },
      properties: {
        name: 'Tok'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-145.693529, 64.060263]
      },
      properties: {
        name: 'Delta'
      }
    }
  ]
}

export default function getCommunitiesLayer () {
  return L.geoJSON(communities,
    {
      pointToLayer: (geoJsonPoint, latlng) => {
        return L.circleMarker(latlng, {
          stroke: false,
          fillOpacity: 0.8,
          radius: 5,
          fillColor: '#222'
        })
      }
    }
  )
}
