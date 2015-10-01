import React from 'react'

export default class MainColumn extends React.Component {
  render () {
    return (
      <div className='bio mainColumnContent'>
        <p>
          Ted lives in Portland, Oregon with his wife <a href='http://star-shaped.org'>
          Aubrey</a> and three cats.</p>
        <p>
          By day, he
          works at <a href='http://www.newrelic.com'>New Relic</a> as a software
          engineer. By night he eats all the delicious vegan food and beer in
          the Rose City. He also enjoys coffee before noon (as one does ☕).
        </p>
        <p>
          He's lived in a variety of places: southern California, Santa Cruz, Chicago,
          and the New Hampshire Seacoast
        </p>
      </div>
    )
  }
}
