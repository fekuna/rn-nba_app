import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './src/store/reducers'

const composeEnhancher = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createStoreWithMiddleware = createStore(reducers, composeEnhancher(applyMiddleware(thunk)))

const appRedux = () => (
	<Provider store={createStoreWithMiddleware}>
		<App />
	</Provider>
)

AppRegistry.registerComponent(appName, () => appRedux)
