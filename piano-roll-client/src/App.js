import React, { Component } from 'react';
import Soundfont from 'soundfont-player'

import './App.css';
import Note from './components/Note'
import NoteSlot from './components/NoteSlot'
import PianoKeysSidebar from './components/PianoKeysSidebar'
import TimeBar from './components/TimeBar'
import { fetchSong } from './api'
import Timer from './api/Timer'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      song: {},
      time: 0,
      playing: false,
      paused: true
    }

    this.countDownTick = this.countDownTick.bind(this)
    this.handlePressPlay = this.handlePressPlay.bind(this)
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
    if(!this.state.playing) {
      this.timer = new Timer(this.state.song.duration, this.countDownTick)
      this.timer.start()
      this.setState({
        playing: true,
        paused: false
      })
    } else {
      if(this.state.paused) {
        console.log('Resuming timer')
        this.setState({ paused: false })
        this.timer.pauseResume()
      } else {
        console.log('Pausing timer')
        this.setState({ paused: true })
        this.timer.pauseResume()
      }
    }
  }

  countDownTick(passed) {
    this.setState(prevState => {
      return {
        time: passed / 20
      }
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
      let noteComponents = noteSlotNotes.map( (note, i) => <Note key={i} name={note.name} pitch={note.pitch} duration={note.duration} start_time={note.start_time} currentTime={this.state.time} ac={this.ac} />)

      return noteComponents
    }
  }

  render() {
    const playheadStyle = {width: this.state.time * 200}
    return (
      <div className="App">
        <div className="notes">
          <PianoKeysSidebar sevenOctavePiano={this.sevenOctavePiano} ac={this.ac} />
          <div className="note-slots">
            <div className="play-head" style={playheadStyle}>{this.props.currentTime}</div>
            {this.sevenOctavePiano.map((pianoKey, i) => {
              return <NoteSlot key={i} dark={pianoKey.search('#') !== -1} width={this.state.song.duration}>
                {this.renderNotes(i)}
              </NoteSlot>
            })}
            <TimeBar duration={this.state.song.duration} currentTime={this.state.time} onClick={this.handlePressPlay} playing={this.state.playing} paused={this.state.paused} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
