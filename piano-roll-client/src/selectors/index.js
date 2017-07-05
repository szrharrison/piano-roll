import { createSelector } from 'reselect'

const getNotes = state => state.music.notesById
const getInstruments = state => state.music.instrumentsById
const getTracks = state => state.music.tracks.byId
const getTrackId = state => state.music.tracks.id

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
  (notes, track) => {
    if(track) {
      return track.notes.map( noteId => notes[noteId] )
    }
  }
)

export const getInstrumentName = createSelector(
  [getInstrument],
  instrument => {
    if(instrument) {
      return instrument.name.replace(/ /g,"_").replace(/[()]/g,"")
    }
    return 'clarinet'
  }
)
