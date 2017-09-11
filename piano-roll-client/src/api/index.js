export function fetchSongsRequest() {
  return fetch('http://localhost:3001/api/v1/songs')
    .then( resp => resp.json() )
}
export function fetchSongRequest(songID) {
  return fetch(`http://localhost:3001/api/v1/songs/${songID}`)
    .then( resp => resp.json() )
}
export function createSong(songJson) {
  console.log(songJson)
  return fetch('http://localhost:3001/api/v1/songs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({song: songJson})
  }).then( resp => resp.json() )
}
