import React from 'react'
import { connect } from 'react-redux'
import MidiConvert from 'midiconvert'

import { fetchSingleSong } from '../actions/fetchSongActions'
import { fetchCreateSong } from '../actions/createSongActions'

function SongSelector(props) {

  const handleChange = e => {
    const songID = e.target.value
    props.fetchSingleSong(songID)
  }

  function handleAdd(event) {
    let reader = new FileReader();
    let file = event.target.files[0];


    reader.onloadend = () => {
      const base64 = reader.result.slice(reader.result.search(/,/) + 1)
      var jsonSong = MidiConvert.parse(atob(base64))
      props.createSong(JSON.parse(JSON.stringify(jsonSong)))
    }

    reader.readAsDataURL(file)

  }

  const options = props.songs.map( (song,i) => (
    <option key={i} value={song.id}>
      {song.title}
    </option>
  ))
  return (
    <div className="song-selector clearfix">
      <select onChange={handleChange}>
        <option selected disabled>Select a song from the list</option>
        {options}
      </select>
      <form>
        <input name="midi-file"
          type="file"
          accept=".midi,.mid"
          placeholder="Add a New Song"
          className="file-input"
          onChange={handleAdd} />
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    songs: state.music.allSongs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSingleSong: id => dispatch(fetchSingleSong(id)),
    createSong: song => dispatch(fetchCreateSong(song))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector)
