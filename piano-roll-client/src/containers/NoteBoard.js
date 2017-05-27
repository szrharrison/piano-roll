import React, { Component } from 'react'

import Note from '../components/Note'
import NoteSlot from '../components/NoteSlot'

class NoteBoard extends Component {
  constructor(props) {
    super(props)


  }


  renderNoteSlot(x, y) {
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    const note = (x === knightX && y === knightY) ?
      <Note /> :
      null;

    return (
      <NoteSlot>
        {note}
      </NoteSlot>
    );
  }


  render() {
    return (
      <div className="note-board">
        <NoteSlot>
          <Note name="A#4" />
        </NoteSlot>
      </div>
    )
  }
}

export default NoteBoard
