import React from 'react'

function NoteSlot(props) {
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

export default NoteSlot
