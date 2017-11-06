// @flow
import Tone from 'tone'

import { sevenOctavePiano } from '../concerns/keyboard'

declare class Player {
  triggerKey: (string, number) => void,
  addTrack: ({name: string}, {
    instrument: string,
    name: string,
    duration: number
  }[]) => void,
  addInstrument: (string) => void,
  play: () => void,
  pause: () => void,
  stop: () => void,
  setTimer: (Function) => void
}

/**
 * @classdesc Player singleton.
 * @constructor
 */
function Player() { // eslint-disable-line
  /**
   * Converts letters to the next higher letter or cycles when the letter is
   * 'G'
   *
   * @param   {string}    s     The letter to be converted
   * @return  {string}          The next letter
   * @private
   */
  function nextLetter(s: string): string{
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
  this.notePaths = function notePaths(instrument: string): {[key: string]: string} {
    const paths = {},
          l = sevenOctavePiano.length

    for(let i: number = 0; i < l; i++) {
      let note: string = sevenOctavePiano[i],
          mp3Note: string = note
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
  this.addBuffer = function addBuffer(
    instrument: string,
    note: {name: string},
    url: string,
    callback?: () => mixed = Tone.noOp
  ): Tone.Buffer {
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
  this.addBuffers = function addBuffers(
      instrument: string,
      notePathsObject?: {[key: string]: string} = this.notePaths(instrument),
      callback?: () => mixed = Tone.noOp
    ): Tone.Buffers {
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

  /**
   * All of the tracks available to the player
   * @const {Map} tracks
   */
  this.tracks = new Map()
}

/**
 * Plays a pitch from the {@link Player#multiPlayer} for a given duration.
 *
 * @param {string} noteName     The name of the pitch to be played.
 * @param {(string|number)} duration  The duration in seconds for the note to be played.
 * @public
 */
Player.prototype.triggerKey =
  function triggerKey(
    noteName: string,
    duration: number
  ) {
    this.multiPlayer.start(noteName, "+0.1", 0, duration)
}

Player.prototype.addTrack =
  function addTrack(
    track: {name: string},
    notes: {
      instrument: string,
      name: string,
      duration: number
    }[]
  ) {
    if(!this.tracks.has(track.name)) {
      if(notes.length) {
        this.addInstrument(notes[0].instrument)
      }
      this.tracks.set(track.name, new Tone.Part(function(time, note) {
        this.instruments.get(note.instrument).start(note.name, time, 0, note.duration)
      }, notes))
    }
}

Player.prototype.addInstrument =
  function addInstrument(instrument: string) {
    if(!this.instruments.has(instrument)) {
      const buffers = this.addBuffers(instrument),
            instrumentPlayer = new Tone.MultiPlayer(buffers).toMaster()
      this.instruments.set(instrument, instrumentPlayer)
    }
}

Player.prototype.play = function play() {
  Tone.Transport.start('+0.1')
}

Player.prototype.pause = function pause() {
  Tone.Transport.pause()
}

Player.prototype.stop = function stop() {
  Tone.Transport.stop()
}

Player.prototype.setTimer = function setTimer(callback: (number) => mixed) {
  function setTimerCallback() {callback(Tone.Transport.seconds)}
  function setTimerDrawCallback(time: number) {
    Tone.Draw.schedule(setTimerCallback, time)
  }
  Tone.Transport.scheduleRepeat(
    setTimerDrawCallback,
    0.05
  )
}

export default new Player()
