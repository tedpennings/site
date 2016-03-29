import React from 'react'
import { Link } from 'react-router'

import { ContactInfo } from './components'

const App = ({leftColumn, mainColumn}) => {
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

App.propTypes = {
  leftColumn: React.PropTypes.element.isRequired,
  mainColumn: React.PropTypes.element.isRequired
}

export default App
