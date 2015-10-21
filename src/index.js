require('../sass/main.scss')
require('file?name=favicon.ico!../public/favicon.ico')

require('babel/polyfill')
require('es6-shim')

import ReactDOM from 'react-dom'
import Routes from './Routes'

var container = document.createElement('div')
container.id = 'container'
document.body.appendChild(container)

ReactDOM.render(Routes, container)
