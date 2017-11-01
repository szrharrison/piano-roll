import { createSelector } from 'reselect'
import Player from '../api/ToneKeyboardHandler'

import { getInstruments } from './'

export const getSong = state => state.music.song

export const getSongForPlayer = createSelector(
  [getSong, getInstruments],
  (song, instruments) => {
    let id
    for(id in instruments) {
      const instrument = instruments[id].name.replace(/ /g,"_").replace(/[()]/g,"")
      Player.addInstrument(instrument)
    }
    return song
  }
)
