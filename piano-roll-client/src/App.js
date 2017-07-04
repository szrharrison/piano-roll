import React, { Component } from 'react';
import Tone from 'tone'
import Soundfont from 'soundfont-player'
import { connect } from 'react-redux'

import { fetchAllSongs } from './actions/fetchSongsActions'

import './App.css';
import Note from './components/Note'
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

    this.instrument = 'clarinet'
    // Soundfont.instrument(
    //   this.ac,
    //   'clarinet',
    //   { from: 'https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/' }
    // )
  }

  componentWillUpdate(nextProps) {
    if (nextProps.tracks.id !== this.props.tracks.id ) {
      this.instrument = nextProps.instruments.name
      // Soundfont.instrument( this.ac,
      //   this.tracks[nextState.track].instrument.name.replace(/ /g,"_").replace(/[()]/g,""),
      //   { from: 'https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/' }
      // )
    }
  }

  ac = Tone.context

  renderNotes = (pitch, pianoKey) => {
    if (this.props.song.title ) {
      const notes = this.props.tracks.track.notes.map( note => {
        return this.props.notesById[note]
      })
      let noteSlotNotes = notes.filter( note => note.pitch === 139 - pitch )
      let noteComponents = noteSlotNotes.map( (note, i) => <Note key={`${i}-${note.name}`} name={pianoKey} noteId={note.id} />)

      return noteComponents
    }
  }

  render() {
    return (
      <div className="App">
        <SongSelector/>
        <TracksHeader/>
        <div className="notes">
          <PianoKeysSidebar/>
          <div className="note-slots">
            <PlayHead/>
            {sevenOctavePiano.map((pianoKey, i) => {
              return <NoteSlot key={i} dark={pianoKey.search('#') !== -1}>
                {this.renderNotes(i, pianoKey)}
              </NoteSlot>
            })}
            <TimeBar/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    song: state.music.song,
    tracks: state.music.tracks,
    notesById: state.music.notesById,
    instruments: state.music.instruments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
