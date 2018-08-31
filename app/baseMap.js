import L from 'leaflet'

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
var mymap = L.map('map1', mapOptions)

var baseLayerOptions = {
  transparent: true,
  srs: 'EPSG:3338',
  format: 'image/png',
  version: '1.3',
  continuousWorld: true // needed for non-3857 projs
}
var baseLayer = L.tileLayer.wms('http://52.24.100.6:8080/geoserver/wms',
  {
    ...baseLayerOptions,
    layers: ['alaska_osm']
  }
)
var placesLayer = L.tileLayer.wms('http://52.24.100.6:8080/geoserver/wms',
  {
    ...baseLayerOptions,
    layers: ['alaska_places_osm_3338'],
    zIndex: 1000
  }
)
// var temps1970s = L.tileLayer.wms('http://52.24.100.6:8080/geoserver/wms',
//   {
//     ...baseLayerOptions,
//     layers: ['nasa_above:wintertemp_1970s_tcc'],
//     opacity: 0.8
//   }
// )
// var temps2010s = L.tileLayer.wms('http://52.24.100.6:8080/geoserver/wms',
//   {
//     ...baseLayerOptions,
//     layers: ['nasa_above:wintertemp_2010s_tcc'],
//     opacity: 0.8
//   }
// )
baseLayer.addTo(mymap)
placesLayer.addTo(mymap)
