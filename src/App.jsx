import React from 'react'
import { Link } from 'react-router'

import { ContactInfo } from './components'

export default class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.shape({
      leftColumn: React.PropTypes.element,
      mainColumn: React.PropTypes.element
    })
  }

  render () {
    return (
      <div className='container'>
        <h1><Link to='/'>Ted Pennings</Link></h1>
        <div className='leftColumn'>
          {this.props.children.leftColumn}
        </div>
        <div className='mainColumn'>
          <ContactInfo />
          {this.props.children.mainColumn}
        </div>
      </div>
    )
  }

}
