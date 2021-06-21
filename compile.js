const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery8.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

// Cambios necesarios para manejar versiones por arriba de sol 5
// Recordar actualizar     "solc": "^0.4.17" => ^0.8.5 si se quire usar la version actualizada del contrato,

// Source https://ethereum.stackexchange.com/questions/86557/solc-js-error-before-each-hook-for-deploys-a-contract-syntaxerror-unexpec
var input = {
    language: 'Solidity',
    sources: {
        'Lottery8.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};
// parses solidity to English and strings 
var output = JSON.parse(solc.compile(JSON.stringify(input)));

var outputContracts = output.contracts['Lottery8.sol']['Lottery']

// exports ABI interface
module.exports.abi = outputContracts.abi;

// exports bytecode from smart contract
module.exports.bytecode = outputContracts.evm.bytecode.object;
