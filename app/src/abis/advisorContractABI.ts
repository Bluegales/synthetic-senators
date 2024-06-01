const advisorContractABI = [
    "function submitProposals(string[] memory proposalDescriptions, uint[] memory proposalIds) public",
    "function getProposalAdvice(uint proposalId) public view returns (string memory)",
    "function test() public view returns (string memory)",
    "function getProposalCount() public view returns (uint256 count)",
    "function instruction() public view returns (string instruction)",
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
  
  export default advisorContractABI;
  