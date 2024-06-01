// - get proposals for x daos
// - throw proposals into galadriel contract

// ============================================================
// uncomment this if you want to run this file seperatly with node
// import { ethers } from "ethers"
// const contractAddress = "0x709E5941Ae771C642Ed78161495aD093261bb3AA";
// const daoContract = "0x59c6765e180ba50FaD3f089e6D26cDeb5eaC9CdA";
// const galadrielRpc = "https://devnet.galadriel.com";
// const sepoliaRpc = "https://ethereum-sepolia.rpc.subquery.network/public";
// const startBlock = '6019131';
// const pkpEthAddress = '0x09F051e7F87C9fC6eDD6E8460eb1dd52C8fd4663';
// const etherscanApiKey = 'YourApiKeyToken'
// ============================================================
const go = async() => {
    const proposals = await getProposalDataEtherscan(daoContract, startBlock);
    console.log(proposals)
    if (proposals.result[0] == undefined) {
        console.log("No new proposals found");
		return
    }
	const currentBlock = await getCurrentSepoliaBlock();
	const p = proposals.result[0]
	// for (const p of proposals.result) {
		const decodedData = decodeEventLog(p.data);
		if (decodedData.voteStart < currentBlock && decodedData.voteEnd > currentBlock) {
			if (decodedData.voteStart > currentBlock - 100) {
				await submitProposals([decodedData.description], [decodedData.proposalId]);
			} else {
				console.log('proposal to old');
			}
		}
	// }
}

const getProposalDataEtherscan = async (daoContract, startBlock) => {
	const url = 'https://api-sepolia.etherscan.io/api';

	const params = new URLSearchParams({
		module: 'logs',
		action: 'getLogs',
		fromBlock: startBlock,
		toBlock: 'latest',
		address: daoContract,
		topic0: '0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0',
		apikey: etherscanApiKey
	});

	const fullURL = `${url}?${params.toString()}`;

	try {
		const response = await fetch(fullURL);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};

const submitProposals = async (proposalDescriptions, proposalIds) => {
	const contract = new ethers.Contract(contractAddress, abi);
	const provider = new ethers.providers.JsonRpcProvider(galadrielRpc);
	try {
		const transactionData = await contract.populateTransaction.submitProposals(proposalDescriptions, proposalIds);
		transactionData.nonce = await provider.getTransactionCount(pkpEthAddress);
		transactionData.gasPrice = 50000000000;
		transactionData.gasLimit = 100000;
		transactionData.chainId = 696969;
		console.log(transactionData)
		Lit.Actions.setResponse({ response: JSON.stringify({ transactionData }) })
		const serializedTx = ethers.utils.serializeTransaction(transactionData);
		let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(serializedTx));
		const toSign = ethers.utils.arrayify(hash);
		const signature = await Lit.Actions.signEcdsa({
			toSign,
			publicKey,
			sigName: "sig",
		});
	} catch (error) {
		console.error('	Error submitting proposals:', error);
	}
}

const getCurrentSepoliaBlock = async () => {
	const provider = new ethers.providers.JsonRpcProvider(sepoliaRpc);
	const currentBlock = await provider.getBlockNumber();
	return currentBlock;
}

const decodeEventLog = (data) => {
	const eInterface = new ethers.utils.Interface(abi);
	const decodedData = eInterface.decodeEventLog('ProposalCreated', data);
	return decodedData;
}

go();

const abi = [
	"function submitProposals(string[] memory proposalDescriptions, uint[] memory proposalIds) public",
	"function getProposalAdvice(uint proposalId) public view returns (string memory)",
	"function test() public view returns (string memory)",
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
			"internalType": "uint256",
			"name": "id",
			"type": "uint256"
		  },
		  {
			"internalType": "string",
			"name": "description",
			"type": "string"
		  },
		  {
			"internalType": "string",
			"name": "summarizedDescription",
			"type": "string"
		  },
		  {
			"internalType": "string",
			"name": "advice",
			"type": "string"
		  },
		  {
			"internalType": "uint256",
			"name": "iteration",
			"type": "uint256"
		  },
		  {
			"internalType": "bool",
			"name": "isVoted",
			"type": "bool"
		  },
		  {
			"internalType": "bool",
			"name": "isResolved",
			"type": "bool"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"type": "event",
		"name": "ProposalCreated",
		"inputs": [
			{
				"name": "proposalId",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			},
			{
				"name": "proposer",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			},
			{
				"name": "targets",
				"type": "address[]",
				"indexed": false,
				"internalType": "address[]"
			},
			{
				"name": "values",
				"type": "uint256[]",
				"indexed": false,
				"internalType": "uint256[]"
			},
			{
				"name": "signatures",
				"type": "string[]",
				"indexed": false,
				"internalType": "string[]"
			},
			{
				"name": "calldatas",
				"type": "bytes[]",
				"indexed": false,
				"internalType": "bytes[]"
			},
			{
				"name": "voteStart",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			},
			{
				"name": "voteEnd",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			},
			{
				"name": "description",
				"type": "string",
				"indexed": false,
				"internalType": "string"
			}
		],
		"anonymous": false
	}
];
