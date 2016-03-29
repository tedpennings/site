import React from 'react'

const loadingBars = require('file?name=loading-bars-[hash].svg!../../public/loading-bars.svg')

export default function () {
  return (
    <p className='loading'>
      <img src={loadingBars} />
    </p>
  )
}
