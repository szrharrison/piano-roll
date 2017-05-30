import React from 'react'
import classSet from 'react-classset'
import PropTypes from 'prop-types'

function NoteSlot(props) {
  const classes = classSet({
    'note-slot': true,
    'dark': props.dark,
    'light': !props.dark
  })
  return (
    <div className={classes}>

    </div>
  )
}

NoteSlot.propTypes = {
  dark: PropTypes.bool.isRequired
}

export default NoteSlot
