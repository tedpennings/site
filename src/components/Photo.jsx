import React from 'react'

const photo = require('file?name=me-[hash].jpg!../../public/me.jpg')

export default function () {
  return (
    <div className='photo'>
      <img src={photo} />
    </div>
  )
}
