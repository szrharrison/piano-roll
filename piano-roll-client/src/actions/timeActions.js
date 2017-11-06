// @flow
export function passTime(currentTime: number) {
  return {
    type: 'time.PASS_TIME',
    time: currentTime
  }
}

export function pausePlay() {
  return {
    type: 'time.PAUSE_PLAY',
    field: 'paused'
  }
}

export function startTime() {
  return {
    type: 'time.START_TIME'
  }
}

export function stopTime() {
  return {
    type: 'time.STOP_TIME'
  }
}
