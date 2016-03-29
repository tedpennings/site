import React from 'react'
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import Editor from './Editor'
import { BioWithRecentPostLinks, Photo, PostWrapper } from './components'

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute components={{ leftColumn: Photo, mainColumn: BioWithRecentPostLinks }} />
      <Redirect path='entry/:key' to='post/:key' />
      <Route path='post/:key' components={{ leftColumn: PostWrapper, mainColumn: BioWithRecentPostLinks }}/>
    </Route>
    <Route path='/edit/:key' component={Editor} />
    <Redirect from='*' to='/' />
  </Router>
)

export default Routes
