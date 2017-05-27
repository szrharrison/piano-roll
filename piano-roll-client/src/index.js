import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

/* For Test Purposes Only */
import NoteBoard from './containers/NoteBoard'

ReactDOM.render(<NoteBoard />, document.getElementById('root'));
registerServiceWorker();
