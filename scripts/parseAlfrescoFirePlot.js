const util = require('util')
const fs = require('fs')
const _ = require('lodash')

var alfrescoJson = './NCAR-CCSM4_rcp85_v2.json'
var historicalJson = './Observed_IEM_AR5_v1_v2.json'

fs.readFile(historicalJson, (hErr, hData) => {
  if (hErr) throw hErr
  var historicalJson = JSON.parse(hData)._default
  var hDecades = _.range(1950, 2020, 10)
  var hDecadesOutput = {}
  _.each(hDecades, hDecade => {
    let hDecadalSum = 0
    for (let i = 0; i <= 9; i++) {
      var k = _.find(historicalJson, e => {
        return e.fire_year == hDecade + i
      })
      if (k) {
        hDecadalSum += k.total_area_burned.Limited
        hDecadalSum += k.total_area_burned.Full
        hDecadalSum += k.total_area_burned.Critical
        hDecadalSum += k.total_area_burned.Modified
      }
    }
    hDecadesOutput[hDecade] = hDecadalSum

  })
  console.log(util.inspect(hDecadesOutput, { showHidden: true, showProxy: true }))

  fs.readFile(alfrescoJson, (err, data) => {
    if (err) throw err
    var json = JSON.parse(data)._default
    var outputJson = {}
    var years = _.range(1901, 2100) // create date range

    _.each(years, year => {

      // Grab the replicates matching a specific year
      let reps = _.filter(
        json,
        yearRep => {
          return yearRep.fire_year == year
        }
      )

      let totals = 0
      _.each(reps, rep => {
        totals += rep.total_area_burned.Limited
        totals += rep.total_area_burned.Full
        totals += rep.total_area_burned.Critical
        totals += rep.total_area_burned.Modified
      })
      outputJson[year] = totals / 200
    })

    var decades = _.range(1950, 2090, 10)
    var decadesOutput = {}
    _.each(decades, decade => {
      let decadalSum = 0
      for (let i = 0; i <= 9; i++) {
        decadalSum += outputJson[decade + i]
      }
      decadesOutput[decade] = decadalSum
    })
    console.log(util.inspect(decadesOutput, { showHidden: true, showProxy: true }))
  })

})
