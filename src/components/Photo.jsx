import React from 'react'

export default class Photo extends React.Component {
  render () {
    return (
      <div className='photo'>
        <img src='//s3-us-west-2.amazonaws.com/static.ted.pennin.gs/me.jpg' />
      </div>
    )
  }
}
