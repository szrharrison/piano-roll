import React from 'react'
import WebMidi from 'web-midi'

export const PlayNote = (props) => {
    console.log('got here 2', props)
    WebMidi.enable(function (err) {
        console.log(WebMidi.inputs);
        console.log(WebMidi.outputs);
    })

    var output = WebMidi.outputs[0]
    console.log(output)

    return (
        <div>
            {console.log('got here 2', props)}
            {output.playNote("C3")}            
        </div>
    )
}




