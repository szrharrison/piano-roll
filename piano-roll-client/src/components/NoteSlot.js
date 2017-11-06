// @flow
import React from 'react'
import classSet from 'react-classset'
import { connect } from 'react-redux'
import _ from 'lodash'

import getNotesByPitch from '../selectors/noteSlotsSelectors'
import Note from './Note'

function NoteSlot(
  props: {
    dark: boolean,
    duration: number,
    pianoKey: string,
    notes: {id: string}[]
  }
) {
  const classes = classSet({
    'note-slot': true,
    'dark': props.dark
  })
  return (
    <div className={classes} style={{width: `${props.duration*200}px`}}>
      {props.notes
        ?
          props.notes.map( (note, i) => (
            <Note
              key={_.uniqueId('note_')}
              name={props.pianoKey}
              noteId={note.id}
            />
          ))
        :
        null
      }
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    duration: state.music.song.duration,
    notes: getNotesByPitch(state, ownProps)
  }
}

export default connect(mapStateToProps)(NoteSlot)
