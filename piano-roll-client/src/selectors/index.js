import { createSelector } from 'reselect'

export const getNotes = state => state.music.notesById
export const getInstruments = state => state.music.instrumentsById
export const getTracks = state => state.music.tracks.byId
export const getTrackId = state => state.music.tracks.id
export const getTime = state => state.time.currentTime

export const getCurrentTime = createSelector(
  [getTime],
  time => +(time.toFixed(2))
)

const getTrack = createSelector(
  [getTracks, getTrackId],
  (tracks, trackId) => tracks[trackId]
)

const getInstrument = createSelector(
  [getInstruments, getTrack],
  (instruments, track) => {
    if(track) {
      return instruments[track.instrument]
    }
  }
)

export const getTrackNotes = createSelector(
  [getNotes, getTrack],
  (allNotes, track) => {
    if(track) {
      const l = track.notes.length,
            notes = new Array(l)
      for(let i = 0; i < l; i++) {
        notes[i] = allNotes[track.notes[i]]
      }
      return notes
    }
  }
)

export const getInstrumentName = createSelector(
  [getInstrument],
  instrument => {
    if(instrument) {
      return instrument.name.replace(/ /g,'_').replace(/[()]/g,'')
    }
    return 'clarinet'
  }
)
