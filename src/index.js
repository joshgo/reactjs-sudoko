import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BoardViewModel from './BoardViewModel'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BoardViewModel width="9" height="9" pixels="75" />, document.getElementById('root'));
registerServiceWorker();
