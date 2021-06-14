import React from 'react'
import { Route, Switch } from 'react-router-dom'
import EnterLottery from '../pages/EnterLottery'
import Home from '../pages/Home'

export default function Routes() {
  return (
    <Switch>
      <Route path="/enter">
        <EnterLottery />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}
