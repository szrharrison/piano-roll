function fetchSong() {
  return fetch('http://localhost:3000/api/v1/songs/1')
    .then( resp => resp.json() )
}

export {
  fetchSong
}
