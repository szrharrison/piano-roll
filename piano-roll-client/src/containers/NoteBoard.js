import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Note from '../components/Note'
import NoteBoardSlot from '../components/NoteBoardSlot'
import { fetchSong } from '../api'
import { moveNote } from '../subscriptions/Composition'

class NoteBoard extends Component {
  constructor(props) {
    super(props)


  }


  renderNote(y) {
    const [noteX, noteY] = this.props.notePosition
    if(y === noteY) {
      return <Note name="A#4" startTime={noteX} />
    }
  }

  renderNoteSlot(i) {
    return (
      <div
        key={i}
        onClick={(event) => this.handleNoteSlotClick(event.clientX, i)}
      >
        <NoteBoardSlot i={i}>
          {this.renderNote(i)}
        </NoteBoardSlot>
      </div>
    );
  }

  handleNoteSlotClick(toX, toY) {
    moveNote(toX, toY);
  }


  render() {
    let noteSlots = []
    for ( let i=0; i < 88; i++ ) {
      noteSlots.push(this.renderNoteSlot(i))
    }
    return (
      <div className="note-board">
        {noteSlots}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(NoteBoard)
