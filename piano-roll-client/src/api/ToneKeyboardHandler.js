import Tone from 'tone'

import { sevenOctavePiano } from '../concerns/keyboard'

function notePaths(instrument) {
  console.log('notePaths was run')
  const paths = {},
        l = sevenOctavePiano.length

  for(let i = 0; i < l; i++) {
    let note = sevenOctavePiano[i],
        mp3Note = note
    if(note[1] === '#') {
      mp3Note = nextLetter(note[0]) + 'b' + note[2]
    }
    paths[note] =  `https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/${instrument}-mp3/${mp3Note}.mp3`
  }
  return paths
}

function Player() {
  this.instruments = new Map()
  this.buffers = new Map()
  this.addBuffers('acoustic_grand_piano')
  this.multiPlayer = new Tone.MultiPlayer(this.buffers.get('acoustic_grand_piano')).toMaster()
  this.multiPlayer.fadeOut = 0.05
}
Player.prototype.triggerKey = function(noteName, duration) {
  this.multiPlayer.start(noteName, "+0.1", 0, duration)
}

Player.prototype.addNote = function(note) {
  console.log('addNote was run')
  Tone.Buffer.on('load', () => {
    let notePlayer = this.instruments.get(note.instrument)[note.name](note)
    console.log(notePlayer)
    if(notePlayer.loaded) {
      notePlayer.start(note.start_time, 0, note.duration)
    }
  })
}

Player.prototype.addBuffers =
    function(instrument, notePathsObject = notePaths(instrument), callback = Tone.noOp) {
      if(!this.buffers.has(instrument)) {
        this.buffers.set(instrument, new Tone.Buffers(notePathsObject, callback))
      }

      return this.buffers.get(instrument)
}

Player.prototype.addInstrument = function(instrument) {
  if(!this.instruments.has(instrument)) {
    const notePathsObject = notePaths(instrument),
          noteCreator = notePathsObject,
          callback = () => {
            const buffers = this.buffers.get(instrument)
            let noteName

            for(noteName in noteCreator) {
              noteCreator[noteName] = function(note) {  // eslint-disable-line no-loop-func
                return new Tone.Player({
                  url: buffers.get(noteName),
                  retrigger: true
                }).toMaster().sync()
              }
            }
          }

    this.addBuffers(instrument, notePathsObject, callback)
    this.instruments.set(instrument, noteCreator)
  }
  console.log(this.instruments)
}
Player.prototype.play = function() {
  Tone.Transport.start()
}

Player.prototype.pause = function() {
  Tone.Transport.pause()
}

Player.prototype.stop = function() {
  Tone.Transport.stop()
}

Player.prototype.setTimer = function(callback) {
  Tone.Transport.scheduleRepeat(
    () => callback(Tone.Transport.seconds),
    0.05
  )
}

const player = new Player()

export default player

function nextLetter(s){
  let c = s.charCodeAt(0)
  if(c === 71) {
    return 'A'
  }
  return String.fromCharCode(++c)
}
