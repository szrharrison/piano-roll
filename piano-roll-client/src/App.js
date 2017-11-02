import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchAllSongs } from './actions/fetchSongsActions'

import './App.css';
import NoteSlot from './components/NoteSlot'
import PianoKeysSidebar from './components/PianoKeysSidebar'
import TimeBar from './components/TimeBar'
import TracksHeader from './components/TracksHeader'
import SongSelector from './components/SongSelector'
import PlayHead from './components/PlayHead'
import { sevenOctavePiano } from './concerns/keyboard'

class App extends Component {
  componentDidMount() {
    this.props.fetchAllSongs()
  }

  render() {
    const l = sevenOctavePiano.length,
          noteSlots = new Array(l)
    for(let i = 0; i < l; i++) {
      noteSlots[i] = (
        <NoteSlot
          key={_.uniqueId('note_slot_')}
          pianoKey={sevenOctavePiano[i]}
          dark={(sevenOctavePiano[i][1] === '#')}
          pitch={108 - i}
        />
      )
    }
    return (
      <div className="App">
        <SongSelector/>
        <TracksHeader/>
        <div className="notes">
          <PianoKeysSidebar/>
          <div className="note-slots">
            <PlayHead/>
            {noteSlots}
            <TimeBar/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {return {song: state.music.song}}

export default connect(mapStateToProps, {fetchAllSongs})(App)
