import React from 'react'
import MidiConvert from 'midiconvert'

function SongSelector(props) {

  function handleChange(event) {
    const songID = event.target.value
    props.onChange(songID)
  }

  function handleAdd(event) {
    let reader = new FileReader();
    let file = event.target.files[0];


    reader.onloadend = () => {
      const base64 = reader.result.slice(reader.result.search(/,/) + 1)
      var jsonSong = MidiConvert.parse(atob(base64))
      
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

export default SongSelector
