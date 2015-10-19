import React from 'react'
var photo = require('file?name=me-[hash].jpg!../../public/me.jpg')

export default class Photo extends React.Component {
  render () {
    return (
      <div className='photo'>
        <img src={photo} />
      </div>
    )
  }
}
