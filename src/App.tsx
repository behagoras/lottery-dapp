import { Container } from '@material-ui/core'
import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Routes from './components/Routes'
import { UserProvider } from './contexts/UserContext'
import web3 from './utils/web3'

console.log(web3.version)

web3.eth.getAccounts().then(console.log)

export default function App() : JSX.Element {
  return (
    <UserProvider>
      <Router>
        <Container fixed>
          <Header />
          <Routes />
        </Container>
      </Router>
    </UserProvider>
  )
}

