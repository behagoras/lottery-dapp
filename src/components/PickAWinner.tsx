import { Button, Card, CardContent } from '@material-ui/core'
import React from 'react'
import { useFetchInitialData } from '../contexts/UserContext'
import lottery from '../utils/lottery'
import web3 from '../utils/web3'

export default function PickAWinner() {
  const fetchInitialData = useFetchInitialData()
  const pickWinner = async () => {
    const accounts = await web3.eth.getAccounts()
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    })
    await fetchInitialData()
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <h4>Ready to pick a winner?</h4>
        <Button variant="contained" color="primary" type="button" onClick={pickWinner}>Pick a winner</Button>
      </CardContent>
    </Card>
  )
}
