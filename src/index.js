import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import App from './Router'
import store from './store'


const render = () => {
  const root = document.getElementById('root')
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    root
  )
}


if (module.hot) {
  module.hot.accept('./Router', () => { render() })
}

document.addEventListener('DOMContentLoaded', render)
