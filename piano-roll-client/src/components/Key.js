import React from 'react'
import classSet from 'react-classset'

const wideKeys = ['D[0-9]', 'A[0-9]', 'G[0-9]']

const handleClick = (instrument, key) => {
  instrument.then(function(clarinet) {
    clarinet.play(key, instrument.currentTime, { duration: 0.5})
  })
}

function Key(props) {
  const classes = classSet({
    'black-tut': !props.white,
    'wide': wideKeys.find( key => props.name.search( key ) !== -1 )
  })
    return (
      <li className={classes} onClick={ () => handleClick(props.instrument, props.name) }>
        <span className="tut">
          <div>
            <i>
              {props.name}
            </i>
          </div>
        </span>
      </li>)
}

export default Key
