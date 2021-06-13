const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { describe, it, beforeEach } = require('mocha')

// the actual contract
const { interface: _interface, bytecode } = require('../compile')

// create a new instance of web3 connected to a new network
const web3 = new Web3(ganache.provider())

let lottery
let accounts
let managerAccount

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  lottery = await new web3.eth
    .Contract(JSON.parse(_interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })
  managerAccount = accounts[0]
})

describe('Lottery contract', () => {
  it('should deploy contract', () => {
    assert.ok(lottery.options.address)
  })
  it('should allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: managerAccount,
      value: web3.utils.toWei('0.02', 'ether')
    })

    const players = await lottery.methods.getPlayers().call({
      from: managerAccount
    })
    assert.deepStrictEqual(managerAccount, players[0])
    assert.deepStrictEqual(players.length, 1)
  })
})
