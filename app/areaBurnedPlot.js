import Plotly from 'plotly.js-basic-dist'

const years = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s', '2030s', '2040s', '2050s', '2060s', '2070s', '2080s', '2090s']
const historical = [30764, 17505, 10257, 13574, 29616, 63200]
const modeled = [ undefined, undefined, undefined, undefined, undefined, undefined, 10088, 23238, 24853, 21833, 21253, 31987, 20525, 30321 ]

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
  title: 'Total Area Burned by Decade (km&#x00b2;)',
  font: {
    family: 'Cabin, sans-serif'
  },
  legend: {
    x: 0,
    y: -0.25
  },
  responsive: true,
  xaxis: {
    dtick: 1
  }
}

Plotly.newPlot('area-burned-plot', data, layout)
