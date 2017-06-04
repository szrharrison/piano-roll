import React, { Component } from 'react';
import Tone from 'tone'
import Soundfont from 'soundfont-player'

import './App.css';
import Note from './components/Note'
import NoteSlot from './components/NoteSlot'
import PianoKeysSidebar from './components/PianoKeysSidebar'
import TimeBar from './components/TimeBar'
import { fetchSong, fetchSongs } from './api'
import Timer from './api/Timer'
import TracksHeader from './components/TracksHeader'
import SongSelector from './components/SongSelector'
import { sevenOctavePiano } from './concerns/keyboard'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songs: [],
      song: {},
      time: 0,
      playing: false,
      paused: true,
      track: 1,
    }

    this.countDownTick = this.countDownTick.bind(this)
    this.handlePressPlay = this.handlePressPlay.bind(this)
    this.handleSwitchTrack = this.handleSwitchTrack.bind(this)
    this.handleSelectSong = this.handleSelectSong.bind(this)
  }

  componentDidMount() {
    fetchSongs()
      .then( songs => {
        this.setState({
          songs: songs
        })
    })

    this.instrument = 'clarinet'
    // Soundfont.instrument(
    //   this.ac,
    //   'clarinet',
    //   { from: 'https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/' }
    // )
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.track !== this.state.track ) {
      this.instrument = this.tracks[nextState.track].instrument.name.replace(/ /g,"_").replace(/[()]/g,"")
      // Soundfont.instrument( this.ac,
      //   this.tracks[nextState.track].instrument.name.replace(/ /g,"_").replace(/[()]/g,""),
      //   { from: 'https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/' }
      // )
    }
    if (nextState.song.id !== this.state.song.id) {
      this.tracks = [...nextState.song.tracks].reduce( (acc, track) => {
        return Object.assign(acc, { [track.id]: {instrument: track.instrument, notes: track.notes} })
      }, {} )
    }
  }

  handleSwitchTrack(trackId) {
    this.setState({
      track: trackId
    })
  }

  handleSelectSong(songID) {
    fetchSong(songID)
      .then( song => {
        console.log(song)
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
        this.setState({ paused: false })
        this.timer.pauseResume()
      } else {
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

  ac = Tone.context

  renderNotes(pitch) {
    if (this.state.song.title ) {

      let notes = this.tracks[this.state.track].notes
      let noteSlotNotes = notes.filter( note => note.pitch === 139 - pitch )
      let noteComponents = noteSlotNotes.map( (note, i) => <Note key={i} name={note.name} pitch={note.pitch} duration={note.duration} start_time={note.start_time} currentTime={this.state.time} instrument={this.instrument} />)

      return noteComponents
    }
  }

  render() {
    const playheadStyle = {width: this.state.time * 200}
    return (
      <div className="App">
        <SongSelector songs={this.state.songs} onChange={this.handleSelectSong} />
        <TracksHeader track={this.state.track} tracks={this.state.song.tracks} onClick={this.handleSwitchTrack} />
        <div className="notes">
          <PianoKeysSidebar sevenOctavePiano={sevenOctavePiano} instrument={this.instrument} />
          <div className="note-slots">
            <div className="play-head" style={playheadStyle}>{this.props.currentTime}</div>
            {sevenOctavePiano.map((pianoKey, i) => {
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
