// TODO: Find a way to create players using existing Tone.Buffers (need to wait until after the've loaded)
import Tone from 'tone'

import { sevenOctavePiano } from '../concerns/keyboard'

/**
 * @classdesc Player singleton.
 * @constructor
 */
function Player() {
  /**
   * Converts letters to the next higher letter or cycles when the letter is
   * 'G'
   *
   * @param   {string}    s     The letter to be converted
   * @return  {string}          The next letter
   * @private
   */
  function nextLetter(s){
    let c = s.charCodeAt(0)
    if(c === 71) {
      return 'A'
    }
    return String.fromCharCode(++c)
  }

  /**
   * Takes in an instrument name and returns an object that maps all of the urls
   * needed to load the buffers for that instrument.
   *
   * @param   {string}    instrument    The instrument to create the object
   *                                    from.
   * @return  {Object}    An object with a map of all of the pitches for the
   *                        instrument to the urls needed to load their buffers.
   * @private
   */
  this.notePaths = function(instrument) {
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

  /**
   * Adds a buffer to the list of available buffers for new players to be
   * created from.
   *
   * @param     {string}                  instrument    The name of the
   *                                          instrument the buffer should be
   *                                          created under.
   * @param     {string}                  note          The name of the pitch to
   *                                          be added. (e.g. 'A#3')
   * @param     {string}                  url           The url from which the
   *                                          buffer will load.
   * @param     {Player~BufferCallback}   [cb]          The callback to be
   *                                          executed after the buffer loads.
   * @return    {Tone.Buffer}       The buffer created for that pitch.
   * @private
   */
  this.addBuffer = function(instrument, note, url, callback = Tone.noOp) {
        if(!this.buffers.has(instrument)) {
          this.buffers.set(instrument, new Tone.Buffers())
        }
        this.buffers.get(instrument).add(note, url, callback)
        return this.buffers.get(instrument).get(note)
  }

  /**
   * This is what the addBuffer method's callback will receive.
   *
   * @callback Player~BufferCallback
   */

  /**
   * Adds all buffers for an instrument to the list of available buffers for new
   * players to be created from.
   *
   * @param     {string}    instrument        The name of the instrument the
   *                                          buffers should be created under.
   * @param     {Object}    [notePathsObject]   The object with keys equal to the
   *                                          names of the pitches to be added
   *                                          and values equal to the urls from
   *                                          which the buffers will load.
   *                                          (e.g. 'A#3': 'path/to/Gb3.mp3')
   * @param     {Function}  [callback]          The callback to be executed after
   *                                          all of the buffers load.
   * @return    {Tone.Buffers}    The buffers created for that instrument.
   * @private
   */
  this.addBuffers =
      function(instrument,
               notePathsObject = this.notePaths(instrument),
               callback = Tone.noOp) {
        if(!this.buffers.has(instrument)) {
          this.buffers.set(instrument, new Tone.Buffers(notePathsObject, callback))
        }
        return this.buffers.get(instrument)
  }

  /**
   * All of the instruments available to the player
   * @const {Map} instruments
   */
  this.instruments = new Map()

  /**
   * All of the buffers available to the player
   * @const {Map} buffers
   */
  this.buffers = new Map()
  this.addBuffers('acoustic_grand_piano')

  /**
   * The MultiPlayer for the keyboard sidebar
   * @const {Tone.MultiPlayer} multiPlayer
   */
  this.multiPlayer = new Tone.MultiPlayer(this.buffers.get('acoustic_grand_piano')).toMaster()
  this.multiPlayer.fadeOut = 0.05
}

/**
 * Plays a pitch from the {@link Player#multiPlayer} for a given duration.
 *
 * @param {string} noteName     The name of the pitch to be played.
 * @param {(string|number)} duration  The duration in seconds for the note to be played.
 * @public
 */
Player.prototype.triggerKey = function(noteName, duration) {
  this.multiPlayer.start(noteName, "+0.1", 0, duration)
}

Player.prototype.addNote = function(note) {
  console.log('addNote was run:')
  console.log('instrument buffers before:', this.buffers.get(note.instrument))
  console.log('note buffer before:', this.buffers.get(note.instrument).get(note.name))
  this.buffers.get(note.instrument).get(note.name)._xhr.onload = () => {
    console.log('note buffer after:', this.buffers.get(note.instrument).get(note.name))
    let notePlayer = this.instruments.get(note.instrument)[note.name]
    console.log(notePlayer)
    if(notePlayer.loaded) {
      notePlayer.start(note.start_time, 0, note.duration)
    }
  }
}

Player.prototype.addInstrument = function(instrument) {
  if(!this.instruments.has(instrument)) {
    const notePathsObject = this.notePaths(instrument),
          noteCreator = notePathsObject,
          buffers = this.buffers.get(instrument)
    let noteName

    for(noteName in noteCreator) {
      this.addBuffer(instrument, noteName, notePathsObject[noteName], () => { // eslint-disable-line no-loop-func
        noteCreator[noteName] = function(note) {
          new Tone.Player({
            url: buffers.get(noteName),
            retrigger: true
          }).toMaster().sync()
        }
      })
    }
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
