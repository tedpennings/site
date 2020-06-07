import React from 'react'

const photo = require('file?name=me-2020-[hash].jpg!../../public/me-2020.jpg')

export default function () {
  return (
    <div className='photo'>
      <img src={photo} />
    </div>
  )
}
