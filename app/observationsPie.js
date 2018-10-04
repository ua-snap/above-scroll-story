import Plotly from 'plotly.js-basic-dist'

var data = [{
  values: [21, 17, 18, 13, 9, 15, 7],
  labels: ['Ice', 'Snow', 'Water Levels', 'Erosion', 'Sedimentation', 'Vegetation Change', 'Weather'],
  marker: {
    colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f']
  },
  type: 'pie'
}]

var layout = {
  font: {
    family: 'Cabin, sans-serif',
    size: 18
  },
  legend: {
    x: 1,
    y: 0.5
  },
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0
  }
}

Plotly.newPlot('observations-pie-chart', data, layout)
