import { ButtonGroup, Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <ButtonGroup variant="contained" color="secondary">
      <Link to="/"><Button>Home</Button></Link>
      <Link to="/enter"><Button>Lottery</Button></Link>
    </ButtonGroup>
  )
}
