const util = require('util')
const fs = require('fs')
const _ = require('lodash')

var alfrescoJson = './NCAR-CCSM4_rcp85_v2.json'

fs.readFile(alfrescoJson, (err, data) => {
  if (err) throw err;
  var json = JSON.parse(data)._default
  var outputJson = {}
  var years = _.range(1901, 2100) // create date range

  _.each(years, year => {

    // Grab the replicates matching a specific year
    let reps = _.filter(
      json,
      yearRep => {
        return yearRep.av_year == year // Is `av_year` the right one?
      }
    )

    let totals = 0
    console.log(reps.length) // should be 200?  And that checks out.
    _.each(reps, rep => {
      totals += rep.total_area_burned.Limited
      totals += rep.total_area_burned.Full
      totals += rep.total_area_burned.Critical
      totals += rep.total_area_burned.Modified
    })
    outputJson[year] = totals / 200 // but these numbers don't look like total square KM?
  })
  console.log(util.inspect(outputJson, { showHidden: true, showProxy: true }))
});
