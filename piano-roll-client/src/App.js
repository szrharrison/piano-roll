import React, { Component } from 'react';
import './App.css';
import Note from './components/Note'
import NoteSlot from './components/NoteSlot'
import PianoKeysSidebar from './components/PianoKeysSidebar'

import { fetchSong } from './api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      song: {}
    }
  }

  componentDidMount() {
    fetchSong()
      .then( song => {
        this.setState({
          song: song
        })
    })
  }

  replicateOctaveKeyPattern(keyPatternArray, numTimes) {
    let arrays = Array.apply(null, new Array(numTimes))
    arrays = arrays.map(() => keyPatternArray )
    return [].concat.apply([], arrays)
  }



  render() {
    // let notes
    // if (this.state.song.title) {
    //   notes = this.state.song.tracks.map( (track, i) => track.notes.map( (note,i) => <Note key={i} name={note.name} pitch={note.pitch} duration={note.duration} start_time={note.start_time}/>))
    // }

    const oneOctaveKeyPattern = ['E', 'D#', 'D', 'C#', 'C', 'B', 'A#', 'A', 'G#', 'G', 'F#', 'F' ]
    const whiteKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const blackKeys = ['A#', 'C#', 'D#', 'F#', 'G#']
    const sevenOctavePiano = this.replicateOctaveKeyPattern(oneOctaveKeyPattern, 13)

    return (
      <div className="App">
        <div className="notes">
          <PianoKeysSidebar sevenOctavePiano={sevenOctavePiano} whiteKeys={whiteKeys}/>
          {sevenOctavePiano.map((pianoKey, i) => <NoteSlot dark={blackKeys.includes(pianoKey)} />)}
        </div>
      </div>
    );
  }
}

export default App;
