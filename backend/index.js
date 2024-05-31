// index.js

// - get proposals for x daos
// - throw proposals into galadriel contract
// - get result from galadriel contract and put it in json
// - (vote on proposal)
// - execute lit code every x minutes

const express = require('express');
const cron = require('node-cron');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
const port = 3000;

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const callGaladriel = async () => {
	const abi = [
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
	];
	const providerUrl = 'https://devnet.galadriel.com';
	const contractAddress = "0x91e2770cF1E511420AdfbdF668794910101Ecf90";

	const provider = new ethers.JsonRpcProvider(providerUrl);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
	const signer = wallet.connect(provider);
	const contract = new ethers.Contract(contractAddress, abi, signer);

	const message = "Should Ethereum implement sharding to scale?"

	const transactionResponse = await contract.getProposalAdvise(message, 0);
	const receipt = await transactionResponse.wait();

	console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)
	console.log(`Proposal advise on message: "${message}"`);
}

const getProposalData = async () => {
	// get list of proposals
	  const query = `
		query ProposalsV2($input: ProposalsInput!) {
			proposalsV2(input: $input) {
			nodes {
				... on ProposalV2 {
						id
						metadata {
							description
					}
				}
			}
			pageInfo {
				firstCursor
				lastCursor
				count
			}
			}
		}
	  `;
	  const variables = {
		chainId: "eip155:1",
		pagination: { limit: 1, offset: 0 },
		sort: { field: "START_BLOCK", order: "DESC" },

		input: {
			filters: {
					governorId: "eip155:1:0x323A76393544d5ecca80cd6ef2A560C6a395b7E3"
			},
			page: {
			  limit: 1
			},
			sort: {
			  isDescending: true,
			  sortBy: "id"
			}
		  }
	  }; 
	  const url = 'https://api.tally.xyz/query';
	  const apiKey = process.env.TALLY_API_KEY; // Replace with your actual API key
	  
	  const response = await fetch(url, {
		method: 'POST',
		headers: {
		"Content-Type": "application/json",
		'Api-Key': apiKey, // If an API key is required
		},
		body: JSON.stringify({
		query: query,
		variables: variables,
		}),
	  });
	  
	  if (!response.ok) {
		throw new Error('Network response was not ok ' + response.statusText);
	  }
	  
	  const data = await response.json();
	  
	  if (data.errors) {
		console.error('Error when fetching data:', data.errors);
		return null;
	  }
	  
	  console.log(data.data.proposalsV2.nodes[0]);

	  return data.data;
};

callGaladriel();
// getProposalData();


// // Schedule the contract call to occur once per second
// cron.schedule('* * * * * *', async () => {
// 	await callContractMethod();
// 	console.log('Smart contract method called successfully.');
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

