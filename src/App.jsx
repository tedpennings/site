import React from 'react'
import { Link } from 'react-router'

import { ContactInfo } from './components'

export default class App extends React.Component {

  static propTypes = {
    leftColumn: React.PropTypes.element.isRequired,
    mainColumn: React.PropTypes.element.isRequired
  }

  render () {
    const { leftColumn, mainColumn } = this.props
    return (
      <div className='container'>
        <header>
          <h1><Link to='/'>Ted Pennings</Link></h1>
        </header>
        <div className='leftColumn'>
          {leftColumn}
        </div>
        <div className='mainColumn'>
          <ContactInfo />
          {mainColumn}
        </div>
      </div>
    )
  }

}
