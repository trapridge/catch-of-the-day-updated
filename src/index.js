import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import './css/style.css'

import StorePicker from './components/StorePicker'
import App from './components/App'
import NotFound from './components/NotFound'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)

render(routes, document.querySelector('#main'))