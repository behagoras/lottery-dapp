import React from 'react'
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom'
import './App.css'

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App
