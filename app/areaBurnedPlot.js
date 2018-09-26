import Plotly from 'plotly.js-basic-dist'

const years = ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2030', '2040', '2050', '2060', '2070', '2080', '2090']
const historical = [30764, 17505, 10257, 13574, 29616, 63200, 4157]
const modeled = [ 34226, 10737, 17137, 9029, 36611, 54494, 10088, 23238, 24853, 21833, 21253, 31987, 20525, 30321 ]

var historicalTrace = {
  x: years,
  y: historical,
  name: 'Historical',
  type: 'bar'
}

var modelledTrace = {
  x: years,
  y: modeled,
  name: 'Modeled',
  type: 'bar'
}

var data = [historicalTrace, modelledTrace]

var layout = {
  barmode: 'group',
  title: 'Total area burned',
  font: {
    family: 'Cabin, sans-serif'
  },
  legend: {
    x: 0,
    y: -0.25
  }
}

Plotly.newPlot('area-burned-plot', data, layout)
