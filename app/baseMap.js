import L from 'leaflet'
import p4l from 'proj4leaflet' // eslint-disable-line
import 'leaflet-defaulticon-compatibility'

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
  zoom: 1,
  minZoom: 0,
  maxZoom: 7,
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
  continuousWorld: true // needed for non-3857 projs
}

function getBaseLayer () {
  return L.tileLayer.wms('http://52.24.100.6:8080/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['alaska_osm']
    }
  )
}

function getPlacesLayer () {
  return L.tileLayer.wms('http://52.24.100.6:8080/geoserver/wms',
    {
      ...baseLayerOptions,
      layers: ['alaska_places_osm_3338'],
      zIndex: 1000
    }
  )
}

export function getBaseMap (divId, options) {
  var map = L.map(divId, { ...mapOptions, ...options })
  getBaseLayer().addTo(map)
  getPlacesLayer().addTo(map)
  return map
}
