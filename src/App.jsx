import React from 'react'

export default class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1>Ted Pennings</h1>
        <Photo />
        <MainColumn />
      </div>
    )
  }
}

class Photo extends React.Component {
  render () {
    return (
      <div className='photoColumn'>
        <div className='photo'>
          <img src='https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xap1/t31.0-8/11230038_10101866199992118_4527573528514668511_o.jpg' />
        </div>
      </div>
    )
  }
}

class MainColumn extends React.Component {
  render () {
    return (
      <div className='mainColumn'>
        <ContactInfo />
        <p>Ted does not know what to write here.</p>
      </div>
    )
  }
}

class ContactInfo extends React.Component {
  render () {
    return (
      <div className='linkArea'>
        <ul>
          <li><a href='https://twitter.com/thesleepyvegan'>Twitter</a></li>
          <li><a href='https://github.com/tedpennings'>GitHub</a></li>
          <li><a href='https://www.linkedin.com/in/tedpennings'>LinkedIn</a></li>
        </ul>
      </div>
    )
  }
}
