import Plotly from 'plotly.js-basic-dist'

var data = [{
  values: [21, 17, 18, 13, 9, 15, 7],
  labels: ['Ice', 'Snow', 'Water Levels', 'Erosion', 'Sedimentation', 'Vegetation Change', 'Weather'],
  type: 'pie'
}]

var layout = {
  title: 'Total area burned',
  font: {
    family: 'Cabin, sans-serif'
  },
  legend: {
    x: 0,
    y: -0.25
  }
}

Plotly.newPlot('observations-pie-chart', data, layout)
