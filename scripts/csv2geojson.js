// This script takes two CSVs and produces GeoJSON/HTML output.

const csv = require('csvtojson')
const GeoJSON = require('geojson')
const util = require('util')
const fs = require('fs')
const _ = require('lodash')
const moment = require('moment')

var csvFilePath = './observations.csv'
var fullCsvFilePath = './all-observations.csv'

csv({
  noheader: false,
  headers: [
    'id','date','lat','lng','condition'
  ]
})
.fromFile(fullCsvFilePath)
.then((jsonObj) => {
  var geojson = GeoJSON.parse(jsonObj, { Point: ['lat', 'lng'] })
  var output = JSON.stringify(geojson)
  console.log(output)

  fs.writeFile('/tmp/all-observations.geojson', output, function(err) {
    if(err) {
      return console.log(err)
    }
  })
});

// Just the observations we're using in the narrative, make a GeoJSON of all properties,
// and an HTML from template.
csv({
  noheader: false,
  headers: [
    'id','harvester','date','permissionGranted','mapVentures','photoIdPrefix','photoFileNames','lat','lng','condition','whatIsPictured','whatIsImpact','tripPurpose','frequencyOfObservation','yearFirstObserved','safetyImpact','commonInOtherPlaces','field1','notes','sensitivity','narrative'
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

  var template = _.template(`
<div class="observation" data-observation-id="<%= id %>">
  <a name="<%= category %>-observation-<%= id %>"></a>
  <div class="observation__date"><%= date %></div>
  <div class="observation__author"><%= observer %></div>
  <div class="observation__description">
    <p><%= narrative %></p>
  </div>
</div>
  `)
  // Also general HTML for use in Narrative
  var html = ''
  _.each(jsonObj, (obs) => {
    var parsedDate = moment(obs.date, 'MM-DD-YYYY').format('MMMM D, YYYY')
    html += template({
      id: obs.id,
      category: obs.condition.replace(/\s+/g, '-').toLowerCase(),
      date: parsedDate,
      observer: obs.harvester,
      narrative: obs.narrative,
    })
  })

  console.log(html)
  fs.writeFile('/tmp/observations.html', html, function(err) {
    if(err) {
      return console.log(err)
    }
  })
})
