import React from 'react'

import Bio from './Bio'
import RecentPostLinks from './RecentPostLinks'

export default class BioWithRecentPosts extends React.Component {
  render () {
    return (
      <div>
        <Bio />
        <RecentPostLinks />
      </div>
    )
  }
}
