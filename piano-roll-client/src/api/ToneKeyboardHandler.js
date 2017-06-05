import Tone from 'tone'

import { sevenOctavePiano } from '../concerns/keyboard'

function notePaths(instrument) {
  let paths = sevenOctavePiano.reduce( (acc, note) => {
    let mp3Note = note
    if( note.search('#') !== -1 ) {
      mp3Note = nextLetter(note[0]) + 'b' + note.substr(2);
    }
    return Object.assign(acc, {[note]: `https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/${instrument}-mp3/${mp3Note}.mp3`})
  }, {})
  return paths
}

export function getNotes(instrument) {
  // return notePaths(instrument).( path => new Tone.Buffer().load(path))
}

const player = new Tone.Player({
    retrigger : true
  }).toMaster()

export function triggerNote(noteName, instrument, duration){
  console.log(noteName, instrument)
  player.buffer.load(notePaths(instrument)[noteName], () => playerStart() )
}

function playerStart(duration) {
  player.start(0,0,duration)
}

function nextLetter(s){
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
        var c = a.charCodeAt(0)
        switch(c){
            case 71: return 'A'
            default: return String.fromCharCode(++c)
        }
    })
}
