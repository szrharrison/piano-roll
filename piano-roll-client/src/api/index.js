function fetchSongs() {
  return fetch('http://localhost:3000/api/v1/songs')
    .then( resp => resp.json() )
}
function fetchSong(songID) {
  return fetch(`http://localhost:3000/api/v1/songs/${songID}`)
    .then( resp => resp.json() )
}

export {
  fetchSong,
  fetchSongs
}
