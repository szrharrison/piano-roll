import React from 'react'
import classSet from 'react-classset'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function NoteSlot(props) {
  const classes = classSet({
    'note-slot': true,
    'dark': props.dark,
    'light': !props.dark
  })
  return (
    <div className={classes} style={{width: `${props.duration*200}px`}}>
      {props.children}
    </div>
  )
}

NoteSlot.propTypes = {
  dark: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({duration: state.music.song.duration})

export default connect(mapStateToProps)(NoteSlot)
