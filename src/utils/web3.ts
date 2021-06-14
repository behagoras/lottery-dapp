import Web3 from 'web3'

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        ethereum:any;
    }
}

window.ethereum.request({ method: 'eth_requestAccounts' })
const web3 = new Web3(window.ethereum)
export default web3
