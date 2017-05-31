import React, { Component } from 'react'

class Note extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return (nextProps.start_time - nextProps.currentTime) < 0.05 && (nextProps.start_time - nextProps.currentTime) > 0
  // }

  render() {
    if ((this.props.start_time - this.props.currentTime) < 0.05 && (this.props.start_time - this.props.currentTime) > 0) {
      this.props.instrument.then(instrument => {
        instrument.play(this.props.pitch, this.props.instrument.currentTime, { duration: this.props.duration})
      })
    }
    const noteStyle = {
      left: `${Math.round(this.props.start_time * 200) + 4}px`,
      width: `${Math.round(this.props.duration * 200)}px`
    }
    return (
      <div className="note" style={noteStyle}>
        <span>
          {this.props.name}
        </span>
      </div>
    )
  }
}

export default Note
