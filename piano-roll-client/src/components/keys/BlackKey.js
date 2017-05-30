import React from 'react'

function BlackKey(props) {
   return (<li key={props.keyNumber}className="black-tut"><span className="tut">{props.keyNumber}</span></li>)
}

export default BlackKey
