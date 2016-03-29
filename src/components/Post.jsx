import React from 'react'
import Markdown from 'react-remarkable'
import { Link } from 'react-router'
import { fetchPost } from '../DataService'
import Loading from './Loading'

const Post = ({post}) => {
  if (!Object.keys(post).length) {
    return (
      <section className='post'>
        <Loading />
      </section>
    )
  }
  const date = new Date(post.get('date'))
  return (
    <section className='post'>
      <h3><Link to={`/post/${post.get('key')}`}>{post.get('title')}</Link></h3>
      <p className='date'>{date.toLocaleDateString()}</p>
      <Markdown source={post.get('body')} container='div' options={{html:true}}/>
    </section>
  )
}

Post.propTypes = {
  post: React.PropTypes.object,
}

export default Post
