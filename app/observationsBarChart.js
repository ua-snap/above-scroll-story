import Plotly from 'plotly.js-basic-dist'

const categories = ['Ice', 'Water levels', 'Snow', 'Vegetation changes', 'Erosion', 'Sedimentation', 'Weather']
const obs = [156, 134, 126, 112, 100, 67, 52]

var trace1 = {
  x: obs,
  y: categories,
  mode: 'markers',
  type: 'bar',
  name: 'Team A',
  text: obs.map(String),
  textposition: 'auto',
  textfont: {
    color: '#fff'
  },
  orientation: 'h',
  hoverinfo: 'none'
}

var data = [ trace1 ]

var layout = {
  title: false,
  font: {
    family: 'Cabin, sans-serif',
    size: 18
  },
  xaxis: {
    range: [0, 165],
    title: '# of observations'
  },
  yaxis: {
    type: 'category',
    autorange: 'reversed'
  },
  margin: {
    l: 170,
    r: 0,
    b: 80,
    t: 0,
    pad: 10
  }
}

Plotly.plot('observations-chart', data, layout, {
  displayModeBar: false,
  staticPlot: true
})
