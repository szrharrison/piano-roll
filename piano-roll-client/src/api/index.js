function fetchSong() {
  return fetch('http://localhost:3000/api/v1/songs')
    .then( resp => resp.json() )
    .then( data => data[0] )
}

export {
  fetchSong
}
