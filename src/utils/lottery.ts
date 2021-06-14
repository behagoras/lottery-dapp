import { AbiItem } from 'web3-utils'
import web3 from './web3'

const address = '0x8528086CD01AE463F1137E62232903EBb3eB1c58'
const abi = [
  { 'constant': true,
    'inputs': [],
    'name': 'manager',
    'outputs': [{ 'name': '', 'type': 'address' }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'pickWinner',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  { 'constant': true,
    'inputs': [],
    'name': 'getPlayers',
    'outputs': [{ 'name': '', 'type': 'address[]' }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  { 'constant': false,
    'inputs': [],
    'name': 'enter',
    'outputs': [],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function' },
  { 'constant': true,
    'inputs': [{ 'name': '', 'type': 'uint256' }],
    'name': 'players',
    'outputs': [{ 'name': '', 'type': 'address' },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
]

const lottery = new web3.eth.Contract(abi as AbiItem[], address)

export default lottery
