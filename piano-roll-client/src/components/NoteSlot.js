import React from 'react'
import PropTypes from 'prop-types'
import classSet from 'react-classset'

function NoteSlot(props) {
  const { dark } = props
  const className = {
    'note-slot': true,
    'dark': dark,
    'light': !dark
  }
  return (
    <div className={classSet(className)}>
      {props.children}
    </div>
  )
}

NoteSlot.propTypes = {
  dark: PropTypes.bool.isRequired
}

export default NoteSlot
