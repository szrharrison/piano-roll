let notePosition = [0, 0]
let observer = null

function emitChange() {
  observer(notePosition)
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function moveNote(toX, toY) {
  notePosition = [toX, toY]
  emitChange()
}
