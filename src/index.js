import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import AsyncApp from './components/App'
import './style.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const store = configureStore()

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={AsyncApp} />
    </Router>
  </Provider>, document.getElementById('root'))
