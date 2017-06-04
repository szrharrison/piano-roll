import React from 'react'
import FileInput from 'react-file-input'
import midiConverter from 'midi-converter'

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
      var jsonSong = midiConverter.midiToJson(atob(base64))
      console.log(jsonSong)
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
        <FileInput name="midi-file"
          accept=".midi"
          placeholder="Add New Song"
          className="file-input"
          onChange={handleAdd} />
      </form>
    </div>
  )
}

export default SongSelector
