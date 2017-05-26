import React, { Component } from 'react'

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pitch: props.pitch,
      duration: props.duration,
      start_time: props.start_time
      // velocity: props.velocity
    }
  }

  render() {
    console.log(`${Math.round(this.state.pitch)}`)

    const noteStyle = {
      top: `${Math.round(this.state.pitch * 30)}` + 'px',
      left: `${Math.round(this.state.start_time * 500)}` + 'px',
      width: `${Math.round(this.state.duration * 400)}` + 'px'
    }

    return (
      <div key={this.props.key} className="note" style={noteStyle}>
        {this.props.name}
      </div>
    )
  }
}

export default Note
