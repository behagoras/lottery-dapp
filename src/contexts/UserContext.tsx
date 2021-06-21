
import React, { useContext } from 'react'
import lottery from '../utils/lottery'
import web3 from '../utils/web3'

export const UserContext = React.createContext({
  manager: '',
  players: [] as string[],
  balance: '',
  setManager: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  setPlayers: (() => {}) as React.Dispatch<React.SetStateAction<string[]>>,
  setBalance: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
})

export const useUserContext = () => useContext(UserContext)

export const useStylovyzeForm = () => {
  const stylovyzeForm = useUserContext()
  return stylovyzeForm
}

const buildFetchInitialData = ({
  setBalance, setManager, setPlayers,
}:{
  setManager: React.Dispatch<React.SetStateAction<string>>;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  setBalance: React.Dispatch<React.SetStateAction<string>>
}) => {
  const fetchInitialData = async () => {
    const _manager = await lottery.methods.manager().call()
    const _players = await lottery.methods.getPlayers().call()
    const _balance = await web3.eth.getBalance(lottery.options.address)
    setManager(_manager)
    setPlayers(_players)
    setBalance(_balance)
  }
  const callFetchInitialData = () => {
    fetchInitialData()
  }
  return callFetchInitialData
}

export const useFetchInitialData = () => {
  const { setManager, setPlayers, setBalance } = useUserContext()
  const fetchInitialData = buildFetchInitialData({ setBalance, setManager, setPlayers })
  return fetchInitialData
}

export const UserProvider = ({ children }:{children:React.ReactNode}) => {
  const [manager, setManager] = React.useState('')
  const [players, setPlayers] = React.useState<string[]>([])
  const [balance, setBalance] = React.useState('')
  const fetchInitialData = buildFetchInitialData({ setBalance, setManager, setPlayers })
  React.useEffect(() => {
    fetchInitialData()
  }, [])
  return (
    <UserContext.Provider
      value={{ manager, setManager, players, setPlayers, balance, setBalance }}
    >
      {children}
    </UserContext.Provider>
  )
}

