import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useUserContext } from '../contexts/UserContext'
import web3 from '../utils/web3'

export default function InfoCard(): ReactElement {
  const { balance, players, manager } = useUserContext()
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Lottery contract
          </Typography>
          <Typography variant="h3" component="h2">
            {'Balance to win '}
            <strong>
              {web3.utils.fromWei(balance, 'ether')}
              {' ETH'}
            </strong>
          </Typography>
          <Typography variant="h5" component="p">
            {'Players '}
            {players.length}
          </Typography>
          <Typography variant="caption" component="small">
            {`This contract is managed by ${manager}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  )
}
