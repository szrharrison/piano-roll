import React, { Component } from 'react';
import Soundfont from 'soundfont-player'

import './App.css';
import Note from './components/Note'
import NoteSlot from './components/NoteSlot'
import PianoKeysSidebar from './components/PianoKeysSidebar'
import TimeBar from './components/TimeBar'
import Timer from './api/Timer'
import { fetchSong } from './api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      song: {},
      time: 0
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

  handlePressPlay() {
    var i = this.state.song.duration; //duration in seconds

    //the ATimer below works with time values in milliseconds
    //the "20" will update display ever 20 milliseconds, as fast as screen refreshes
    var timerID = new Timer(i * 1000, 20, this.countDownTick.bind(this))
    timerID.start()
  }

  countDownTick(remaining) {
    this.setState({
      time: parseFloat(remaining.millisecondsToHundredthsString())
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
  ac = Soundfont.instrument(new AudioContext(), 'clarinet')

  renderNotes(pitch) {
    if (this.state.song.title ) {
      let tracks = [...this.state.song.tracks]

      let trackNotes = tracks.map( (track, i) => track.notes )

      let notes = trackNotes[0]
      let noteSlotNotes = notes.filter( note => note.pitch === 139 - pitch )
      let noteComponents = noteSlotNotes.map( (note, i) => <Note key={i} name={note.name} pitch={note.pitch} duration={note.duration} start_time={note.start_time}/>)

      return noteComponents
    }
  }

  render() {

    return (
      <div className="App">
        <div className="notes">
          <PianoKeysSidebar sevenOctavePiano={this.sevenOctavePiano} ac={this.ac} />
          <div className="note-slots">
            {this.sevenOctavePiano.map((pianoKey, i) => {
              return <NoteSlot key={i} dark={pianoKey.search('#') !== -1} width={this.state.song.duration}>
                {this.renderNotes(i)}
              </NoteSlot>
            })}
          </div>
        </div>
        <TimeBar duration={this.state.song.duration} currentTime={this.state.time} onClick={this.handlePressPlay.bind(this)}/>
      </div>
    );
  }
}

export default App;
