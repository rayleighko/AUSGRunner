import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import App from './App'
import * as serviceWorker from './serviceWorker'

import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './redux/modules'

import {Provider} from 'react-redux'

// Redux DevTools
const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
	<Provider store={store} key="provider">
		<App />
	</Provider>,
	document.getElementById('root'))

serviceWorker.unregister()
