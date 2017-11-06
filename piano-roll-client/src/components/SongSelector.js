// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import MidiConvert from 'midiconvert'

import { fetchSingleSong } from '../actions/fetchSongActions'
import { fetchCreateSong } from '../actions/createSongActions'

type Props = {
  fetchSingleSong: Function,
  createSong: Function,
  songs: {id: number, title: string}[]
}

type State = {
  selected: 'default' | number
}

class SongSelector extends React.Component<Props, State> {
  state = {
    selected: 'default'
  }

  handleChange = e => {
    const songID = e.target.value
    this.setState({
      selected: songID
    })
    this.props.fetchSingleSong(songID)
  }

  handleAdd = e => {
    let reader = new FileReader();
    let file = e.target.files[0];


    reader.onloadend = () => {
      // $FlowFixMe
      const base64 = reader.result.slice(reader.result.search(/,/) + 1)
      // $FlowFixMe
      var jsonSong = MidiConvert.parse(atob(base64))
      this.props.createSong(JSON.parse(JSON.stringify(jsonSong)))
    }

    reader.readAsDataURL(file)
  }

  render() {
    const options = this.props.songs.map( song => (
      <option key={`song_${song.id}`} value={song.id}>
        {song.title}
      </option>
    ))
    return (
      <div className="song-selector clearfix">
        <select value={this.state.selected} onChange={this.handleChange}>
          <option value='default' disabled>Select a song from the list</option>
          {options}
        </select>
        <form>
          <input name="midi-file"
            type="file"
            accept=".midi,.mid"
            placeholder="Add a New Song"
            className="file-input"
            onChange={this.handleAdd} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({songs: state.music.allSongs})

export default connect(mapStateToProps, {fetchSingleSong, fetchCreateSong})(SongSelector)
