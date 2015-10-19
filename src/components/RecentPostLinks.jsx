import React from 'react'
import { Link } from 'react-router'
import { recentPosts } from '../DataService'
import Loading from './Loading'

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
        {!loaded && <Loading />}
        {loaded && this.renderPosts(posts)}
      </div>
    )
  }
}
