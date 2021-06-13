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
  managerAccount = accounts[0]
  lottery = await new web3.eth
    .Contract(JSON.parse(_interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Lottery contract', () => {
  describe('Render correctly', () => {
    it('should deploy contract', () => {
      assert.ok(lottery.options.address)
    })
  })

  describe('Happy path', () => {
    it('should allows one account to enter', async () => {
      await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei('0.02', 'ether')
      })
      const players = await lottery.methods.getPlayers().call({
        from: managerAccount
      })
      assert.deepStrictEqual(accounts[1], players[0])
      assert.deepStrictEqual(players.length, 1)
    })

    it('should allows multiple account to enter', async () => {
      const multiplePlayers = accounts.filter((_, index) => index >= 1 && index <= 3)

      await Promise.all(multiplePlayers.map(async (account) => {
        await lottery.methods.enter().send({
          from: account,
          value: web3.utils.toWei('0.02', 'ether')
        })
      }))

      const players = await lottery.methods.getPlayers().call({
        from: managerAccount
      })

      assert.deepStrictEqual(multiplePlayers, players)
      assert.deepStrictEqual(players.length, 3)
    })

    it.skip('Should winner be the player 1', async () => {
      const account = accounts[1]
      const player = accounts[1]
      await lottery.methods.enter().send({
        from: player,
        value: web3.utils.toWei('2', 'ether')
      })
      await lottery.methods.enter().send({
        from: account,
        value: web3.utils.toWei('0.02', 'ether')
      })
      await lottery.methods.pickWinner().send({
        from: managerAccount
      })
      const winner = await lottery.methods.winner().call({
        from: managerAccount
      })
      assert.deepStrictEqual(winner, player)
    })

    it('should send money to the winner and resets the players array', async () => {
      const player = accounts[1]
      await lottery.methods.enter().send({
        from: player,
        value: web3.utils.toWei('2', 'ether')
      })
      await lottery.methods.enter().send({
        from: player,
        value: web3.utils.toWei('2', 'ether')
      })
      const initialBalance = await web3.eth.getBalance(player)
      const initialPlayers = await lottery.methods.getPlayers().call({
        from: managerAccount
      })
      await lottery.methods.pickWinner().send({ from: managerAccount })
      const finalBalance = await web3.eth.getBalance(player)
      const finalPlayers = await lottery.methods.getPlayers().call({
        from: managerAccount
      })
      const difference = finalBalance - initialBalance
      assert.deepStrictEqual(initialPlayers.length, 2)
      assert.deepStrictEqual(finalPlayers.length, 0)
      assert.equal(difference, web3.utils.toWei('4', 'ether'))
    })
  })

  describe('Handle errors', () => {
    it('Requires a minimum amount of ether', async () => {
      const account = accounts[1]
      try {
        await lottery.methods.enter().send({
          from: account,
          value: web3.utils.toWei('0.001', 'ether')
        })
        assert(false)
      } catch (e) {
        assert(e)
      }
    })
    it('Should not allow not manager to call pickWinner', async () => {
      const account = accounts[1]
      try {
        await lottery.methods.pickWinner().send({
          from: account
        })
        assert(false)
      } catch (e) {
        assert(e)
      }
    })
  })
})
