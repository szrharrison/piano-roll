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
    arrays = this.flatten( arrays, keyPatternArray).slice(-128)
    return arrays
  }

  flatten( arr, keyPattern ) {
    let n = 0
    return arr.reduce(function(acc, val) {
      const addArr = keyPattern.map( key => `${key}${n}` )
      n += 1
      return addArr.concat( acc )
    }, [])
  }

  oneOctaveKeyPattern = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C' ]
  sevenOctavePiano = this.replicateOctaveKeyPattern(this.oneOctaveKeyPattern, 11)

  renderNotes(pitch) {
    if (this.state.song.title ) {
      let tracks = [...this.state.song.tracks]
      let trackNotes = tracks.map( (track, i) => track.notes )
      let notes = trackNotes.reduce( (acc, trackNotes) => {
        return acc.concat(trackNotes)
      },
      [] )
      let noteSlotNotes = notes.filter( note => note.pitch == pitch )
      console.log(noteSlotNotes)
      let noteComponents = noteSlotNotes.map( (note, i) => <Note key={i} name={note.name} pitch={note.pitch} duration={note.duration} start_time={note.start_time}/>)

      return noteComponents
    }
  }

  render() {

    return (
      <div className="App">
        <div className="notes">
          <PianoKeysSidebar sevenOctavePiano={this.sevenOctavePiano} />
          {this.sevenOctavePiano.map((pianoKey, i) => {
            return <NoteSlot key={i} dark={pianoKey.search('#') !== -1}>
              {this.renderNotes(i)}
            </NoteSlot>
          })}
        </div>
      </div>
    );
  }
}

export default App;
