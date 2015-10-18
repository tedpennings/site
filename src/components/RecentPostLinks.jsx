import React from 'react'
import { Link } from 'react-router'
import Markdown from 'react-remarkable'
import { recentPosts } from '../DataService'

export default class RecentPostLinks extends React.Component {

  constructor (props) {
    super(props)
    this.state = {posts: []}
  }

  componentDidMount () {
    recentPosts().then(posts => this.setState({posts}))
  }

  renderPosts (posts) {
    return (
      <ul>
        {posts.map(post => {
          return (<li key={post.get('title')}>
                    <Link to={`/post/${post.get('key')}`}>
                      {post.get('title')}
                    </Link>
                  </li>)
        })}
      </ul>
    )
  }

  render () {
    const { posts } = this.state
    const loaded = posts && posts.size
    return (
      <div className='recentPostLinks mainColumnContent'>
        {!loaded && <p className='loading'>Loading posts...</p>}
        {loaded && this.renderPosts(posts)}
      </div>
    )
  }
}
