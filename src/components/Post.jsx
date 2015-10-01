import React from 'react'

export default class MainColumn extends React.Component {
  render () {
    const postKey = this.props.params.key
    return (
      <div>
        <h3>Post content for {postKey}</h3>
        <p>State:</p>
        <pre>
          {JSON.stringify(this.props, null, 4)}
        </pre>
      </div>
    )
  }
}
