import React from 'react'
import { fetchPost, loginWithGoogle, savePost, deletePost } from './DataService'
import Loading from './components/Loading'
import Post from './components/Post'

export default class Editor extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      login: {
        authenticated: null,
        authData: {},
        error: {}
      },
      post: {}
    }
  }

  componentDidMount () {
    this.loadPost()
    loginWithGoogle()
      .then(authData => this.setState({ login: { authenticated: true, authData } }))
      .catch(error => this.setState({ login: { authenticated: false, error } }))
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
      .then(post => this.setState({ post }))
  }

  loggedIn = () => {
    return this.state.login.authenticated
  }

  renderLogin = () => {
    return (
      <div>
        <h1>Logging in...!</h1>
        <Loading />
      </div>
    )
  }

  renderUnauthorized = () => {
    return (
      <div>
        <h1>Unauthorized!</h1>
      </div>
    )
  }

  updateField = (field) => {
    return (event) => {
      const { value } = event.target
      const newValue = (field === 'date') ? parseInt(value) : value
      let updatedPost = this.state.post.set(field, newValue)
      this.setState({ post: updatedPost })
    }
  }

  updateDateToNow = (event) => {
    const updatedPost = this.state.post.set('date', Date.now())
    this.setState({ post: updatedPost })
  }

  submitPost = () => {
    const key = this.props.params.key
    const post = this.state.post
    savePost(key, post)
      .then(() => { alert('saved!'); this.loadPost() })
      .catch(error => { alert('error!'); console.log(error) })
  }

  deletePost = () => {
    if (confirm('Are you sure?')) {
      const key = this.props.params.key
      deletePost(key)
        .then(() => alert('deleted!'))
        .catch(error => { alert('error!'); console.log(error) })
    }
  }

  render () {
    if (this.state.login.authenticated === null) return this.renderLogin()
    if (this.state.login.authenticated === false) return this.renderUnauthorized()
    return (
      <div className='editor'>
        <div className='raw'>
          <input type='text' className='title' value={this.state.post.get('title')} onChange={this.updateField('title')} />
          <div className='date_input'>
            <input type='text' value={this.state.post.get('date')} onChange={this.updateField('date')} />
            <button onClick={this.updateDateToNow}>Now!</button>
          </div>
          <textarea type='text' value={this.state.post.get('body')} onChange={this.updateField('body')} />
          <button onClick={this.submitPost}>Save!</button>
          <button onClick={this.deletePost}>Delete</button>
        </div>
        <div className='formatted'>
          <Post post={this.state.post} />
        </div>
      </div>
    )
  }
}
