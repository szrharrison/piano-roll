import React from 'react'
import classSet from 'react-classset'

const wideKeys = ['D', 'A', 'G']

function Key(props) {
  const classes = classSet({
    'black-tut': !props.white,
    'wide': wideKeys.includes(props.name)
  })
    return (
      <li className={classes}>
        <span className="tut">
          {props.name}
        </span>
      </li>)
}

export default Key
