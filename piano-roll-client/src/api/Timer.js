let timerId = 0
class Timer {
  constructor(duration, callback) {
    this.currentTime = 0
    this.paused = false
    this.duration = duration
    this.callback = callback
    this.start = () => this.play(callback)
    this.id = timerId
    timerId += 1
  }

  play(callback) {
    this.currentTime++
    if (this.currentTime / 20 <= this.duration) {
      callback(this.currentTime)
      this.timer = setTimeout( () => this.play(callback), 50)
    }
  }

  pauseResume(){
    clearTimeout(this.timer)
    this.paused = !this.paused
    if (!this.paused) {
      this.play(this.callback)
    }
  }

}

export default Timer
