require('../sass/main.scss')

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './App'
import { BioWithRecentPostLinks, Photo, Post } from './components'

const history = createBrowserHistory()

const router = (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute components={{ leftColumn: Photo, mainColumn: BioWithRecentPostLinks }} />
      <Route path='post/:key' components={{ leftColumn: Post, mainColumn: BioWithRecentPostLinks }}/>
    </Route>
    <Redirect from='*' to='/' />
  </Router>)

ReactDOM.render(router, document.body)
