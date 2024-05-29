import { ethers } from 'ethers';

const go = async () => {
	const ABI = [
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "_oracleAddress",
				  "type": "address"
				},
				{
				  "internalType": "string",
				  "name": "_instruction",
				  "type": "string"
				},
				{
				  "internalType": "string",
				  "name": "_name",
				  "type": "string"
				}
			  ],
			  "stateMutability": "nonpayable",
			  "type": "constructor"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "newOracleAddress",
				  "type": "address"
				}
			  ],
			  "name": "OracleAddressUpdated",
			  "type": "event"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "name": "advises",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "proposalId",
				  "type": "uint256"
				}
			  ],
			  "name": "getMessageHistoryContents",
			  "outputs": [
				{
				  "internalType": "string[]",
				  "name": "",
				  "type": "string[]"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "proposalId",
				  "type": "uint256"
				}
			  ],
			  "name": "getMessageHistoryRoles",
			  "outputs": [
				{
				  "internalType": "string[]",
				  "name": "",
				  "type": "string[]"
				}
			  ],
			  "stateMutability": "pure",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "string",
				  "name": "proposal",
				  "type": "string"
				},
				{
				  "internalType": "uint256",
				  "name": "proposalId",
				  "type": "uint256"
				}
			  ],
			  "name": "getProposalAdvise",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "instruction",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "name",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "proposalId",
				  "type": "uint256"
				},
				{
				  "internalType": "string",
				  "name": "response",
				  "type": "string"
				},
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "name": "onOracleLlmResponse",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "oracleAddress",
			  "outputs": [
				{
				  "internalType": "address",
				  "name": "",
				  "type": "address"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "name": "proposals",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "newOracleAddress",
				  "type": "address"
				}
			  ],
			  "name": "setOracleAddress",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			}
	]

	const providerUrl = 'https://devnet.galadriel.com'
	const contractAddress = "0x91e2770cF1E511420AdfbdF668794910101Ecf90"

	const provider = new ethers.providers.JsonRpcProvider(providerUrl);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(contractAddress, ABI, signer);

	const message = "Should Ethereum implement sharding to scale?"

	const transactionResponse = await contract.getProposalAdvise(message, 0);
	const receipt = await transactionResponse.wait();

	console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)
	console.log(`Proposal advise on message: "${message}"`);

	// const response = await contract.advises(0);
	// console.log(response);
}

go();