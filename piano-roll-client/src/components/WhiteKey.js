import React from 'react'

function WhiteKey(props) {
    return (<li key={props.keyNumber}><span className="tut">{props.keyNumber}</span></li>)
}

export default WhiteKey