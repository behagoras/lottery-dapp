const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface: _interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'flock minimum square actor hospital road picture spy ball achieve net blood',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c',
  // remember to change this to your own endpoint!
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(_interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] })

  console.log(JSON.stringify({ _interface }, null, 2))
  console.log('Contract deployed to', result.options.address)
}
deploy()
