import React, { ReactElement } from 'react'
import InfoCard from '../components/InfoCard'
import LotteryForm from '../components/LotteryForm'
import PickAWinner from '../components/PickAWinner'

export default function EnterLottery(): ReactElement {

  return (
    <>
      <InfoCard />
      <LotteryForm />
      <PickAWinner />
    </>
  )
}
