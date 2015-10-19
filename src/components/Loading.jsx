import React from 'react'
var loadingBars = require('file?name=loading-bars-[hash].svg!../../public/loading-bars.svg')

export default class RecentPostLinks extends React.Component {

  render () {
    return (
      <p className='loading'>
        <img src={loadingBars} />
      </p>
    )
  }

}
