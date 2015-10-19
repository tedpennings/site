import React from 'react'
import Markdown from 'react-remarkable'
import { fetchPost } from '../DataService'
import Loading from './Loading'
import Post from './Post'

export default class PostWrapper extends React.Component {

  constructor (props) {
    super(props)
    this.state = { post: {} }
  }

  componentWillMount() {
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
    fetchPost(key).then(post => this.setState({post}))
  }

  render () {
    return <Post post={this.state.post} />
  }
}
