const csv = require('csvtojson')
const GeoJSON = require('geojson')
const util = require('util')
const fs = require('fs')

csvFilePath = './snow-ice-obs.csv'

csv({
  noheader: false,
  headers: [
    'id','harvester','date','permissionGranted','mapVentures','photoIdPrefix','photoFileNames','lat','lng','condition','whatIsPictured','whatisImpact','tripPurpose','frequencyOfObservation','yearFirstObserved','safetyImpact','commonInOtherPlaces','field1','notes','sensitivity'
  ]
})
.fromFile(csvFilePath)
.then((jsonObj) => {
  var geojson = GeoJSON.parse(jsonObj, { Point: ['lat', 'lng'] })
  var output = JSON.stringify(geojson)
  console.log(output)

  fs.writeFile('/tmp/observations.geojson', output, function(err) {
    if(err) {
      return console.log(err)
    }
  })
})
