import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'
import api from './middlewares/fetch'
import { createStore, applyMiddleware, compose } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer, composeEnhancers(applyMiddleware(
    thunk,
    api,
    logger
  ))
)

if (module.hot) {
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
