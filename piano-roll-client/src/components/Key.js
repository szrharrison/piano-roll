import React from 'react'
import classSet from 'react-classset'
import { connect } from 'react-redux'

import { wideKeys } from '../concerns/keyboard'
import {triggerNote} from '../api/ToneKeyboardHandler'

const handleClick = (instrument, key) => {
  triggerNote(key, instrument, 0.5)
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

const mapStateToProps = state => ({instrument: state.music.instruments.name})

export default connect(mapStateToProps)(Key)
