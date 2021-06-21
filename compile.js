const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

// Cambios necesarios para manejar versiones por arriba de sol 5
// Recordar actualizar     "solc": "^0.4.17" => ^0.8.5 si se quire usar la version actualizada del contrato,

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

module.exports = solc.compile(JSON.stringify(input));
