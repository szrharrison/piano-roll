import Tone from 'tone'
import _ from 'lodash'

import { sevenOctavePiano } from '../concerns/keyboard'

export const notePaths = instrument => {
  let paths = sevenOctavePiano.reduce( (acc, note) => {
    let mp3Note = note
    if( note.search('#') !== -1 ) {
      mp3Note = nextLetter(note[0]) + 'b' + note.substr(2)
    }
    return {
      ...acc,
      [`${instrument}-${note}`]: `https://raw.githubusercontent.com/drumnation/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/${instrument}-mp3/${mp3Note}.mp3`
    }
  }, {})
  return paths
}

class Player {
  constructor() {
    this.playerBuffers = new Tone.Buffers(notePaths('acoustic_grand_piano'))
    this.multiPlayer = new Tone.MultiPlayer(this.playerBuffers).toMaster()
    this.multiPlayer.fadeOut = 0.05
    this.setInstrument('acoustic_grand_piano')
  }

  triggerKey = noteName => {
    try {
      this.multiPlayer.start( `acoustic_grand_piano-${noteName}`, "+0.1", 0, 0.5 )
    }
    catch(err) {} // in case the buffers haven't loaded yet
  }

  addNote = (note, instrument, isLoaded) => {
    try {
      if(isLoaded) {
        this.multiPlayer[`${instrument}-${note.name}`].sync().start(note.start_time, 0, note.duration)
      }
    }
    catch(err) {
      console.error(`%c ${err}`, 'height: 5px;')
    }
  }

  setInstrument = (instrument, playersLoaded) => {
    if(
      /* if none if the buffers have the instrument name as a part of their key
        Note: buffers look like this:
        {
          buffername: Promise       // Resolves as the file being loaded
        }
      */
      _.keys(this.multiPlayer.buffers._buffers).findIndex( key => key.includes(instrument) ) === -1
    ) {
      const paths = notePaths(instrument)
      _.forIn(paths, (url, instrumentNote) => {
        this.multiPlayer.add(instrumentNote, url, () => {
          console.log(`%c ${instrumentNote}`, 'height: 5px;')
          playersLoaded(instrumentNote)
        } )
      })
    }
  }

  play = () => Tone.Transport.start()

  pause = () => Tone.Transport.pause()

  stop = () => Tone.Transport.stop()

  setTimer = callback => Tone.Transport.scheduleRepeat(() => callback(Tone.Transport.seconds), 0.05)
}

const player = new Player()

export default player

function nextLetter(string) {
  return string.replace(/([a-zA-Z])[^a-zA-Z]*$/, letter => {
    let character = letter.charCodeAt(0)
    switch(character){
      case 71: return 'A'
      default: return String.fromCharCode(++character)
    }
  })
}
