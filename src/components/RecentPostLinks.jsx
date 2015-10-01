import React from 'react'
import { Link } from 'react-router'

const links = [
  // TODO
  { key: 'post1', title: 'post1', url: 'somewhere', timestamp: 1443682535377 },
  { key: 'post3', title: 'post3', url: 'somewhere', timestamp: 1443682535312 },
  { key: 'post2', title: 'post2', url: 'somewhere', timestamp: 1443682535242 }
]

export default class RecentPostLinks extends React.Component {
  render () {
    return (
      <div className='recentPostLinks mainColumnContent'>
        <ul>
          {links.map(post => {
            return (<li key={post.title}>
                      <Link to={`/post/${post.key}`}>{post.title}</Link>
                    </li>)
          })}
        </ul>
      </div>
    )
  }
}
