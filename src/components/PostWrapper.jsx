import React from 'react'
import Markdown from 'react-remarkable'
import { fetchPost } from '../DataService'
import Loading from './Loading'
import Post from './Post'

export default class PostWrapper extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { post: {} }
  }

  componentDidMount() {
    this.loadPost()
  }

  componentWillUpdate(nextProps, nextState) {
    // ick. state.
    if (nextProps.params.key !== this.props.params.key) {
      this.setState({ post: {} })
      this.loadPost(nextProps.params.key)
    }
  }

  loadPost = (key = this.props.params.key) => {
    fetchPost(key)
      .then(post => {
        // firebase doesn't have a 404
        if (!post.get('title')) {
          // TODO redirect to nice 404 page
          this.context.history.pushState({}, '/')
          return
        }
        this.setState({post})
      })
  }

  render () {
    return <Post post={this.state.post} />
  }
}
