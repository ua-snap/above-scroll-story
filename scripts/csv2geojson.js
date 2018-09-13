const csv = require('csvtojson')
const GeoJSON = require('geojson')
const util = require('util')
const fs = require('fs')
const _ = require('lodash')
const moment = require('moment')

csvFilePath = './above-observations.csv'

csv({
  noheader: false,
  headers: [
    'id','harvester','date','permissionGranted','mapVentures','photoIdPrefix','photoFileNames','lat','lng','condition','whatIsPictured','whatIsImpact','tripPurpose','frequencyOfObservation','yearFirstObserved','safetyImpact','commonInOtherPlaces','field1','notes','sensitivity'
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
    <p><%= pictured %></p>
    <p><%= impact %></p>
  </div>
  <div class="observation__frequency-impact">
    <p>First seen in <span class="first-observed"><%= first %></span>, <span class="frequency"><%= frequency %></span>, <span class="common-elsewhere"><%= common %></span> and it has a <span class="safety-impact"><%= safety %></span> on travel and safety.</p>
  </div>
</div>
  `)
  // Also general HTML for use in Narrative
  var html = ''
  _.each(jsonObj, (obs) => {
    var parsedDate = moment(obs.date, 'DD-MMM-YY').format('MMMM D, YYYY')
    html += template({
      id: obs.id,
      category: obs.condition.replace(/\s+/g, '-').toLowerCase(),
      date: parsedDate,
      observer: obs.harvester,
      pictured: obs.whatIsPictured,
      impact: obs.whatIsImpact,
      first: obs.yearFirstObserved,
      frequency: obs.frequencyOfObservation,
      common: obs.commonInOtherPlaces,
      safety: obs.safetyImpact
    })
  })

  console.log(html)
  fs.writeFile('/tmp/observations.html', html, function(err) {
    if(err) {
      return console.log(err)
    }
  })
})
