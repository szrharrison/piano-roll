import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

/* For Test Purposes Only */
import { observe } from './subscriptions/Composition'
import NoteBoard from './containers/NoteBoard'


observe(notePosition =>
  ReactDOM.render(
    <NoteBoard notePosition={notePosition} />,
    document.getElementById('root')
  )
)
registerServiceWorker()
