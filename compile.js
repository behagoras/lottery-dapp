const path = require('path')
const fs = require('fs')
const solc = require('solc')

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery8.sol')
const source = fs.readFileSync(lotteryPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Lottery8.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
}
const output = JSON.parse(solc.compile(JSON.stringify(input)))

const outputContracts = output.contracts['Lottery8.sol']['Lottery']

// exports ABI interface
module.exports.abi = outputContracts.abi

// exports bytecode from smart contract
module.exports.bytecode = outputContracts.evm.bytecode.object
