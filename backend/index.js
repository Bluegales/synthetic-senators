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

// galadriel initialzation
const abi = [
	"function submitProposals(string[] memory proposalDescriptions, uint[] memory proposalIds) public",
	"function getProposalAdvice(uint proposalId) public view returns (string memory)",
	"function test() public view returns (string memory)",
	{
		"name": "proposals",
		"type": "function",
		"inputs": [
		  { "name": "proposalId", "type": "uint" }
		],
		"outputs": [
		  { "name": "description", "type": "string" },
		  { "name": "advice", "type": "string" },
		  { "name": "iteration", "type": "uint" },
		  { "name": "isResolved", "type": "bool" }
		],
		"stateMutability": "view"
	  }
];
const contractAddress = process.env.ADVISOR_CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.GALADRIEL_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signer = wallet.connect(provider);
const contract = new ethers.Contract(contractAddress, abi, signer);

const submitProposals = async () => {
	const message = "Should Ethereum implement sharding to scale?"

	const transactionResponse = await contract.submitProposals([message], [0]);
	// const transactionResponse = await contract.test();
	console.log(transactionResponse);
	const advice = await contract.getProposalAdvice(0);
	console.log(advice);
}

const getAdvice = async () => {
	const proposalData = await contract.proposals(0);
	console.log(proposalData);
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

// submitProposals();
getAdvice();
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

