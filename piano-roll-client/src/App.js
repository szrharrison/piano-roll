import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from '../src/components/Note'

import { fetchSong } from './api'
import Note from './components/Note'

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

  render() {

    let notes
    if (this.state.song.title) {
      notes = this.state.song.tracks.map( (track, i) => track.notes.map( (note,i) => <Note key={i} name={note.name} pitch={note.pitch} duration={note.duration} start_time={note.start_time}/>))
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="notes">
          {notes}
        </div>
      </div>
    );
  }
}

export default App;
