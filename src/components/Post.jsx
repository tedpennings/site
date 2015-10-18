import React from 'react'
import Markdown from 'react-remarkable'
import { fetchPost } from '../DataService'

export default class MainColumn extends React.Component {

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
    const { post } = this.state
    if (!Object.keys(post).length) {
      return (<div><p>Loading...</p></div>)
    }
    const date = new Date(post.get('date'))
    return (
      <div className='post'>
        <h3>{post.get('title')}</h3>
        <p className='date'>{date.toLocaleString()}</p>
        <Markdown source={post.get('body')} />
      </div>
    )
  }
}
