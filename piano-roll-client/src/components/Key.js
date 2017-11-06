// @flow
import React from 'react'
import classSet from 'react-classset'
import { connect } from 'react-redux'

import { wideKeys } from '../concerns/keyboard'
import Player from '../api/ToneKeyboardHandler'

const handleClick = (key: string) => {
  Player.triggerKey(key, 0.5)
}

function Key(props: {white: boolean, name: string}) {
  const classes = classSet({
    'black-tut': !props.white,
    'wide': wideKeys.find( key => props.name.search( key ) !== -1 )
  })
    return (
      <li className={classes} onClick={ () => handleClick(props.name) }>
        <span className="tut">
          <div>
            <i>
              {props.name}
            </i>
          </div>
        </span>
      </li>)
}

export default connect()(Key)
