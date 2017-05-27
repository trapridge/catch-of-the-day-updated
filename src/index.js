import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import './css/style.css'

import StorePicker from './components/StorePicker'
import App from './components/App'
import NotFound from './components/NotFound'

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StorePicker} />
        <Route path='/store/:storeId' component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'))