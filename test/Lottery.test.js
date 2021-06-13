const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

// the actual contract
const {interface, bytecode} = require('../compile')

// create a new instance of web3 connected to a new network
const web3 = new Web3(ganache.provider())

let lottery
let accounts

beforeEach(async ()=>{
  accounts = await web3.eth.getAccounts()
  lottery = await new web3.eth
    .Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({ from: accounts[0], gas: '1000000' })
  console.log('testing')
})

describe('Lottery contract',()=>{
  it('should deploy contract',()=>{
    assert.ok(lottery.options.address)
  })
})