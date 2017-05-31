import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Child from './pages/schedule'
import Wrap from './components/wrap'


export default function App() {
  return (
    <Router>
      <Wrap>
        <Route exact path="/" component={Home} />
        <Route path="/schedule" component={Child} />
      </Wrap>
    </Router>
  )
}
