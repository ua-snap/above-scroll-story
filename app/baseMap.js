import L from 'leaflet'
import p4l from 'proj4leaflet' // eslint-disable-line
import 'leaflet-defaulticon-compatibility'
import { paneNames } from 'observationMapLayers'

var crs = new L.Proj.CRS('EPSG:3338',
'+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
  {
    resolutions: [4096, 2048, 1024, 512, 256, 128, 64],

    // Origin should be lower-left coordinate
    // in projected space.  Use GeoServer to
    // find this:
    // TileSet > Gridset Bounds > compute from maximum extent of SRS
    origin: [-4648005.934316417, 444809.882955059]
  }
)
var mapOptions = {
  minZoom: 0,
  maxZoom: 7,
  zoom: 1,
  center: [64.62756867126886, -151.58022337112894],
  crs: crs,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  zoomControl: false,
  dragging: false
}

export var baseLayerOptions = {
  transparent: true,
  srs: 'EPSG:3338',
  format: 'image/png',
  version: '1.3',
  tiled: true, // needed for GeoWebCache
  continuousWorld: true // needed for non-3857 projs
}

function getBaseLayer () {
  return L.tileLayer.wms('http://54.70.10.93:8080/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['alaska_osm']
    }
  )
}

export function getBaseMap (divId, options) {
  var map = L.map(divId, { ...mapOptions, ...options })
  paneNames.forEach(pane => {
    map.createPane('observations-' + pane)
  })
  getBaseLayer().addTo(map)
  return map
}
