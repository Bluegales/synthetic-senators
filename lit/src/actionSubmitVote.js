// ============================================================
// uncomment this if you want to run this file seperatly with node
// import { ethers } from "ethers"
// const galadrielContractAddress = "0x709E5941Ae771C642Ed78161495aD093261bb3AA";
// const daoContractAddress = "0x59c6765e180ba50FaD3f089e6D26cDeb5eaC9CdA";
// const galadrielRpc = "https://devnet.galadriel.com";
// const sepoliaRpc = "https://ethereum-sepolia.rpc.subquery.network/public";
// const pkpEthAddress = '0x09F051e7F87C9fC6eDD6E8460eb1dd52C8fd4663';
// ============================================================

const go = async () => {
    const provider = new ethers.providers.JsonRpcProvider(galadrielRpc);
    const contract = new ethers.Contract(galadrielContractAddress, abiGaladriel, provider);

    const proposalId = await contract.getProposalCount();
    console.log("last proposal:", proposalId - 1);
    const proposalData = await contract.proposals(proposalId - 1);
    console.log(proposalData);
    // const advice = proposalData.advice;
    const advice = 'Y';
    if (advice == '') {
        console.log("no advice jet")
        return
    }
    const words = advice.split(' ');
    const lastWord = words[words.length - 1];
    var result;
    if (lastWord == "Y") {
        result = 1
    }
    else if (lastWord == "N") {
        result = 0
    }
    if (result) {
        castVote(proposalData.id, result, proposalData.advice);
    }
}

const castVote = async (proposalId, support, reason) => {
    const contract = new ethers.Contract(daoContractAddress, abiDao);
	const provider = new ethers.providers.JsonRpcProvider(sepoliaRpc);
    try {
        const transactionData = await contract.populateTransaction.castVoteWithReason(proposalId, support, reason);
		transactionData.nonce = await provider.getTransactionCount(pkpEthAddress);
		transactionData.gasPrice = 50000000000;
		transactionData.gasLimit = 100000;
		transactionData.chainId = 11155111;
        // console.log(transactionData)
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
        console.error('	Error casting vote:', error);
    }
}

const abiDao = [
    {
        "type": "function",
        "name": "castVoteWithReason",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "support",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "reason",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
];


const abiGaladriel = [
    "function submitProposals(string[] memory proposalDescriptions, uint[] memory proposalIds) public",
    "function getProposalAdvice(uint proposalId) public view returns (string memory)",
    "function test() public view returns (string memory)",
    "function getProposalCount() public view returns (uint256 count)",
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

go();
