import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

  render() {
    let tracks
    if(this.state.song.title) {
      tracks = this.state.song.tracks.map( (track, i) => (
        <li key={i}>
          {track.name}
          <ul>
            {track.notes.map( (note,i) => (
              <li key={i}>{note.name}</li>
            ) )}
          </ul>
        </li>))
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ul className="tracks">
          {tracks}
        </ul>
      </div>
    );
  }
}

export default App;
