import React from 'react'
import PropTypes from 'prop-types'
import classSet from 'react-classset'
import NoteSlot from './NoteSlot'

function NoteBoardSlot(props) {
  const { i } = props
  const dark = (i % 2) === 1

  return (
    <NoteSlot dark={dark}>
      {props.children}
    </NoteSlot>
  )
}

NoteBoardSlot.propTypes = {
  i: PropTypes.number.isRequired
}

export default NoteBoardSlot
