import Tone from 'tone'
import _ from 'lodash'

import { sevenOctavePiano } from '../concerns/keyboard'

function notePaths(instrument) {
  let paths = sevenOctavePiano.reduce( (acc, note) => {
    let mp3Note = note
    if( note.search('#') !== -1 ) {
      mp3Note = nextLetter(note[0]) + 'b' + note.substr(2);
    }
    return {
      ...acc,
      [note]: `https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/${instrument}-mp3/${mp3Note}.mp3`
    }
  }, {})
  return paths
}

class Player {
  constructor() {
    this.setInstrument('clarinet')
    this.playerBuffers = new Tone.Buffers(notePaths('acoustic_grand_piano'))
    this.multiPlayer = new Tone.MultiPlayer(this.playerBuffers).toMaster()
    this.multiPlayer.fadeOut = 0.05
  }

  triggerKey = (noteName, duration) => {
    this.multiPlayer.start(noteName, "+0.1", 0, duration)
  }

  addNote = async note => {
    try {
      let addedNote
      addedNote = await this.players[note.name].sync().start(note.start_time, 0, note.duration)
      return addedNote
    } catch (err) {
      console.log(err)
    }
  }

  setInstrument = (instrument) => {
    if(this.instrument !== instrument) {
      console.log(this.players)
      this.instrument = instrument
      const notePathsObject = notePaths(instrument)
      this.players = _.mapValues(notePathsObject, notePath => new Tone.Player({
          url: notePath,
          retrigger: true
        }).toMaster()
      )
    }
  }

  play = () => Tone.Transport.start()

  pause = () => Tone.Transport.pause()

  stop = () => Tone.Transport.stop()

  setTimer = callback => Tone.Transport.scheduleRepeat(() => callback(Tone.Transport.seconds), 0.05)
}

const player = new Player()

export default player

function nextLetter(s){
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
        var c = a.charCodeAt(0)
        switch(c){
            case 71: return 'A'
            default: return String.fromCharCode(++c)
        }
    })
}
